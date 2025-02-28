import React, { useRef, useState } from "react";
import clsx from "clsx";
import {
  FILE_TYPES,
  MAX_FILE_SIZE,
  MAX_FILE_SIZE_MB,
} from "@/utils/images/constants";

const ACCEPTABLE_TYPES = FILE_TYPES.map((type) => `image/${type}`);
const TYPES_FRIENDLY = FILE_TYPES.join(", ");

interface FileDragUploadProps {
  handleFileChange: (event) => void;
  className?: string;
}

const FileDragUpload: React.FC<FileDragUploadProps> = ({
  handleFileChange,
  className,
}) => {
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const [error, setError] = useState<string | null>(null);

  const validateFile = (file) => {
    const type = file?.type;
    const size = file?.size;

    // Check file type
    const isValidType = type && ACCEPTABLE_TYPES.includes(type);
    if (!isValidType) {
      setError(
        `File type "${type}" is not supported. Supported types: ${TYPES_FRIENDLY}`
      );
      handleFileChange(null);
      return;
    }

    // Check file size
    const isValidSize = size && size <= MAX_FILE_SIZE;
    if (!isValidSize) {
      setError(`File size exceeds the ${MAX_FILE_SIZE_MB}MB limit.`);
      handleFileChange(null);
      return;
    }

    setError(null);
    handleFileChange(file);
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    const droppedFile = event.dataTransfer.files[0];
    validateFile(droppedFile);
  };

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setError(null);
  };

  const handleFilePicked = (file) => {
    if (!file) return;
    setError(null);
    validateFile(file);
  };

  const triggerFileInput = () => {
    if (fileInputRef.current) {
      fileInputRef.current?.click();
    }
  };

  return (
    <>
      <div
        className={clsx(
          "flex relative items-center p-8 justify-center rounded-md border-2 shadow-lg border-dashed border-white bg-gradient-to-r from-blue-300 via-purple-400 to-pink-400 animate-gradient-x cursor-pointer",
          className
        )}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onClick={triggerFileInput}
      >
        <label
          className="flex flex-col w-full items-center cursor-pointer"
          onClick={(e) => e.stopPropagation()}
        >
          <span className="text-white text-2xl mb-4">Drag & Drop Files</span>

          <input
            ref={fileInputRef}
            accept={FILE_TYPES.map((type) => `.${type}`).join(", ")}
            type="file"
            onChange={(e) => {
              const selectedFile = e.target.files?.[0] || null;
              handleFilePicked(selectedFile);
            }}
            className="hidden"
          />

          <span className="text-white flex flex-col items-center">
            or click to select
            <span className="text-sm text-gray-200">
              Support formats: {TYPES_FRIENDLY}
            </span>
          </span>
        </label>
      </div>
      {error && <div className="text-red-400">{error}</div>}
    </>
  );
};

export default FileDragUpload;
