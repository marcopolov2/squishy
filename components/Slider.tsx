import React, { useCallback, useEffect, useRef, useState } from "react";
import clsx from "clsx";
import Utils from "@/utils/general/utils";

interface FileDragUploadProps {
  setValue: (value: number) => void;
  value: string | number;
  min?: string | number;
  max?: string | number;
  label: string;
  className?: string;
  disabled?: boolean;
}

const Slider: React.FC<FileDragUploadProps> = ({
  setValue,
  value,
  min = 0,
  max = 100,
  label,
  className,
  disabled,
}) => {
  const sliderEl = useRef<HTMLInputElement | null>(null);
  const [_value, _setValue] = useState(value);

  const debounceSetter = useCallback(
    Utils.debounce((value) => {
      setValue(value);
    }, 550),
    []
  );

  // Function to update slider's background
  const updateSliderStyles = (
    slider: HTMLInputElement,
    value: number | string
  ) => {
    const progress = (Number(value) / parseFloat(slider.max)) * 100;
    slider.style.background = `linear-gradient(to right, #e4793f ${progress}%, #ccc ${progress}%)`;
  };

  const handleChange = (val) => {
    _setValue(val);
    debounceSetter(val);
  };

  // Sync slider background with the updated value
  useEffect(() => {
    if (sliderEl.current) {
      updateSliderStyles(sliderEl.current, _value);
    }
  }, [_value]);

  return (
    <div
      className={clsx(
        "slider",
        "flex gap-3 flex-col items-center mx-auto",
        className
      )}
      style={{ touchAction: "none" }}
    >
      <label
        htmlFor="quality"
        className="block mb-8 text-xl font-medium text-gray-500 dark:text-white"
      >
        {label} {_value}
      </label>

      <input
        ref={sliderEl}
        type="range"
        name="quality"
        min={min}
        max={max}
        disabled={disabled}
        value={_value}
        onChange={(e) => handleChange(e.target.value)}
      />
    </div>
  );
};

export default Slider;
