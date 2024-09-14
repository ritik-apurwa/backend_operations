import React from "react";
import { Button } from "@/components/ui/button";
import { ImageIcon, X } from "lucide-react";
import { UserImage } from "@convex/schema";

interface ImageUploadProps {
  existingImages: UserImage[];
  newImageFiles: File[];
  onImageSelect: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onRemoveExistingImage: (index: number) => void;
  onRemoveSelectedImage: (index: number) => void;
  fileInputRef: React.RefObject<HTMLInputElement>;
}

const GenerateImage: React.FC<ImageUploadProps> = ({
  existingImages,
  newImageFiles,
  onImageSelect,
  onRemoveExistingImage,
  onRemoveSelectedImage,
  fileInputRef,
}) => {
  return (
    <div className="space-y-4">
      <label className="block text-sm font-medium text-gray-700">
        User Images
      </label>
      <div className="grid grid-cols-3 gap-4">
        {existingImages.map((img: UserImage, index: number) => (
          <div key={`existing-${index}`} className="relative">
            <img
              src={img.userImageUrl}
              alt={`Existing image ${index + 1}`}
              className="w-full h-32 object-cover rounded-md"
            />
            <Button
              type="button"
              variant="destructive"
              size="icon"
              className="absolute top-2 right-2"
              onClick={() => onRemoveExistingImage(index)}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        ))}
        {newImageFiles.map((file: File, index: number) => (
          <div key={`new-${index}`} className="relative">
            <img
              src={URL.createObjectURL(file)}
              alt={`New image ${index + 1}`}
              className="w-full h-32 object-cover rounded-md"
            />
            <Button
              type="button"
              variant="destructive"
              size="icon"
              className="absolute top-2 right-2"
              onClick={() => onRemoveSelectedImage(index)}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        ))}
        <div
          className="w-full h-32 border-2 border-dashed border-gray-300 rounded-md flex items-center justify-center cursor-pointer"
          onClick={() => fileInputRef.current?.click()}
        >
          <ImageIcon className="h-8 w-8 text-gray-400" />
        </div>
      </div>
      <input
        type="file"
        ref={fileInputRef}
        className="hidden"
        onChange={onImageSelect}
        multiple
        accept="image/*"
      />
    </div>
  );
};

export default GenerateImage;