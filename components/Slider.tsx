import React, { useEffect, useRef } from "react";
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
  min = 0,
  max = 100,
  label,
  className,
}) => {
  const sliderEl = useRef<HTMLInputElement | null>(null);
  const sliderValue = useRef<HTMLSpanElement | null>(null);

  // Function to update slider's background and thumb rotation
  const updateSliderStyles = (slider: HTMLInputElement, value: number) => {
    const progress = (value / parseFloat(slider.max)) * 100;
    slider.style.background = `linear-gradient(to right, #e4793f ${progress}%, #ccc ${progress}%)`;
  };

  useEffect(() => {
    if (sliderEl.current && sliderValue.current) {
      const slider = sliderEl.current;
      const valueDisplay = sliderValue.current;

      // Update value display and background when slider value changes
      const updateSlider = (event: Event) => {
        const tempSliderValue = (event.target as HTMLInputElement).value;
        valueDisplay.textContent = tempSliderValue;
        setValue(Number(tempSliderValue));
        updateSliderStyles(slider, parseFloat(tempSliderValue));
      };

      slider.addEventListener("input", updateSlider);

      // Initial slider style setup when component mounts
      updateSliderStyles(slider, parseFloat(value as string));

      return () => {
        slider.removeEventListener("input", updateSlider);
      };
    }
  }, [value]);

  return (
    <div
      className={clsx(
        "slider",
        "my-8 flex gap-3 flex-col items-center mx-auto",
        className
      )}
      style={{ touchAction: "none" }}
    >
      <label
        htmlFor="quality"
        className="block mb-8 text-xl font-medium text-gray-900 dark:text-white"
      >
        {label} <span ref={sliderValue}>{value}</span>
      </label>

      <input
        ref={sliderEl}
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
