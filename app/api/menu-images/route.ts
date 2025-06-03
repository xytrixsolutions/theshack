// app/api/menu-images/route.ts
import { NextResponse } from "next/server";
import { getStore, ListResultBlob } from "@netlify/blobs";

export async function GET() {
  try {
    // Initialize Netlify Blob store
    const store = getStore({
      name: "pdf-images",
      siteID: process.env.NETLIFY_SITE_ID,
      token: process.env.NETLIFY_TOKEN,
    });

    // Get all blobs from the store
    const { blobs } = await store.list();

    if (!blobs || blobs.length === 0) {
      return NextResponse.json({
        success: true,
        images: [],
        count: 0,
      });
    }

    // Sort blobs by upload time (most recent first) and group by filename base
    const sortedBlobs = (blobs as ListResultBlob[])
      .filter((blob) => blob.key.includes(".png"))
      .sort((a, b) => {
        const aTime = new Date(
          (a.metadata?.uploadedAt as string) || 0,
        ).getTime();
        const bTime = new Date(
          (b.metadata?.uploadedAt as string) || 0,
        ).getTime();
        return bTime - aTime; // Most recent first
      });

    // Get the most recent upload batch
    if (sortedBlobs.length === 0) {
      return NextResponse.json({
        success: true,
        images: [],
        count: 0,
      });
    }

    // Find the most recent upload time
    const mostRecentTime = sortedBlobs[0].metadata?.uploadedAt as
      | string
      | undefined;

    // Get all images from the most recent upload batch
    const recentImages = sortedBlobs.filter(
      (blob) =>
        (blob.metadata?.uploadedAt as string | undefined) === mostRecentTime,
    );

    // Sort by page number
    const menuImages = recentImages
      .map((blob) => ({
        pageNumber: (blob.metadata?.pageNumber as string | undefined)
          ? parseInt(blob.metadata.pageNumber as string, 10)
          : 1,
        url: `${process.env.NETLIFY_SITE_URL || "https://theshack.netlify.app"}/api/images/${blob.key}`,
        key: blob.key,
        filename: blob.key.replace(/\.[^/.]+$/, ".png"),
        uploadedAt: blob.metadata?.uploadedAt as string | undefined,
        originalFilename: blob.metadata?.originalFilename as string | undefined,
      }))
      .sort((a, b) => a.pageNumber - b.pageNumber);

    return NextResponse.json({
      success: true,
      images: menuImages,
      count: menuImages.length,
      uploadedAt: mostRecentTime,
    });
  } catch (error) {
    console.error("Error fetching menu images:", error);
    return NextResponse.json(
      { error: "Failed to fetch menu images" },
      { status: 500 },
    );
  }
}
