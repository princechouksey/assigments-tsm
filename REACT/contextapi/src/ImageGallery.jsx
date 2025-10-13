import React from "react";

const images = [
  "https://picsum.photos/id/1011/400/300",
  "https://picsum.photos/id/1012/400/300",
  "https://picsum.photos/id/1013/400/300",
  "https://picsum.photos/id/1015/400/300",
  "https://picsum.photos/id/1016/400/300",
  "https://picsum.photos/id/1018/400/300",
];

const ImageGallery = () => {
  return (
    <div className="p-5">
      <h1 className="text-2xl font-bold mb-4">Lazy Loaded Image Gallery</h1>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {images.map((src, index) => (
          <img
            key={index}
            src={src}
            alt={`image ${index + 1}`}
            loading="lazy"
            className="w-full h-auto rounded-lg shadow-md hover:scale-105 transition-transform"
          />
        ))}
      </div>
    </div>
  );
};

export default ImageGallery;
