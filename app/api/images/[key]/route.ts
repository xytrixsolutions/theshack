// app/api/images/[key]/route.ts
import { NextResponse } from "next/server";
import { getStore } from "@netlify/blobs";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ key: string }> },
) {
  try {
    const { key } = await params;

    if (!key) {
      return NextResponse.json(
        { error: "Image key is required" },
        { status: 400 },
      );
    }

    // Initialize Netlify Blob store
    const store = getStore({
      name: "pdf-images",
      siteID: process.env.NETLIFY_SITE_ID,
      token: process.env.NETLIFY_TOKEN,
    });

    // Get the image data from Netlify Blob
    const imageData = await store.get(key, { type: "arrayBuffer" });

    if (!imageData) {
      return NextResponse.json({ error: "Image not found" }, { status: 404 });
    }

    // Return the image with appropriate headers
    return new NextResponse(imageData, {
      headers: {
        "Content-Type": "image/png",
        "Cache-Control": "public, max-age=31536000, immutable",
      },
    });
  } catch (error) {
    console.error("Error serving image from Netlify Blob:", error);
    return NextResponse.json(
      { error: "Failed to retrieve image" },
      { status: 500 },
    );
  }
}
