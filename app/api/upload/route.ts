import { NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";
import { v4 as uuidv4 } from "uuid";
import sharp from "sharp";
import { DB } from "@/utils/images/constants";

const jsonFilePath = path.join(process.cwd(), DB);

let cachedFiles = null;

const getAllFiles = async () => {
  if (cachedFiles) return cachedFiles;

  try {
    const rawData = await fs.readFile(jsonFilePath, "utf8");
    cachedFiles = rawData.trim() ? JSON.parse(rawData) : [];
    return cachedFiles;
  } catch (error) {
    console.error("Error reading DB_IMAGES.json:", error);
    return [];
  }
};

const writeStoredFiles = async (data) => {
  try {
    cachedFiles = data;

    await fs.writeFile(jsonFilePath, JSON.stringify(data, null, 2));
  } catch (error) {
    console.error("Error writing to DB_IMAGES.json:", error);
  }
};

// POST Request Handler
export async function POST(req: Request) {
  try {
    const fileData = await getFileContents(req);
    const storedFiles = await getAllFiles();

    storedFiles.push(fileData);

    writeStoredFiles(storedFiles);

    return NextResponse.json({ fileData });
  } catch (error) {
    console.error("Error in POST handler:", error);
    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : "Error Uploading File",
      },
      { status: 400 }
    );
  }
}

// Function to handle file contents and create the fileData object
const getFileContents = async (req: Request) => {
  const formData = await req.formData();
  const file = formData.get("file") as File | null;

  if (!file) throw new Error("No file uploaded");

  const fileId = uuidv4();
  let fileBuffer: Buffer | null = Buffer.from(await file.arrayBuffer());
  const base64Data = fileBuffer.toString("base64");

  let width = 0;
  let height = 0;

  if (file.type.startsWith("image/")) {
    try {
      const metadata = await sharp(fileBuffer).metadata();
      width = metadata.width ?? 0;
      height = metadata.height ?? 0;
    } catch (error) {
      console.error("Error extracting image dimensions:", error);
    }
  }

  fileBuffer = null;

  return {
    id: fileId,
    name: file.name,
    type: file.type,
    size: file.size,
    width,
    height,
    base64: base64Data,
    uploadedAt: new Date().toISOString(),
  };
};
