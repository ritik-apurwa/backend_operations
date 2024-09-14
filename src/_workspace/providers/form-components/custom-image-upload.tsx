type TempImage = {
  preview: string;
  file: File;
};

type CustomImageUploadProps = {
  handleImageUpload: (files: File[]) => void;
  isUploading: boolean;
  tempImages: TempImage[];
  existingImages: string[];
  handleTempImageDelete: (index: number) => void;
  handleExistingImageDelete: (index: number) => Promise<void>;
};

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { Trash2Icon } from "lucide-react";

const CustomImageInput = ({
  existingImages,
  handleExistingImageDelete,
  handleTempImageDelete,
  handleImageUpload,
  isUploading,
  tempImages,
}: CustomImageUploadProps) => {
  return (
    <section>
      <div>
        {isUploading ? (
          <>
            <Skeleton className="h-40 w-full" />
          </>
        ) : (
          <>
            <div className="flex flex-row space-x-4">
              {tempImages.map((img, index) => (
                <div key={index}>
                  <img
                    className="size-40 object-cover overflow-hidden"
                    height={160}
                    width={160}
                    src={img.preview}
                    alt={`Temp Image ${index}`}
                  />
                  <Button
                    variant="outline"
                    className="bg-red-400/50"
                    onClick={() => handleTempImageDelete(index)}
                  >
                    <Trash2Icon />
                  </Button>
                </div>
              ))}

              {existingImages.map((url, index) => (
                <div key={index}>
                  <img
                    src={url}
                    className="size-40 object-cover overflow-hidden"
                    height={160}
                    width={160}
                    alt={`Existing Image ${index}`}
                  />
                  <Button
                    variant="outline"
                    className="bg-red-400/50"
                    onClick={() => handleExistingImageDelete(index)}
                  >
                    <Trash2Icon />
                  </Button>
                </div>
              ))}
            </div>
            <Input
              type="file"
              multiple
              onChange={(e) =>
                handleImageUpload(Array.from(e.target.files || []))
              }
            />
          </>
        )}
      </div>
    </section>
  );
};

export default CustomImageInput;
