"use client";
import { useState } from "react";
import {
  CheckCircle,
  ExternalLink,
  Upload,
  Loader2,
  Copy,
  Download,
  AlertCircle,
  X,
} from "lucide-react";
import { toast, Toaster } from "sonner";
import Image from "next/image";
import axios from "axios";
import { BlobListSuccessResponse } from "@/types/BlobsResponse";

// PDF.js types (simplified)
declare global {
  interface Window {
    pdfjsLib: {
      GlobalWorkerOptions: {
        workerSrc: string;
      };
      getDocument: (src: ArrayBuffer | Uint8Array) => {
        promise: Promise<{
          numPages: number;
          getPage: (pageNum: number) => Promise<{
            getViewport: (options: { scale: number }) => {
              width: number;
              height: number;
            };
            render: (options: {
              canvasContext: CanvasRenderingContext2D;
              viewport: {
                width: number;
                height: number;
              };
            }) => {
              promise: Promise<void>;
            };
          }>;
        }>;
      };
    };
  }
}

interface UploadedImage {
  pageNumber: number;
  url: string;
  key: string;
  filename: string;
}

const LoadingSpinner = ({ size = "sm" }: { size?: "sm" | "md" | "lg" }) => {
  const sizeClasses = {
    sm: "w-4 h-4",
    md: "w-6 h-6",
    lg: "w-8 h-8",
  };

  return <Loader2 className={`${sizeClasses[size]} animate-spin`} />;
};

const ProgressBar = ({
  current,
  total,
  label,
  color = "blue",
}: {
  current: number;
  total: number;
  label: string;
  color?: "blue" | "green" | "purple";
}) => {
  const percentage = Math.round((current / total) * 100);
  const colorClasses = {
    blue: "bg-blue-500",
    green: "bg-green-500",
    purple: "bg-purple-500",
  };

  return (
    <div className="space-y-2">
      <div className="flex justify-between items-center text-sm text-gray-600">
        <span className="font-medium">{label}</span>
        <span className="text-xs bg-gray-100 px-2 py-1 rounded-full">
          {current} / {total} ({percentage}%)
        </span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-2.5 overflow-hidden">
        <div
          className={`${colorClasses[color]} h-full rounded-full transition-all duration-300 ease-out`}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
};

export default function UploadPDF() {
  const [file, setFile] = useState<File | null>(null);
  const [converting, setConverting] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [uploadedImages, setUploadedImages] = useState<UploadedImage[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [progress, setProgress] = useState<{
    current: number;
    total: number;
  } | null>(null);
  const [uploadProgress, setUploadProgress] = useState<{
    current: number;
    total: number;
  } | null>(null);
  const [uploadComplete, setUploadComplete] = useState(false);
  const [dragActive, setDragActive] = useState(false);

  const loadPdfJs = async (): Promise<void> => {
    return new Promise((resolve, reject) => {
      if (window.pdfjsLib) {
        resolve();
        return;
      }

      const script = document.createElement("script");
      script.src =
        "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.min.js";
      script.onload = () => {
        window.pdfjsLib.GlobalWorkerOptions.workerSrc =
          "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js";
        resolve();
      };
      script.onerror = () => reject(new Error("Failed to load PDF.js"));
      document.head.appendChild(script);
    });
  };

  const convertPdfToImages = async (file: File): Promise<string[]> => {
    const arrayBuffer = await file.arrayBuffer();
    const pdf = await window.pdfjsLib.getDocument(arrayBuffer).promise;
    const numPages = pdf.numPages;

    if (numPages > 50) {
      throw new Error(
        `PDF has too many pages (${numPages}). Maximum 50 pages allowed.`,
      );
    }

    const images: string[] = [];
    setProgress({ current: 0, total: numPages });

    for (let pageNum = 1; pageNum <= numPages; pageNum++) {
      const page = await pdf.getPage(pageNum);
      const originalViewport = page.getViewport({ scale: 1.0 });
      const targetHeight = 1600;
      const targetWidth = 800;
      const heightScale = targetHeight / originalViewport.height;
      const widthScale = targetWidth / originalViewport.width;
      const scale = Math.max(heightScale, widthScale, 0.8);
      const viewport = page.getViewport({ scale });
      const canvas = document.createElement("canvas");
      const context = canvas.getContext("2d");

      if (!context) {
        throw new Error("Could not get canvas context");
      }

      canvas.width = Math.floor(viewport.width);
      canvas.height = Math.floor(viewport.height);
      canvas.style.width = `${viewport.width}px`;
      canvas.style.height = `${viewport.height}px`;

      const renderContext = {
        canvasContext: context,
        viewport: viewport,
      };

      await page.render(renderContext).promise;
      const imageDataUrl = canvas.toDataURL("image/png", 0.95);
      images.push(imageDataUrl);
      setProgress({ current: pageNum, total: numPages });
    }

    return images;
  };

  const deleteExistingBlobs = async (): Promise<void> => {
    try {
      const response =
        await axios.get<BlobListSuccessResponse>("/api/list-blobs");

      if (!response.status.toString().startsWith("2")) {
        throw new Error("Failed to fetch existing blobs");
      }

      const blobs = response.data.blobs;

      if (blobs.length === 0) {
        return;
      }

      const deleteResponse = await fetch("/api/upload-images", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ keys: blobs.map((blob) => blob.key) }),
      });

      if (!deleteResponse.ok) {
        const errorData = await deleteResponse.json();
        throw new Error(errorData.error || "Failed to delete existing blobs");
      }
    } catch (err) {
      throw new Error(
        err instanceof Error ? err.message : "Failed to delete existing blobs",
      );
    }
  };

  const uploadImagesToBlob = async (
    images: string[],
    filename: string,
  ): Promise<UploadedImage[]> => {
    setUploadProgress({ current: 0, total: images.length });

    try {
      const response = await fetch("/api/upload-images", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          images,
          filename,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Upload failed");
      }

      const result = await response.json();

      if (result.success) {
        return result.images;
      } else {
        throw new Error(result.error || "Upload failed");
      }
    } finally {
      setUploadProgress(null);
    }
  };

  const handleConvertAndUpload = async () => {
    if (!file) return;

    setConverting(true);
    setUploading(false);
    setUploadedImages([]);
    setError(null);
    setProgress(null);
    setUploadProgress(null);
    setUploadComplete(false);

    const loadingToast = toast.loading("Initializing PDF conversion...");

    try {
      // Load PDF.js if not already loaded
      toast.loading("Loading PDF processor...", { id: loadingToast });
      await loadPdfJs();

      // Delete existing blobs before uploading new ones
      toast.loading("Clearing previous uploads...", { id: loadingToast });
      await deleteExistingBlobs();

      // Convert PDF to images
      toast.loading("Converting PDF pages to images...", { id: loadingToast });
      const convertedImages = await convertPdfToImages(file);

      setConverting(false);
      setUploading(true);
      toast.loading("Uploading images to Netlify Blobs...", {
        id: loadingToast,
      });

      // Upload images to Netlify Blobs
      const uploadedImagesData = await uploadImagesToBlob(
        convertedImages,
        file.name,
      );

      setUploadedImages(uploadedImagesData);
      setUploadComplete(true);

      toast.success(
        `Successfully converted and uploaded ${uploadedImagesData.length} images!`,
        {
          id: loadingToast,
          duration: 5000,
          action: {
            label: "View Menu",
            onClick: () => window.open("/menu", "_blank"),
          },
        },
      );
    } catch (err) {
      const message = err instanceof Error ? err.message : "Process failed";
      setError(message);
      console.error("Process error:", err);
      toast.error(`Failed to process PDF: ${message}`, {
        id: loadingToast,
        duration: 6000,
      });
    } finally {
      setConverting(false);
      setUploading(false);
      setProgress(null);
      setUploadProgress(null);
    }
  };

  const copyUrl = async (url: string) => {
    try {
      await navigator.clipboard.writeText(url);
      toast.success("URL copied to clipboard!");
    } catch (err) {
      toast.error("Failed to copy URL");
      console.log(err);
    }
  };

  const downloadFromUrl = (url: string, filename: string) => {
    const link = document.createElement("a");
    link.href = url;
    link.download = filename;
    link.target = "_blank";
    link.click();
    toast.success("Download started!");
  };

  const handleNewUpload = () => {
    setFile(null);
    setUploadedImages([]);
    setError(null);
    setUploadComplete(false);
    setProgress(null);
    setUploadProgress(null);
    toast.success("Ready for new upload!");
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragActive(false);
    const files = e.dataTransfer.files;
    if (files.length > 0 && files[0].type === "application/pdf") {
      setFile(files[0]);
      setUploadedImages([]);
      setError(null);
      setProgress(null);
      setUploadProgress(null);
      setUploadComplete(false);
      toast.success(`PDF "${files[0].name}" loaded successfully!`);
    } else {
      toast.error("Please drop a valid PDF file");
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setDragActive(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setDragActive(false);
  };

  const isProcessing = converting || uploading;

  return (
    <>
      <Toaster
        position="top-right"
        expand={true}
        richColors
        closeButton
        toastOptions={{
          duration: 4000,
          style: {
            background: "white",
            border: "1px solid #e5e7eb",
          },
        }}
      />

      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-4">
        <div className="max-w-4xl mx-auto space-y-6">
          {/* Success Banner */}
          {uploadComplete && (
            <div className="bg-gradient-to-r from-green-500 to-emerald-500 text-white p-6 rounded-xl shadow-lg animate-in slide-in-from-top duration-500">
              <div className="flex items-center gap-4">
                <div className="flex-shrink-0">
                  <CheckCircle className="w-8 h-8" />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold mb-1">
                    Upload Complete!
                  </h3>
                  <p className="opacity-90">
                    Your menu has been successfully uploaded and is now live
                    with {uploadedImages.length} pages.
                  </p>
                </div>
              </div>
              <div className="mt-4 flex gap-3">
                <a
                  href="/menu"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white rounded-lg transition-all duration-200 font-medium"
                >
                  <ExternalLink className="w-4 h-4" />
                  View Live Menu
                </a>
                <button
                  onClick={handleNewUpload}
                  className="px-6 py-3 bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white rounded-lg transition-all duration-200 font-medium"
                >
                  Upload New Menu
                </button>
              </div>
            </div>
          )}

          {/* Main Upload Card */}
          <div className="bg-white rounded-2xl shadow-xl p-8">
            {/* File Upload Area */}
            <div
              className={`relative border-2 border-dashed rounded-xl p-8 text-center transition-all duration-200 ${
                dragActive
                  ? "border-blue-500 bg-blue-50"
                  : file
                    ? "border-green-500 bg-green-50"
                    : "border-gray-300 hover:border-gray-400"
              }`}
              onDrop={handleDrop}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
            >
              <div className="space-y-4">
                <div
                  className={`inline-flex items-center justify-center w-16 h-16 rounded-full ${
                    file ? "bg-green-100" : "bg-gray-100"
                  }`}
                >
                  {file ? (
                    <CheckCircle className="w-8 h-8 text-green-600" />
                  ) : (
                    <Upload className="w-8 h-8 text-gray-400" />
                  )}
                </div>

                {file ? (
                  <div>
                    <p className="text-lg font-semibold text-green-700">
                      {file.name}
                    </p>
                    <p className="text-sm text-green-600">
                      {(file.size / 1024 / 1024).toFixed(2)} MB • Ready to
                      convert
                    </p>
                  </div>
                ) : (
                  <div>
                    <p className="text-lg font-semibold text-gray-700">
                      Drop your PDF here or click to browse
                    </p>
                    <p className="text-sm text-gray-500">
                      Maximum 50 pages • Supports PDF files up to 10MB
                    </p>
                  </div>
                )}
              </div>

              <input
                type="file"
                accept="application/pdf"
                onChange={(e) => {
                  const selectedFile = e.target.files?.[0] || null;
                  setFile(selectedFile);
                  setUploadedImages([]);
                  setError(null);
                  setProgress(null);
                  setUploadProgress(null);
                  setUploadComplete(false);
                  if (selectedFile) {
                    toast.success(
                      `PDF "${selectedFile.name}" loaded successfully!`,
                    );
                  }
                }}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              />
            </div>

            {/* Convert Button */}
            <div className="mt-8 text-center">
              <button
                onClick={handleConvertAndUpload}
                disabled={!file || isProcessing}
                className={`inline-flex items-center gap-3 px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-200 ${
                  !file || isProcessing
                    ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                    : "bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white shadow-lg hover:shadow-xl transform hover:scale-105"
                }`}
              >
                {isProcessing ? (
                  <>
                    <LoadingSpinner size="md" />
                    {converting ? "Converting PDF..." : "Uploading Images..."}
                  </>
                ) : (
                  <>
                    <Upload className="w-6 h-6" />
                    Upload Menu
                  </>
                )}
              </button>
            </div>

            {/* Progress Bars */}
            {(progress || uploadProgress) && (
              <div className="mt-8 space-y-6">
                {progress && (
                  <ProgressBar
                    current={progress.current}
                    total={progress.total}
                    label="Converting PDF pages to images"
                    color="blue"
                  />
                )}

                {uploadProgress && (
                  <div className="space-y-2">
                    <div className="flex justify-between items-center text-sm text-gray-600">
                      <span className="font-medium">Uploading...</span>
                      <span className="text-xs bg-purple-100 text-purple-700 px-2 py-1 rounded-full">
                        Processing batch...
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2.5 overflow-hidden">
                      <div className="bg-gradient-to-r from-purple-500 to-purple-600 h-full rounded-full animate-pulse" />
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Error Display */}
            {error && (
              <div className="mt-6 p-4 bg-red-50 border border-red-200 rounded-xl">
                <div className="flex items-start gap-3">
                  <AlertCircle className="w-5 h-5 text-red-500 mt-0.5 flex-shrink-0" />
                  <div className="flex-1">
                    <h4 className="font-semibold text-red-800 mb-1">
                      Error occurred
                    </h4>
                    <p className="text-red-700 text-sm">{error}</p>
                  </div>
                  <button
                    onClick={() => setError(null)}
                    className="text-red-500 hover:text-red-700 transition-colors"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Results Grid */}
          {uploadedImages.length > 0 && (
            <div className="bg-white rounded-2xl shadow-xl p-8">
              <div className="mb-6">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">
                  Conversion Results
                </h3>
                <p className="text-gray-600">
                  {uploadedImages.length} image
                  {uploadedImages.length > 1 ? "s" : ""} successfully uploaded
                  to Netlify Blobs with optimized dimensions
                </p>
              </div>

              <div className="grid gap-6">
                {uploadedImages.map((imageData, index) => (
                  <div
                    key={imageData.filename}
                    className="border border-gray-200 rounded-xl overflow-hidden hover:shadow-lg transition-shadow duration-200 animate-in slide-in-from-bottom"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <div className="bg-gray-50 px-6 py-4 flex justify-between items-center">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                          <span className="text-sm font-semibold text-blue-600">
                            {imageData.pageNumber}
                          </span>
                        </div>
                        <span className="font-medium text-gray-700">
                          Page {imageData.pageNumber}
                        </span>
                      </div>
                      <div className="flex gap-2">
                        <button
                          onClick={() => copyUrl(imageData.url)}
                          className="inline-flex items-center gap-2 px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg transition-colors text-sm font-medium"
                        >
                          <Copy className="w-4 h-4" />
                          Copy URL
                        </button>
                        <button
                          onClick={() =>
                            downloadFromUrl(imageData.url, imageData.filename)
                          }
                          className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors text-sm font-medium"
                        >
                          <Download className="w-4 h-4" />
                          Download
                        </button>
                      </div>
                    </div>

                    <div className="p-6">
                      <div className="bg-gray-50 rounded-lg p-4 mb-4">
                        <Image
                          src={imageData.url}
                          alt={`Page ${imageData.pageNumber}`}
                          className="w-full h-auto max-h-[70vh] object-contain mx-auto rounded border shadow-sm"
                          loading="lazy"
                          width={800}
                          height={1600}
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
