import React, { useState } from "react";
import axios from "axios";
import FileDragUpload from "./FileDragUpload";
import { ImageCompare } from "./ImageCompare";
import Slider from "./Slider";
import { formatFileSize, getSizeInKB } from "@/utils/utility";
import ThemeToggle from "./ThemeToggle";
import ImageCard from "./ImageCard";
import { IImage } from "@/models/data";
import Card from "./Card";
import Button from "./Button";
import CircularProgressBar from "./CircularProgressBar";

const Home = () => {
  const [file, setFile] = useState<File | null>(null);

  const [compressedFile, setCompressedFile] = useState<IImage | null>(null);
  const [uploadedFile, setUploadedFile] = useState<IImage | null>(null);

  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [quality, setQuality] = useState<number>(80);

  const beforeSize: number = getSizeInKB(uploadedFile?.size);
  const afterSize: number = getSizeInKB(compressedFile?.size);
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
    setCompressedFile(null);

    const formData = new FormData();
    formData.append("file", file);

    try {
      const { data } = await axios.post("/api/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (!data?.fileData) throw new Error("Invalid response from server.");

      setUploadedFile(data.fileData);
    } catch (error) {
      const errorMessage =
        error?.response?.data?.error || "Error uploading image.";

      setError(errorMessage);
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
    } catch (error) {
      setError(error.response?.data?.error || "Error compressing image.");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="scroll-smooth flex flex-col items-center w-full gap-4">
      <ThemeToggle className="h-7 w-36 mb-4 ml-auto" />

      <FileDragUpload
        className="h-40 w-full"
        file={file}
        handleFileChange={handleFileChange}
      />

      {file && !uploadedFile && (
        <Button
          isLoading={uploading}
          intent="secondary"
          onClick={handleUpload}
          className="mb-4"
        >
          {uploading ? "Uploading..." : "Upload"}
        </Button>
      )}

      {error && <div className="text-red-500">{error}</div>}

      <section className="flex gap-8 w-full justify-center my-8 flex-col xs:flex-row">
        {uploadedFile && (
          <ImageCard
            className="flex-1"
            heading="Original"
            image={{
              ...uploadedFile,
              base64: `data:${uploadedFile?.type};base64,${uploadedFile?.base64}`,
              size: formatFileSize(beforeSize),
            }}
          />
        )}

        {compressedFile && (
          <ImageCard
            className="flex-1"
            heading="Compressed"
            image={{
              ...compressedFile,
              base64: `data:${compressedFile?.type};base64,${compressedFile?.base64}`,
              size: formatFileSize(afterSize),
            }}
          />
        )}
      </section>

      {uploadedFile && (
        <Card headingClassName="text-center" className="w-full">
          {uploadedFile && (
            <Slider
              className="w-[80%] md:w-1/2"
              label="Quality:"
              min={1}
              value={quality}
              setValue={setQuality}
            />
          )}
          {uploadedFile && (
            <section className="w-full flex justify-center">
              <Button
                isLoading={uploading}
                intent="secondary"
                onClick={handleCompressImage}
                className="my-8 min-w-44"
              >
                {uploading ? "Compressing..." : "Compress Image"}
              </Button>
            </section>
          )}

          {uploadedFile && compressedFile && (
            <section className="w-full flex items-center justify-center gap-8">
              <CircularProgressBar percentage={savingPerc} />
              <div
                title="Original vs. Compressed Size"
                className="text-violet-600 dark:text-white p-4 rounded-md flex items-center"
              >
                {savingSize > 0 ? "-" : "+"}

                <span className="text-3xl px-2">
                  {formatFileSize(Math.abs(savingSize)).split(" ")?.[0]}
                </span>

                {formatFileSize(savingSize).split(" ")?.[1]}
              </div>
            </section>
          )}
          {uploadedFile && compressedFile && (
            <ImageCompare
              className="mt-8"
              beforeImgSrc={
                uploadedFile
                  ? `data:${uploadedFile?.type};base64,${uploadedFile?.base64}`
                  : undefined
              }
              afterImgSrc={
                compressedFile
                  ? `data:${compressedFile?.type};base64,${compressedFile?.base64}`
                  : undefined
              }
            />
          )}
        </Card>
      )}
    </div>
  );
};

export default Home;
