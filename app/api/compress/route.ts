import { NextResponse } from "next/server";
import { FILE_TYPES } from "../../../utils/images/constants";
import sharp from "sharp";

export async function POST(req: Request) {
  let fileBuffer: Buffer | null = null;
  let compressedBuffer: Buffer | null = null;

  try {
    const formData = await req.formData();
    const file = formData.get("file") as File | null;

    if (!file) {
      return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
    }

    const fileType: string = file.type.split("/")[1] || "";

    if (!FILE_TYPES.includes(fileType)) {
      return NextResponse.json(
        {
          error: `File type ${fileType} not supported. Supported types are ${FILE_TYPES.join(
            ", "
          )}`,
        },
        { status: 400 }
      );
    }

    fileBuffer = Buffer.from(await file.arrayBuffer());
    let width: number | null = null;
    let height: number | null = null;

    try {
      const metadata = await sharp(fileBuffer).metadata();
      width = metadata.width ?? null;
      height = metadata.height ?? null;
    } catch (error) {
      console.error("Error extracting image dimensions:", error);
    }

    const quality = Number(formData.get("quality"));
    const compress = getCompressionOptions(fileType, quality, width, height);

    if (!compress) {
      return NextResponse.json(
        { error: "Unsupported file type" },
        { status: 400 }
      );
    }

    compressedBuffer = await compress(fileBuffer);
    const base64Data = compressedBuffer.toString("base64");

    const fileData = {
      name: file.name,
      size: compressedBuffer.length,
      type: `image/${fileType}`,
      width,
      height,
      base64: base64Data,
      uploadedAt: new Date().toISOString(),
    };

    return NextResponse.json({ fileData });
  } catch (error) {
    return NextResponse.json(
      { error: (error as Error).message },
      { status: 400 }
    );
  } finally {
    fileBuffer = null;
    compressedBuffer = null;
    global.gc?.(); // Explicit garbage collection if enabled
  }
}

// Compress file
const getCompressionOptions = (
  type: string,
  quality: number,
  width: number,
  height: number
) => {
  const options: { [key: string]: (buffer: Buffer) => Promise<Buffer> } = {
    jpeg: async (buffer) => {
      const instance = sharp(buffer);
      const result = await instance
        .resize({ width, height, fit: "fill" })
        .jpeg({ quality })
        .toBuffer();
      instance.destroy();
      return result;
    },
    png: async (buffer) => {
      const instance = sharp(buffer);
      const result = await instance
        .resize({ width, height, fit: "fill" })
        .png({ quality })
        .toBuffer();
      instance.destroy();
      return result;
    },
    webp: async (buffer) => {
      const instance = sharp(buffer);
      const result = await instance
        .resize({ width, height, fit: "fill" })
        .webp({ quality })
        .toBuffer();
      instance.destroy();
      return result;
    },
    tiff: async (buffer) => {
      const instance = sharp(buffer);
      const result = await instance
        .resize({ width, height, fit: "fill" })
        .tiff({ quality })
        .toBuffer();
      instance.destroy();
      return result;
    },
    avif: async (buffer) => {
      const instance = sharp(buffer);
      const result = await instance
        .resize({ width, height, fit: "fill" })
        .avif({ quality, effort: 3 })
        .toBuffer();
      instance.destroy();
      return result;
    },
    heif: async (buffer) => {
      const instance = sharp(buffer);
      const result = await instance
        .resize({ width, height, fit: "fill" })
        .heif({ quality })
        .toBuffer();
      instance.destroy();
      return result;
    },
    jp2: async (buffer) => {
      const instance = sharp(buffer);
      const result = await instance
        .resize({ width, height, fit: "fill" })
        .jp2({ quality })
        .toBuffer();
      instance.destroy();
      return result;
    },
    jxl: async (buffer) => {
      const instance = sharp(buffer);
      const result = await instance
        .resize({ width, height, fit: "fill" })
        .jxl({ quality })
        .toBuffer();
      instance.destroy();
      return result;
    },
  };

  return options[type] || null;
};
