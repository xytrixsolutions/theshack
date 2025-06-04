"use client";
import Image from "next/image";
import React, { useState, useEffect } from "react";

interface MenuPage {
  pageNumber: number;
  url: string;
  filename: string;
  key: string;
  uploadedAt?: string;
}

interface MenuApiResponse {
  success: boolean;
  images: MenuPage[];
  uploadedAt?: string;
  error?: string;
}

export default function MenuDisplay() {
  const [menuPages, setMenuPages] = useState<MenuPage[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMenuImages = async () => {
      const cachedData = sessionStorage.getItem("menuCache");
      let parsedCache: { images: MenuPage[]; uploadedAt: string } | null = null;

      if (cachedData) {
        parsedCache = JSON.parse(cachedData);
      }

      try {
        const res = await fetch("/api/menu-images");
        const data: MenuApiResponse = await res.json();

        if (data.success) {
          // If cached and uploadedAt matches → use cache
          if (parsedCache && parsedCache.uploadedAt === data.uploadedAt) {
            setMenuPages(parsedCache.images);
          } else {
            setMenuPages(data.images);
            sessionStorage.setItem(
              "menuCache",
              JSON.stringify({
                images: data.images,
                uploadedAt: data.uploadedAt,
              }),
            );
          }
        } else {
          throw new Error(data.error || "Failed to load images");
        }
      } catch (err) {
        console.error("Error fetching menu images:", err);
        if (parsedCache) {
          setMenuPages(parsedCache.images); // fallback to cache on failure
        } else {
          setMenuPages([]);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchMenuImages();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center text-gray-600 gap-4">
        <div className="w-10 h-10 border-4 border-gray-300 border-t-blue-500 rounded-full animate-spin"></div>
        <span>Loading menu...</span>
      </div>
    );
  }

  if (menuPages.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-600">
        No menu available.
      </div>
    );
  }

  return (
    <div className="flex justify-center">
      <div className="flex flex-col gap-6 p-4 w-full md:w-9/12 lg:w-8/12 xl:w-6/12">
        {menuPages.map((page) => (
          <Image
            key={page.key}
            src={page.url}
            alt={`Menu Page ${page.pageNumber}`}
            className="w-full h-auto object-contain"
            width={800}
            height={1200}
          />
        ))}
      </div>
    </div>
  );
}
