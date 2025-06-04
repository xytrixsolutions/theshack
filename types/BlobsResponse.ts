export interface BlobItem {
  key: string;
}

export interface BlobListSuccessResponse {
  success: true;
  blobs: BlobItem[];
}

export interface BlobListErrorResponse {
  error: string;
}

export type BlobListResponse = BlobListSuccessResponse | BlobListErrorResponse;
