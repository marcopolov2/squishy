import React, { useEffect, useState } from "react";
import clsx from "clsx";

interface LoaderProps {
  isLoading?: boolean;
}

const SPEED_FACTOR = 1;

const Loader: React.FC<LoaderProps> = ({ isLoading }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (progress >= 100 || !isLoading) {
      return;
    }

    const timeout = setTimeout(() => {
      setProgress((prev) => prev + 0.5);
    }, Math.pow(SPEED_FACTOR, progress));

    return () => clearTimeout(timeout);
  }, [progress, isLoading]);

  useEffect(() => {
    if (!isLoading) {
      setProgress(0);
    }
  }, [isLoading]);

  return (
    <div
      className={clsx(
        "overflow-hidden relative bg-transparent rounded-lg w-full h-2 mt-4 bg-gray-200",
        isLoading ? "opacity-100" : "opacity-0"
      )}
    >
      <div
        className="absolute h-full bg-gradient-to-r from-[#8668b8] to-[#be95c2] rounded-[6.25rem]"
        style={{
          width: `${progress}%`,
          transition: "width 0.2s linear",
        }}
      ></div>
    </div>
  );
};

export default Loader;
