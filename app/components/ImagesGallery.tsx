import { useState, ChangeEvent, useEffect } from "react";
import Image from "next/image";
import { ImagePreview } from "@/declarations";

interface ImageGalleryProps {
  onImagesChange: (images: ImagePreview[]) => void;
}

const ImageGallery: React.FC<ImageGalleryProps> = ({ onImagesChange }) => {
  const [images, setImages] = useState<ImagePreview[]>([]);

  const handleAddImage = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const newImage: ImagePreview = {
          id: images.length,
          src: reader.result as string,
          file: file,
        };
        setImages((prevImages) => [...prevImages, newImage]);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveImage = (id: number) => {
    setImages(images.filter((image) => image.id !== id));
  };

  useEffect(() => {
    onImagesChange(images);
  }, [images, onImagesChange]);

  return (
    <div className="flex space-x-4  gap-5 flex-wrap">
      {images.map((image) => (
        <div key={image.id} className="relative">
          <Image
            src={image.src}
            alt={`Preview ${image.id + 1}`}
            width={150}
            height={100}
            className="object-cover  h-24 rounded-lg"
          />
          <button
            onClick={() => handleRemoveImage(image.id)}
            className="absolute -top-1 -right-1  text-white rounded-full "
          >
            <Image src="/close_icon.svg" alt="" width={20} height={20} />
          </button>
        </div>
      ))}

      {
        <label className="flex items-center justify-center w-[150px] rounded-lg h-24 bg-gray-200 cursor-pointer">
          <input type="file" className="hidden" onChange={handleAddImage} />
          <span className="text-3xl">+</span>
        </label>
      }
    </div>
  );
};

export default ImageGallery;
