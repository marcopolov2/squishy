import React from "react";
import clsx from "clsx";

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
        "w-full flex items-center justify-center rounded-md border-2 border-dashed border-gray-700 dark:border-white bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600",
        className
      )}
      onDrop={handleDrop}
      onDragOver={handleDragOver}
    >
      <label className="flex flex-col items-center m-4 cursor-pointer">
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
          <span className="text-green-500 dark:text-green-400">
            {file.name}
          </span>
        ) : (
          <span className="text-gray-500 dark:text-gray-400">
            or click to select
          </span>
        )}
      </label>
    </div>
  );
};

export default FileDragUpload;
