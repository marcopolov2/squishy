import React, { useState } from "react";
import axios from "axios";
import FileDragUpload from "./FileDragUpload";
import { ImageCompare } from "./ImageCompare";
import Slider from "./Slider";

const ImageUploader = () => {
  const [file, setFile] = useState<File | null>(null);
  const [compressedFile, setCompressedFile] = useState<Blob | File | null>(
    null
  );
  const [uploadedFile, setUploadedFile] = useState<Blob | File | null>(null);

  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [quality, setQuality] = useState<number>(80); // Default quality value (you can set it as per your requirement)

  const beforeSize: number = uploadedFile?.size ?? 0 / 1024 ?? 0;
  const afterSize: number = compressedFile?.size ?? 0 / 1024 ?? 0;
  const savingSize: number = beforeSize - afterSize;
  const savingPerc: number = (savingSize / beforeSize) * 100;

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0] || null;
    if (selectedFile) {
      setFile(selectedFile);
      setUploadedFile(null);
      setCompressedFile(null);
      setQuality(50);
    }
  };

  const handleUpload = async () => {
    if (!file) return;
    setUploading(true);
    setError(null);

    const formData = new FormData();
    formData.append("file", file);

    try {
      const { data } = await axios.post("/api/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (!data?.fileData) throw new Error("Invalid response from server.");

      setUploadedFile(data.fileData);

      console.log("File uploaded successfully:", data);
    } catch (error: any) {
      setError(error.response?.data?.error || "Error uploading image.");
    } finally {
      setUploading(false);
    }
  };

  const handleCompressImage = async () => {
    if (!file) {
      setError("No file selected.");
      return;
    }

    setUploading(true);
    setError(null);

    const formData = new FormData();
    formData.append("file", file);
    formData.append("quality", String(quality)); // Pass the quality value as a string

    try {
      const { data } = await axios.post("/api/compress", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (!data?.base64) throw new Error("Invalid response from server.");

      setCompressedFile(data);
      console.log("File compressed successfully:", data);
    } catch (error: any) {
      setError(error.response?.data?.error || "Error compressing image.");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div
      className="flex flex-col items-center p-4 w-full gap-4"
      draggable={false}
    >
      <FileDragUpload
        className="h-30"
        file={file}
        setFile={setFile}
        handleFileChange={handleFileChange}
      />

      {file && (
        <button
          onClick={handleUpload}
          disabled={uploading}
          className="px-4 py-2 bg-blue-500 text-white rounded mb-4"
        >
          {uploading ? "Uploading..." : "Upload"}
        </button>
      )}

      {error && <div className="text-red-500">{error}</div>}

      <section className="flex gap-6">
        {uploadedFile && (
          <div className="text-center">
            <h3 className="font-bold">Before</h3>
            <p>Size: {beforeSize.toFixed(2)} KB</p>
            <p>Type: {uploadedFile.type}</p>
          </div>
        )}
        {compressedFile && (
          <div className="text-center">
            <h3 className="font-bold">After</h3>
            <p>Size: {afterSize.toFixed(2)} KB</p>
            <p>Type: {compressedFile.type}</p>
          </div>
        )}

        {uploadedFile && compressedFile && (
          <div className="text-center">
            <h3 className="font-bold">After</h3>

            <div className="flex flex-col gap-3">
              <p>{savingSize.toFixed(2)} KB</p>
              <p>{savingPerc.toFixed(2)}%</p>
            </div>
          </div>
        )}
      </section>

      {/* Slider for quality adjustment */}
      <Slider
        className="w-1/2"
        label="Quality"
        value={quality}
        setValue={setQuality}
      />

      {/* Compress Button */}
      {uploadedFile && (
        <button
          className="px-4 py-2 bg-green-500 text-white rounded my-4"
          onClick={handleCompressImage}
          disabled={uploading}
        >
          {uploading ? "Compressing..." : "Compress Image"}
        </button>
      )}

      {/* Image Comparison Slider */}
      {uploadedFile && compressedFile && (
        <div className="w-full">
          <ImageCompare
            beforeImgSrc={`data:${uploadedFile.type};base64,${uploadedFile.base64}`}
            afterImgSrc={`data:${uploadedFile.type};base64,${compressedFile.base64}`}
          />
        </div>
      )}
    </div>
  );
};

export default ImageUploader;
