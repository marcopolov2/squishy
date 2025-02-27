import React from "react";
import clsx from "clsx";
import { FILE_TYPES } from "@/utils/images/constants";

interface FileDragUploadProps {
  setFile: (file: File) => void;
  handleFileChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  file: File | null;
  className?: string;
}

const FileDragUpload: React.FC<FileDragUploadProps> = ({
  setFile,
  handleFileChange,
  file,
  className,
}) => {
  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    const droppedFile = event.dataTransfer.files[0];
    if (droppedFile) {
      setFile(droppedFile);
    }
  };

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  };

  return (
    <div
      className={clsx(
        "flex relative items-center justify-center rounded-md border-2 border-dashed border-gray-700 dark:border-white bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600",
        className
      )}
      onDrop={handleDrop}
      onDragOver={handleDragOver}
    >
      <label className="flex flex-col w-full items-center m-4 cursor-pointer">
        <span className="text-gray-400 dark:text-gray-200">
          Drag & Drop Files
        </span>

        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="hidden"
        />

        {file ? (
          <span className="text-[#f35c0b]"> {file.name}</span>
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
