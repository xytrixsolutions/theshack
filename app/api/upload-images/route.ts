// app/api/upload-images/route.ts
import { NextResponse } from "next/server";
import { put } from "@vercel/blob";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { images, filename } = body;

    if (!images || !Array.isArray(images)) {
      return NextResponse.json(
        { error: "Images array is required" },
        { status: 400 },
      );
    }

    const uploadedImages = [];

    for (let i = 0; i < images.length; i++) {
      const imageDataUrl = images[i];

      // Convert data URL to buffer
      const base64Data = imageDataUrl.replace(/^data:image\/\w+;base64,/, "");
      const buffer = Buffer.from(base64Data, "base64");

      // Generate filename
      const baseFilename = filename?.replace(".pdf", "") || "converted";
      const imageFilename = `${baseFilename}-page-${i + 1}-${Date.now()}.png`;

      // Upload to Vercel Blob
      const blob = await put(imageFilename, buffer, {
        access: "public",
        contentType: "image/png",
      });

      uploadedImages.push({
        pageNumber: i + 1,
        url: blob.url,
        filename: imageFilename,
      });
    }

    return NextResponse.json({
      success: true,
      images: uploadedImages,
      count: uploadedImages.length,
    });
  } catch (error) {
    console.error("Blob upload error:", error);
    return NextResponse.json(
      { error: "Failed to upload images to blob storage" },
      { status: 500 },
    );
  }
}
