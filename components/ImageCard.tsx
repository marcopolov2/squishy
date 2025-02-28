import React, { ReactNode } from "react";
import Image from "next/image";
import Card from "./Card";
import { formatDate } from "@/utils/utility";
import Button from "./Button";

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
      // Create an anchor element to trigger the download
      const link = document.createElement("a");
      link.href = image.base64; // Set the href to the image source
      link.download = image.name || "download"; // Set the download filename
      document.body.appendChild(link); // Append the link to the body
      link.click(); // Trigger the click to start the download
      document.body.removeChild(link); // Clean up the link after download
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
          {formatDate(image?.uploadedAt, "DD-MM-YYYY")}
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
          <span>{image?.size}</span>
        </span>
      </div>

      {children}

      <Button
        onClick={handleDownload}
        intent="primary"
        className="m-2 absolute bottom-4 right-4"
      >
        Download
      </Button>
    </Card>
  );
};

export default ImageCard;
