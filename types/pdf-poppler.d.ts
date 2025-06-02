declare module "pdf-poppler" {
  interface PdfConverterOptions {
    format?: "jpeg" | "png";
    out_dir: string;
    out_prefix?: string;
    page?: number | null;
    scale?: number;
    resolution?: number;
  }

  export class PdfConverter {
    static convert(
      filePath: string,
      options: PdfConverterOptions,
    ): Promise<void>;
  }
}
