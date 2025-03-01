import React, { useRef, useState } from "react";
import FileDragUpload from "./FileDragUpload";
import { ImageCompare } from "./ImageCompare";
import Slider from "./Slider";
import ThemeToggle from "./ThemeToggle";
import ImageCard from "./ImageCard";
import { IImage } from "@/models/data";
import Card from "./Card";
import Button from "./Button";
import CircularProgressBar from "./CircularProgressBar";
import clsx from "clsx";
import { _compressFile, _uploadFile } from "../utils/api/actions";
import Utils from "@/utils/general/utils";

const Home = () => {
  const imageCompareRef = useRef(null);
  const [file, setFile] = useState<File | null>(null);

  const [uploadedFile, setUploadedFile] = useState<IImage | null>(null);
  const [compressedFile, setCompressedFile] = useState<IImage | null>(null);

  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [quality, setQuality] = useState<number>(20);

  const beforeSize: number = Utils.getSizeInKB(uploadedFile?.size);
  const afterSize: number = Utils.getSizeInKB(compressedFile?.size);
  const savingSize: number = beforeSize - afterSize;
  const savingPerc: number = (savingSize / beforeSize) * 100;
  const savingPercFormat = Utils.getFileSize(Math.abs(savingSize)).split(" ");
  const savingSizing = Utils.getFileSize(savingSize).split(" ");

  const scrollToCompare = () => {
    setTimeout(() => {
      imageCompareRef?.current?.scrollIntoView({
        behavior: "smooth",
        block: "center",
        inline: "center",
      });
    }, 200);
  };

  const handleFileChange = (file) => {
    setQuality(20);
    setFile(file);
    setError(null);
    setUploadedFile(null);
    setCompressedFile(null);
    setQuality(20);
  };

  const handleUpload = async () => {
    setUploading(true);
    setError(null);
    setCompressedFile(null);

    const { error = "", fileData = {} } = await _uploadFile(file);
    setError(error || "");
    setUploadedFile(error ? null : fileData);
    setUploading(false);
  };

  const handleCompress = async () => {
    setUploading(true);
    setError(null);

    const { error = "", fileData = {} } = await _compressFile(file, quality);
    setError(error || "");
    setCompressedFile(error ? null : fileData);
    setUploading(false);
    scrollToCompare();
  };

  return (
    <div className="scroll-smooth flex flex-col items-center w-full gap-4">
      <ThemeToggle className="h-7 w-36 mb-4 ml-auto" />

      <FileDragUpload className="w-full" handleFileChange={handleFileChange} />

      {file && !uploadedFile && (
        <Card
          headingClassName="text-center"
          className="w-full flex justify-center flex-col items-center gap-3"
        >
          <div> {file.name}</div>
          <Button
            intent="color"
            className="w-1/3 min-w-60"
            showLoader
            disabled={uploading}
            isLoading={uploading}
            onClick={handleUpload}
          >
            {uploading ? "Uploading..." : "Upload"}
          </Button>
        </Card>
      )}

      {error && <div className="text-red-400">{error}</div>}

      {uploadedFile && (
        <Card headingClassName="text-center" className="w-full">
          {uploadedFile && (
            <Slider
              className="w-[80%] md:w-1/2"
              label="Quality:"
              min={1}
              max={80}
              setValue={setQuality}
              disabled={uploading}
            />
          )}

          {uploadedFile && (
            <section className="w-full flex justify-center my-12">
              <Button
                intent="color"
                className="w-full sm:min-w-60"
                showLoader={false}
                isLoading={uploading}
                disabled={uploading}
                onClick={handleCompress}
              >
                {uploading ? "Compressing..." : "Compress"}
              </Button>
            </section>
          )}

          <section className="flex gap-8 w-full justify-center my-4 flex-col md:flex-row">
            {uploadedFile && (
              <ImageCard
                className={clsx(
                  "relative",
                  compressedFile ? "flex-1" : "w-full md:w-1/2"
                )}
                heading="Original"
                image={{
                  ...uploadedFile,
                  base64: `data:${uploadedFile?.type};base64,${uploadedFile?.base64}`,
                  size: Utils.getFileSize(beforeSize),
                }}
              />
            )}

            {compressedFile && (
              <ImageCard
                className="flex-1 relative"
                heading="Compressed"
                image={{
                  ...compressedFile,
                  base64: `data:${compressedFile?.type};base64,${compressedFile?.base64}`,
                  size: Utils.getFileSize(afterSize),
                }}
              >
                {uploadedFile && compressedFile && (
                  <section className="grid grid-rows-1 sm:grid-cols-2 gap-8 place-items-center mt-8 mb-16">
                    <CircularProgressBar percentage={savingPerc} />

                    <div className="dark:text-white rounded-md flex items-center justify-center">
                      {savingSize > 0 ? "-" : "+"}

                      <span className="text-3xl px-2">
                        {savingPercFormat[0]}
                      </span>
                      <span className="text-[#e3901c]">{savingSizing[1]}</span>
                    </div>
                  </section>
                )}
              </ImageCard>
            )}
          </section>

          {uploadedFile && compressedFile && (
            <ImageCompare
              ref={imageCompareRef}
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
