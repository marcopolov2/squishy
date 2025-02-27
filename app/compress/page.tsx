"use client";

import ImageUploader from "@/components/ImageUploader";
import ThemeToggle from "@/components/ThemeToggle";

const CompressPage = () => {
  return (
    <div className="space-y-6 flex flex-col gap-5 items-center">
      <ThemeToggle className="w-36 ml-auto" />

      <h2 className="text-2xl font-semibold">Compress Your Image</h2>

      <p className="text-gray-700 dark:text-gray-300 text-center">
        Upload and Sqeeesh
      </p>

      <ImageUploader />
    </div>
  );
};

export default CompressPage;
