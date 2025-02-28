import { NextResponse } from "next/server";
import fs from "fs/promises"; // Use the async version of fs
import path from "path";
import { v4 as uuidv4 } from "uuid";
import sharp from "sharp";
import { DB } from "@/utils/images/constants";

const jsonFilePath = path.join(process.cwd(), DB);

export async function POST(req: Request) {
  try {
    const fileData = await getFileContents(req);
    const storedFiles = await getAllFiles();

    storedFiles.push(fileData);
    await writeStoredFiles(storedFiles);

    return NextResponse.json({ fileData });
  } catch ({ message = "" }) {
    return NextResponse.json(
      { error: message || "Error Uploading File" },
      { status: 400 }
    );
  }
}

const getFileContents = async (req: Request) => {
  const formData = await req.formData();
  const file = formData.get("file") as File | null;

  if (!file) throw new Error("No file uploaded");

  const fileId = uuidv4();
  const fileBuffer = Buffer.from(await file.arrayBuffer());
  const base64Data = fileBuffer.toString("base64");

  const defaultDimensions = { width: 0, height: 0 };

  let width = defaultDimensions.width;
  let height = defaultDimensions.height;

  if (file.type.startsWith("image/")) {
    try {
      const metadata = await sharp(fileBuffer).metadata();
      width = metadata.width || defaultDimensions.width;
      height = metadata.height || defaultDimensions.height;
    } catch (error) {
      console.error("Error extracting image dimensions:", error);
    }
  }

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

const getAllFiles = async () => {
  try {
    const rawData = await fs.readFile(jsonFilePath, "utf8");
    return rawData.trim() ? JSON.parse(rawData) : [];
  } catch (error) {
    console.error("Error reading DB_IMAGES.json:", error);
    return [];
  }
};

const writeStoredFiles = async (data) => {
  try {
    await fs.writeFile(jsonFilePath, JSON.stringify(data, null, 2));
  } catch (error) {
    console.error("Error writing to DB_IMAGES.json:", error);
  }
};
