/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @next/next/no-img-element */
"use client";
import { useState } from "react";

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
              viewport: any;
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
        // Set up the worker
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

      // Set scale for good quality (1.5 = 150% of original size)
      const scale = 1.5;
      const viewport = page.getViewport({ scale });

      // Create canvas
      const canvas = document.createElement("canvas");
      const context = canvas.getContext("2d");

      if (!context) {
        throw new Error("Could not get canvas context");
      }

      canvas.height = viewport.height;
      canvas.width = viewport.width;

      // Render PDF page to canvas
      const renderContext = {
        canvasContext: context,
        viewport: viewport,
      };

      await page.render(renderContext).promise;

      // Convert canvas to image data URL
      const imageDataUrl = canvas.toDataURL("image/png", 0.9);
      images.push(imageDataUrl);

      // Update progress
      setProgress({ current: pageNum, total: numPages });
    }

    return images;
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

    try {
      // Load PDF.js if not already loaded
      await loadPdfJs();

      // Convert PDF to images
      const convertedImages = await convertPdfToImages(file);

      setConverting(false);
      setUploading(true);

      // Upload images to Vercel Blob
      const uploadedImagesData = await uploadImagesToBlob(
        convertedImages,
        file.name,
      );
      setUploadedImages(uploadedImagesData);
    } catch (err) {
      const message = err instanceof Error ? err.message : "Process failed";
      setError(message);
      console.error("Process error:", err);
    } finally {
      setConverting(false);
      setUploading(false);
      setProgress(null);
      setUploadProgress(null);
    }
  };

  const copyUrl = (url: string) => {
    navigator.clipboard.writeText(url);
    // You could add a toast notification here
  };

  const downloadFromUrl = (url: string, filename: string) => {
    const link = document.createElement("a");
    link.href = url;
    link.download = filename;
    link.target = "_blank";
    link.click();
  };

  const getProcessingStatus = () => {
    if (converting) return "Converting PDF pages...";
    if (uploading) return "Uploading to Netlify Blobs...";
    return null;
  };

  return (
    <div className="p-4 space-y-4 max-w-4xl mx-auto">
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h1 className="text-2xl font-bold mb-4 text-gray-800">
          PDF to Image Converter
        </h1>
        <p className="text-gray-600 mb-4">
          Convert PDF pages to images and store them in Netlify Blob storage
        </p>

        <input
          type="file"
          accept="application/pdf"
          onChange={(e) => {
            setFile(e.target.files?.[0] || null);
            setUploadedImages([]);
            setError(null);
            setProgress(null);
            setUploadProgress(null);
          }}
          className="block w-full text-sm text-gray-700 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 mb-4"
        />

        <button
          onClick={handleConvertAndUpload}
          disabled={!file || converting || uploading}
          className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          {converting || uploading
            ? getProcessingStatus()
            : "Convert & Upload to Netlify"}
        </button>

        {(progress || uploadProgress) && (
          <div className="mt-4">
            {progress && (
              <div className="mb-4">
                <div className="flex justify-between text-sm text-gray-600 mb-1">
                  <span>Converting pages...</span>
                  <span>
                    {progress.current} / {progress.total}
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                    style={{
                      width: `${(progress.current / progress.total) * 100}%`,
                    }}
                  ></div>
                </div>
              </div>
            )}

            {uploadProgress && (
              <div>
                <div className="flex justify-between text-sm text-gray-600 mb-1">
                  <span>Uploading to Netlify...</span>
                  <span>Processing batch upload...</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-green-600 h-2 rounded-full animate-pulse"></div>
                </div>
              </div>
            )}
          </div>
        )}

        {error && (
          <div className="mt-4 text-red-600 p-3 bg-red-50 rounded border border-red-200">
            <strong>Error:</strong> {error}
          </div>
        )}
      </div>

      {uploadedImages.length > 0 && (
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="mb-4">
            <h3 className="font-semibold text-lg text-gray-800">
              Netlify Blob Storage Results
            </h3>
            <p className="text-sm text-gray-600">
              {uploadedImages.length} image
              {uploadedImages.length > 1 ? "s" : ""} uploaded successfully to
              Netlify Blobs
            </p>
          </div>

          <div className="grid gap-6">
            {uploadedImages.map((imageData) => (
              <div
                key={imageData.filename}
                className="border rounded-lg shadow overflow-hidden bg-gray-50"
              >
                <div className="bg-gray-100 p-3 flex justify-between items-center flex-wrap gap-2">
                  <span className="text-sm font-medium text-gray-700">
                    Page {imageData.pageNumber}
                  </span>
                  <div className="flex gap-2">
                    <button
                      onClick={() => copyUrl(imageData.url)}
                      className="bg-gray-600 text-white px-3 py-1 rounded text-xs hover:bg-gray-700 transition-colors"
                    >
                      Copy URL
                    </button>
                    <button
                      onClick={() =>
                        downloadFromUrl(imageData.url, imageData.filename)
                      }
                      className="bg-blue-600 text-white px-3 py-1 rounded text-xs hover:bg-blue-700 transition-colors"
                    >
                      Download
                    </button>
                  </div>
                </div>
                <div className="p-4">
                  <img
                    src={imageData.url}
                    alt={`Page ${imageData.pageNumber}`}
                    className="w-full h-auto max-h-[80vh] object-contain border rounded"
                  />
                  <div className="mt-2 p-2 bg-gray-100 rounded text-xs font-mono text-gray-600 break-all">
                    {imageData.url}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
