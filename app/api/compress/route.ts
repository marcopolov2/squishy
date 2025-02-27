import { getCompressionOptions } from "@/utils/images/utils";
import { NextResponse } from "next/server";
import { FILE_TYPES } from "../../../utils/images/constants";

// takes file and returns compressed version
export async function POST(req: Request) {
  try {
    // Parse the incoming form data
    const formData = await req.formData();
    const file = formData.get("file") as File | null;

    if (!file) {
      return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
    }

    const fileType: string = file.type.split("/")[1] || "";

    if (!FILE_TYPES.find((file) => file === fileType)) {
      return NextResponse.json(
        {
          error: `File type ${fileType} not supported. Support types are ${FILE_TYPES.join(
            ", "
          )}`,
        },
        { status: 400 }
      );
    }

    const quality = Number(formData.get("quality"));

    // Get the compression function for the given file type and quality
    const compress = getCompressionOptions(fileType, quality);

    if (!compress) {
      return NextResponse.json(
        { error: "Unsupported file type" },
        { status: 400 }
      );
    }

    // Convert the file to a buffer
    const fileBuffer = await file.arrayBuffer();

    // Compress the file using the selected compression function
    const compressedBuffer = await compress(Buffer.from(fileBuffer));

    // Convert the compressed buffer to base64 for easier transmission
    const base64Data = compressedBuffer.toString("base64");

    return NextResponse.json({
      message: "File compressed successfully",
      name: file.name,
      size: compressedBuffer.length,
      type: `image/${fileType}`,
      base64: base64Data,
      uploadedAt: new Date().toISOString(),
    });
  } catch (error) {
    return NextResponse.json(
      { error: (error as Error).message },
      { status: 400 }
    );
  }
}
