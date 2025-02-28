import React, { useRef } from "react";
import clsx from "clsx";
import { FILE_TYPES } from "@/utils/images/constants";

interface FileDragUploadProps {
  handleFileChange: (event) => void;
  file: File | null;
  className?: string;
}

const FileDragUpload: React.FC<FileDragUploadProps> = ({
  handleFileChange,
  file,
  className,
}) => {
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();

    const droppedFile = event.dataTransfer.files[0];

    if (droppedFile) {
      handleFileChange({
        target: {
          files: [droppedFile],
        },
      });
    }
  };

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  };

  const triggerFileInput = () => {
    if (fileInputRef.current) {
      fileInputRef.current?.click();
    }
  };

  return (
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
        <span className="text-white dark:text-gray-200">Drag & Drop Files</span>

        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="hidden"
        />

        {file ? (
          <span className="text-white text-sm">{file.name}</span>
        ) : (
          <span className="text-white flex flex-col items-center">
            or click to select
            <span className="text-sm text-gray-200">
              Support formats: {FILE_TYPES.join(", ")}
            </span>
          </span>
        )}
      </label>
    </div>
  );
};

export default FileDragUpload;
