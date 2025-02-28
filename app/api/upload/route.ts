import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import { v4 as uuidv4 } from "uuid";

const jsonFilePath = path.join(process.cwd(), "DB_IMAGES.json");

/**
 * Handles the file upload request.
 */
export async function POST(req: Request) {
  try {
    // Get file contents and store it in DB_IMAGES.json
    const fileData = await getFileAsBase64(req);

    // Read existing files from DB_IMAGES.json
    const storedFiles = readStoredFiles();

    // Add new file data to the stored files array
    storedFiles.push(fileData);

    // Write updated files array back to DB_IMAGES.json
    writeStoredFiles(storedFiles);

    return NextResponse.json({
      message: "File uploaded successfully",
      fileData,
    });
  } catch ({ message = "" }) {
    return NextResponse.json({ error: message }, { status: 400 });
  }
}

/**
 * Retrieves the uploaded file, converts it to Base64, and returns metadata with the Base64 string.
 */
const getFileAsBase64 = async (req: Request) => {
  const formData = await req.formData();
  const file = formData.get("file") as File | null;

  if (!file) throw new Error("No file uploaded");

  // Create a unique file name for storing the file
  const fileId = uuidv4();

  // Convert the file to a Base64 string
  const fileBuffer = Buffer.from(await file.arrayBuffer());
  const base64Data = fileBuffer.toString("base64");

  return {
    id: fileId,
    name: file.name,
    type: file.type,
    size: file.size,
    base64: base64Data, // Store the Base64 encoded data in the JSON
    uploadedAt: new Date().toISOString(),
  };
};

/**
 * Reads stored files from the DB_IMAGES.json file.
 */
const readStoredFiles = () => {
  try {
    if (fs.existsSync(jsonFilePath)) {
      // Attempt to read and parse the file
      const rawData = fs.readFileSync(jsonFilePath, "utf8");

      // If the file is empty, return an empty array
      if (!rawData.trim()) {
        return [];
      }

      return JSON.parse(rawData);
    }
    // If the file doesn't exist, return an empty array
    return [];
  } catch (error) {
    // In case of error (e.g., malformed JSON), return an empty array
    console.error("Error reading DB_IMAGES.json:", error);
    return [];
  }
};

/**
 * Writes updated stored files back to the DB_IMAGES.json file.
 */
const writeStoredFiles = (data) => {
  fs.writeFileSync(jsonFilePath, JSON.stringify(data, null, 2));
};
