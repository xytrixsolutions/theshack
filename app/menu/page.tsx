/* eslint-disable @next/next/no-img-element */
"use client";
import React, { useState, useEffect, useCallback } from "react";
import {
  ChevronLeft,
  ChevronRight,
  Menu,
  Download,
  Share2,
  RefreshCw,
} from "lucide-react";

interface MenuPage {
  pageNumber: number;
  url: string;
  filename: string;
  key: string;
  uploadedAt?: string;
  originalFilename?: string;
}

interface MenuApiResponse {
  success: boolean;
  images: MenuPage[];
  count: number;
  uploadedAt?: string;
  error?: string;
}

export default function MenuDisplay() {
  const [menuPages, setMenuPages] = useState<MenuPage[]>([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [imageLoading, setImageLoading] = useState(true);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [lastUpdated, setLastUpdated] = useState<string | null>(null);

  // Fetch menu images from API
  const fetchMenuImages = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch("/api/menu-images");
      const data: MenuApiResponse = await response.json();

      if (data.success) {
        setMenuPages(data.images);
        setLastUpdated(data.uploadedAt || null);

        // Reset to first page if current page is out of bounds
        if (currentPage >= data.images.length) {
          setCurrentPage(0);
        }
      } else {
        throw new Error(data.error || "Failed to fetch menu images");
      }
    } catch (err) {
      console.error("Error fetching menu images:", err);
      setError(err instanceof Error ? err.message : "Failed to load menu");
      setMenuPages([]);
    } finally {
      setLoading(false);
    }
  }, [currentPage]);

  // Load menu images on component mount
  useEffect(() => {
    fetchMenuImages();
  }, [fetchMenuImages]);

  const nextPage = useCallback(() => {
    setCurrentPage((prev) => (prev + 1) % menuPages.length);
    setImageLoading(true);
  }, [menuPages.length]);

  const prevPage = useCallback(() => {
    setCurrentPage((prev) => (prev - 1 + menuPages.length) % menuPages.length);
    setImageLoading(true);
  }, [menuPages.length]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (menuPages.length <= 1) return;

      if (event.key === "ArrowLeft") {
        event.preventDefault();
        prevPage();
      } else if (event.key === "ArrowRight") {
        event.preventDefault();
        nextPage();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [menuPages.length, nextPage, prevPage]);

  const goToPage = (pageIndex: number) => {
    setCurrentPage(pageIndex);
    setImageLoading(true);
  };

  const handleImageLoad = () => {
    setImageLoading(false);
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: "The Shack Menu",
          text: `Check out page ${menuPages[currentPage]?.pageNumber} of The Shack menu!`,
          url: window.location.href,
        });
      } catch (error) {
        console.log(error);
        navigator.clipboard.writeText(window.location.href);
      }
    } else {
      // Fallback for browsers that don't support native sharing
      navigator.clipboard.writeText(window.location.href);
    }
  };

  const handleDownload = () => {
    if (menuPages[currentPage]) {
      const link = document.createElement("a");
      link.href = menuPages[currentPage].url;
      link.download = menuPages[currentPage].filename;
      link.target = "_blank";
      link.click();
    }
  };

  const handleRefresh = () => {
    fetchMenuImages();
  };

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-red-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            Loading Menu...
          </h2>
          <p className="text-gray-600">
            Fetching the latest menu from our kitchen!
          </p>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center max-w-md">
          <Menu className="w-16 h-16 text-red-400 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            Menu Unavailable
          </h2>
          <p className="text-gray-600 mb-4">{error}</p>
          <button
            onClick={handleRefresh}
            className="flex items-center gap-2 mx-auto px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
          >
            <RefreshCw className="w-4 h-4" />
            Try Again
          </button>
        </div>
      </div>
    );
  }

  // No menu pages available
  if (menuPages.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Menu className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            Menu Coming Soon
          </h2>
          <p className="text-gray-600 mb-4">
            Our delicious menu is being updated. Please check back soon!
          </p>
          <button
            onClick={handleRefresh}
            className="flex items-center gap-2 mx-auto px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <RefreshCw className="w-4 h-4" />
            Check for Updates
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-800">
                The Shack Menu
              </h1>
              <div className="flex items-center gap-4 text-sm text-gray-600">
                <span>
                  Page {menuPages[currentPage]?.pageNumber} of{" "}
                  {menuPages.length}
                </span>
                {lastUpdated && (
                  <span>
                    Updated: {new Date(lastUpdated).toLocaleDateString()}
                  </span>
                )}
              </div>
            </div>
            <div className="flex gap-2">
              <button
                onClick={handleRefresh}
                className="flex items-center gap-2 px-3 py-2 text-sm bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
                title="Refresh menu"
              >
                <RefreshCw className="w-4 h-4" />
                Refresh
              </button>
              <button
                onClick={handleShare}
                className="flex items-center gap-2 px-3 py-2 text-sm bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-colors"
              >
                <Share2 className="w-4 h-4" />
                Share
              </button>
              <button
                onClick={handleDownload}
                className="flex items-center gap-2 px-3 py-2 text-sm bg-green-100 text-green-700 rounded-lg hover:bg-green-200 transition-colors"
              >
                <Download className="w-4 h-4" />
                Download
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Menu Navigation Dots */}
      {menuPages.length > 1 && (
        <div className="bg-white border-b">
          <div className="max-w-4xl mx-auto px-4 py-3">
            <div className="flex justify-center gap-2">
              {menuPages.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToPage(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-200 ${
                    index === currentPage
                      ? "bg-red-600 scale-125"
                      : "bg-gray-300 hover:bg-gray-400"
                  }`}
                  aria-label={`Go to page ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Main Menu Display */}
      <div className="max-w-4xl mx-auto px-4 py-6">
        <div className="relative bg-white rounded-lg shadow-lg overflow-hidden">
          {/* Loading overlay */}
          {imageLoading && (
            <div className="absolute inset-0 bg-white bg-opacity-75 flex items-center justify-center z-10">
              <div className="flex flex-col items-center">
                <div className="w-8 h-8 border-4 border-red-600 border-t-transparent rounded-full animate-spin mb-2"></div>
                <p className="text-sm text-gray-600">Loading menu...</p>
              </div>
            </div>
          )}

          {/* Menu Image */}
          <div className="relative">
            <img
              src={menuPages[currentPage]?.url}
              alt={`The Shack Menu - Page ${menuPages[currentPage]?.pageNumber}`}
              className="w-full h-auto max-h-screen object-contain"
              onLoad={handleImageLoad}
              onError={() => setImageLoading(false)}
            />

            {/* Navigation Arrows */}
            {menuPages.length > 1 && (
              <>
                <button
                  onClick={prevPage}
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 hover:bg-opacity-70 text-white p-3 rounded-full transition-all duration-200 hover:scale-110"
                  aria-label="Previous page"
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>
                <button
                  onClick={nextPage}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 hover:bg-opacity-70 text-white p-3 rounded-full transition-all duration-200 hover:scale-110"
                  aria-label="Next page"
                >
                  <ChevronRight className="w-6 h-6" />
                </button>
              </>
            )}
          </div>

          {/* Page Info Footer */}
          <div className="bg-gray-50 px-4 py-3 border-t">
            <div className="flex justify-between items-center text-sm text-gray-600">
              <span>Menu Page {menuPages[currentPage]?.pageNumber}</span>
              <span>
                {menuPages[currentPage]?.originalFilename && (
                  <>From: {menuPages[currentPage].originalFilename}</>
                )}
              </span>
            </div>
          </div>
        </div>

        {/* Quick Navigation for Multiple Pages */}
        {menuPages.length > 2 && (
          <div className="mt-6 bg-white rounded-lg shadow p-4">
            <h3 className="text-lg font-semibold text-gray-800 mb-3">
              Quick Navigation
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {menuPages.map((page, index) => (
                <button
                  key={page.pageNumber}
                  onClick={() => goToPage(index)}
                  className={`p-3 rounded-lg text-sm font-medium transition-colors ${
                    index === currentPage
                      ? "bg-red-600 text-white"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  Page {page.pageNumber}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Keyboard Navigation Instructions */}
      {menuPages.length > 1 && (
        <div className="max-w-4xl mx-auto px-4 pb-6">
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
            <p className="text-sm text-blue-800 text-center">
              💡 <strong>Tip:</strong> Use your keyboard arrow keys (← →) to
              navigate between menu pages
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
