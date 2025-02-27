import Image from "next/image";
import React, { useEffect, useState } from "react";
import { Carousel } from "react-responsive-carousel"; // You can use any carousel library

const ImageGallery: React.FC = () => {
  const [images, setImages] = useState<any[]>([]);

  useEffect(() => {
    // Fetch image metadata from the JSON file
    const fetchImages = async () => {
      const res = await fetch("/api/route"); // Adjust to get metadata from your server
      const data = await res.json();
      if (data.metadata) {
        setImages(data.metadata);
      }
    };

    fetchImages();
  }, []);

  return (
    <div className="carousel-container">
      <Carousel>
        {images.map((image, index) => (
          <div key={index}>
            <h3>{image.filename}</h3>
            <Image
              src={`data:image/jpeg;base64,${image.originalImage}`}
              alt={`Image ${index + 1}`}
            />
          </div>
        ))}
      </Carousel>
    </div>
  );
};

export default ImageGallery;
