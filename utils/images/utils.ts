import sharp from "sharp";

// Compress file
export const getCompressionOptions = (type: string, quality: number) => {
  const options: { [key: string]: (buffer: Buffer) => Promise<Buffer> } = {
    jpeg: (buffer) => sharp(buffer).jpeg({ quality }).toBuffer(),
    png: (buffer) => sharp(buffer).png({ quality }).toBuffer(),
    webp: (buffer) => sharp(buffer).webp({ quality }).toBuffer(),
    tiff: (buffer) => sharp(buffer).tiff({ quality }).toBuffer(),
    avif: (buffer) => sharp(buffer).avif({ quality, effort: 3 }).toBuffer(),
    heif: (buffer) => sharp(buffer).heif({ quality }).toBuffer(),
    jp2: (buffer) => sharp(buffer).jp2({ quality }).toBuffer(),
    jxl: (buffer) => sharp(buffer).jxl({ quality }).toBuffer(),
  };

  // Return the corresponding compression function for the given type
  return options[type] || null; // Returns null if the type is unsupported
};
