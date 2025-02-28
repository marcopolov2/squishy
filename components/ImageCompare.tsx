"use client";

import Image from "next/image";
import { useState, useCallback } from "react";
import clsx from "clsx";

interface SliderProps {
  beforeImgSrc?: string;
  afterImgSrc?: string;
  className?: string;
}

export const ImageCompare: React.FC<SliderProps> = ({
  beforeImgSrc,
  afterImgSrc,
  className,
}) => {
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);

  const handleMove = useCallback((clientX: number, rect: DOMRect) => {
    const x = Math.max(0, Math.min(clientX - rect.left, rect.width));
    const percent = Math.max(0, Math.min((x / rect.width) * 100, 100));
    setSliderPosition(percent);
  }, []);

  const handleMouseMove = useCallback(
    (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
      if (!isDragging) return;
      const rect = event.currentTarget.getBoundingClientRect();
      handleMove(event.clientX, rect);
    },
    [isDragging, handleMove]
  );

  const handleTouchMove = useCallback(
    (event: React.TouchEvent<HTMLDivElement>) => {
      if (!isDragging) return;

      const rect = event.currentTarget.getBoundingClientRect();
      if (event.touches.length > 0) {
        const touch = event.touches[0];
        handleMove(touch.clientX, rect);
      }
    },
    [isDragging, handleMove]
  );

  const handleInteractionStart = useCallback(() => setIsDragging(true), []);
  const handleInteractionEnd = useCallback(() => setIsDragging(false), []);

  return (
    <div
      className={clsx("w-full relative ", className)}
      onMouseUp={handleInteractionEnd}
      onTouchEnd={handleInteractionEnd}
    >
      <div className="flex justify-between mb-2">
        <span>Original</span>
        <span>Compressed</span>
      </div>
      <div
        className="relative w-full aspect-[70/45] m-auto overflow-hidden select-none"
        onMouseMove={handleMouseMove}
        onTouchMove={handleTouchMove}
        onMouseDown={handleInteractionStart}
        onTouchStart={handleInteractionStart}
        style={{ touchAction: "none" }}
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
          className="absolute top-0 left-0 right-0 w-full aspect-[70/45] m-auto overflow-hidden select-none"
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
          style={{
            left: `calc(${sliderPosition}% - 1px)`,
          }}
        >
          <div className="bg-white absolute rounded-full h-4 w-4 -left-1.5 top-[calc(50%-5px)]" />
        </div>
      </div>
    </div>
  );
};
