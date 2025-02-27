import React from "react";
import clsx from "clsx";

interface FileDragUploadProps {
  setValue: (value: number) => void;
  value: string | number;
  min?: string | number;
  max?: string | number;
  label: string;
  className?: string;
}

const Slider: React.FC<FileDragUploadProps> = ({
  setValue,
  value,
  min = 1,
  max = 99,
  label,
  className,
}) => {
  return (
    <div
      className={clsx(
        "slider",
        "my-4 flex gap-3 flex-col items-center",
        className
      )}
    >
      <label
        htmlFor="quality"
        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
      >
        {label}: {value}
      </label>

      <input
        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
        id="quality"
        type="range"
        min={min}
        max={max}
        value={value}
        onChange={(e) => setValue(Number(e.target.value))}
      />
    </div>
  );
};

export default Slider;
