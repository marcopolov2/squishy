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
        "flex relative items-center justify-center rounded-md border-2 border-dashed border-gray-700 dark:border-white bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 cursor-pointer",
        className
      )}
      onDrop={handleDrop}
      onDragOver={handleDragOver}
      onClick={triggerFileInput}
    >
      <label
        className="flex flex-col w-full items-center m-4 cursor-pointer"
        onClick={(e) => e.stopPropagation()}
      >
        <span className="text-gray-400 dark:text-gray-200">
          Drag & Drop Files
        </span>

        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="hidden"
        />

        {file ? (
          <span className="text-[#e4793f] text-sm">{file.name}</span>
        ) : (
          <span className="text-gray-500 dark:text-gray-400 flex flex-col items-center">
            or click to select
            <span className="text-sm">
              Support formats: {FILE_TYPES.join(", ")}
            </span>
          </span>
        )}
      </label>
    </div>
  );
};

export default FileDragUpload;
