"use client";

import Image from "next/image";
import { useState, useCallback, forwardRef, useEffect, useRef } from "react";
import clsx from "clsx";

interface SliderProps {
  beforeImgSrc?: string;
  afterImgSrc?: string;
  className?: string;
}

export const ImageCompare = forwardRef<HTMLDivElement, SliderProps>(
  ({ beforeImgSrc, afterImgSrc, className }, ref) => {
    const [sliderPosition, setSliderPosition] = useState(50);
    const [imageSize, setImageSize] = useState<{
      width: number;
      height: number;
    } | null>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const isDragging = useRef(false);

    const updateSlider = useCallback((clientX: number) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const x = Math.max(0, Math.min(clientX - rect.left, rect.width));
      setSliderPosition((x / rect.width) * 100);
    }, []);

    const handleMove = useCallback(
      (event: MouseEvent | TouchEvent) => {
        if (!isDragging.current || !containerRef.current) return;
        const clientX =
          "touches" in event ? event.touches[0].clientX : event.clientX;
        updateSlider(clientX);
      },
      [updateSlider]
    );

    const handleInteractionStart = useCallback(
      (event: React.MouseEvent | React.TouchEvent) => {
        isDragging.current = true;

        document.addEventListener(
          "mouseup",
          () => (isDragging.current = false),
          { once: true }
        );
        document.addEventListener(
          "touchend",
          () => (isDragging.current = false),
          { once: true }
        );

        const clientX =
          "touches" in event ? event.touches[0].clientX : event.clientX;
        updateSlider(clientX);
      },
      [handleMove, updateSlider]
    );

    useEffect(() => {
      if (!beforeImgSrc) return;

      const img = document.createElement("img");
      img.src = beforeImgSrc;
      img.onload = () => {
        setImageSize({ width: img.naturalWidth, height: img.naturalHeight });
      };
    }, [beforeImgSrc]);

    useEffect(() => {
      document.addEventListener("mousemove", handleMove);
      document.addEventListener("touchmove", handleMove);

      return () => {
        document.removeEventListener("mousemove", handleMove);
        document.removeEventListener("touchmove", handleMove);
      };
    }, []);

    return (
      <div ref={ref} className={clsx("w-full relative", className)}>
        <div className="flex justify-between mb-2">
          <span>Original</span>
          <span>Compressed</span>
        </div>
        <div
          ref={containerRef}
          className="relative max-w-2xl max-h-[62.5rem] mx-auto overflow-hidden select-none cursor-pointer"
          onMouseDown={handleInteractionStart}
          onTouchStart={handleInteractionStart}
          style={{
            touchAction: "none",
            aspectRatio: imageSize
              ? `${imageSize.width} / ${imageSize.height}`
              : "16/9",
          }}
        >
          {afterImgSrc && (
            <Image
              src={afterImgSrc}
              alt=""
              fill
              priority
              style={{ objectFit: "cover" }}
            />
          )}
          <div
            className="absolute inset-0 overflow-hidden select-none"
            style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}
          >
            {beforeImgSrc && (
              <Image
                src={beforeImgSrc}
                fill
                priority
                alt=""
                style={{ objectFit: "cover" }}
              />
            )}
          </div>

          <div
            className="absolute top-0 bottom-0 w-1 bg-white cursor-ew-resize"
            style={{ left: `calc(${sliderPosition}% - 1px)` }}
          >
            <div className="bg-white absolute rounded-full h-4 w-4 -left-1.5 top-[calc(50%-5px)]" />
          </div>
        </div>
      </div>
    );
  }
);

ImageCompare.displayName = "ImageCompare";
