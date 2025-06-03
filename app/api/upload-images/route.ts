// app/api/upload-images/route.ts
import { NextResponse } from "next/server";
import { getStore } from "@netlify/blobs";

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

    // Initialize Netlify Blob store
    const store = getStore({
      name: "pdf-images",
      siteID: process.env.NETLIFY_SITE_ID,
      token: process.env.NETLIFY_TOKEN,
    });

    const uploadedImages = [];

    for (let i = 0; i < images.length; i++) {
      const imageDataUrl = images[i];

      // Convert data URL to buffer
      const base64Data = imageDataUrl.replace(/^data:image\/\w+;base64,/, "");
      const buffer = Buffer.from(base64Data, "base64");

      // Convert Buffer to ArrayBuffer for Netlify Blobs
      const arrayBuffer = buffer.buffer.slice(
        buffer.byteOffset,
        buffer.byteOffset + buffer.byteLength,
      );

      // Generate unique key for the blob
      const baseFilename = filename?.replace(".pdf", "") || "converted";
      const blobKey = `${baseFilename}-page-${i + 1}-${Date.now()}.png`;

      // Upload to Netlify Blob
      await store.set(blobKey, arrayBuffer, {
        metadata: {
          contentType: "image/png",
          pageNumber: i + 1,
          originalFilename: filename,
          uploadedAt: new Date().toISOString(),
        },
      });

      // Generate URL that uses your API route instead of direct blob access
      const publicUrl = `${process.env.NETLIFY_SITE_URL || "https://theshack.netlify.app"}/api/images/${blobKey}`;

      uploadedImages.push({
        pageNumber: i + 1,
        url: publicUrl,
        key: blobKey,
        filename: `${baseFilename}-page-${i + 1}.png`,
      });
    }

    return NextResponse.json({
      success: true,
      images: uploadedImages,
      count: uploadedImages.length,
    });
  } catch (error) {
    console.error("Netlify Blob upload error:", error);
    return NextResponse.json(
      { error: "Failed to upload images to Netlify blob storage" },
      { status: 500 },
    );
  }
}
export async function DELETE(request: Request) {
  try {
    const body = await request.json();
    const { keys } = body;

    if (!Array.isArray(keys) || keys.length === 0) {
      return NextResponse.json(
        { error: "An array of blob keys is required" },
        { status: 400 },
      );
    }

    const store = getStore({
      name: "pdf-images",
      siteID: process.env.NETLIFY_SITE_ID,
      token: process.env.NETLIFY_TOKEN,
    });

    const deleted = [];

    for (const key of keys) {
      await store.delete(key);
      deleted.push(key);
    }

    return NextResponse.json({
      success: true,
      deleted,
      count: deleted.length,
    });
  } catch (error) {
    console.error("Netlify Blob delete error:", error);
    return NextResponse.json(
      { error: "Failed to delete images from Netlify blob storage" },
      { status: 500 },
    );
  }
}
