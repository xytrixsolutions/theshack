/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextResponse } from "next/server";
import { getStore } from "@netlify/blobs";
import { BlobListResponse } from "@/types/BlobsResponse";

export async function GET(): Promise<NextResponse<BlobListResponse>> {
  try {
    const store = getStore({
      name: "pdf-images",
      siteID: process.env.NETLIFY_SITE_ID,
      token: process.env.NETLIFY_TOKEN,
    });

    const { blobs } = await store.list();

    return NextResponse.json({
      success: true,
      blobs: blobs.map((blob: any) => ({
        key: blob.key,
      })),
    });
  } catch (error) {
    console.error("Netlify Blob list error:", error);
    return NextResponse.json(
      { error: "Failed to list images from Netlify blob storage" },
      { status: 500 },
    );
  }
}
