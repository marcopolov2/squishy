import React, { ReactNode } from "react";
import Image from "next/image";
import Card from "./Card";
import Utils from "@/utils/general/utils";
import downloadIcon from "../app/public/download.svg";

interface ImageCardProps {
  image?: {
    name?: string;
    type?: string;
    width?: number;
    height?: number;
    size?: string;
    uploadedAt?: string;
    base64?: string;
  };

  heading?: string;
  className?: string;
  children?: ReactNode;
}

const ImageCard: React.FC<ImageCardProps> = ({
  image,
  heading,
  className,
  children,
}) => {
  const handleDownload = () => {
    if (image?.base64) {
      const link = document.createElement("a");
      link.href = image.base64;
      link.download = image.name || "download";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  return (
    <Card
      heading={heading}
      className={className}
      headingClassName="text-center"
    >
      <div className="relative h-32 md:h-32">
        <Image
          src={image?.base64 || ""}
          alt=""
          fill
          className="object-contain"
        />
      </div>

      <div className="mt-4 text-sm">
        <p className="grid grid-cols-2">
          <span className="font-medium">Uploaded At:</span>{" "}
          {Utils.formatDate(image?.uploadedAt, "DD-MM-YYYY")}
        </p>
        <p className="grid grid-cols-2">
          <span className="font-medium">Name:</span> {image?.name}
        </p>
        <p className="grid grid-cols-2">
          <span className="font-medium">Type:</span> {image?.type}
        </p>

        <p className="grid grid-cols-2">
          <span className="font-medium">Dimensions:</span> {image?.width}
          {" x "}
          {image?.height}
        </p>

        <span className="font-medium grid grid-cols-2">
          <span>Size:</span>
          <span className="text-orange-400">{image?.size}</span>
        </span>
      </div>

      {children}

      <Image
        src={downloadIcon}
        alt="Download"
        className="m-2 absolute bottom-4 right-4 w-8 h-8 cursor-pointer"
        onClick={handleDownload}
      />
    </Card>
  );
};

export default ImageCard;
