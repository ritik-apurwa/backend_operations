import { api } from "@convex/_generated/api";
import { Id } from "@convex/_generated/dataModel";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery } from "convex/react";
import { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { useUploadFiles } from "@xixixao/uploadstuff/react";
import { useToast } from "./use-toast";

const MAX_IMAGES = 10;

const formZodSchema = z.object({
  title: z.string().min(1, "Title is required"),
});

type FormType = z.infer<typeof formZodSchema>;

type TempImage = {
  preview: string;
  file: File;
};

type UseFormControlHookProps = {
  initialData?: Id<"blog">;
  type: "create" | "update" | "delete";
};

export const useFormControlHook = ({
  type,
  initialData,
}: UseFormControlHookProps) => {
  const [pending, setPending] = useState(false);
  const [tempImages, setTempImages] = useState<TempImage[]>([]);
  const [existingImages, setExistingImages] = useState<string[]>([]);
  const { toast } = useToast();
  const [isOpen, setIsOpen] = useState(true);
  const generateUploadUrl = useMutation(api.files.generateUploadUrl);
  const getImageUrl = useMutation(api.files.getUrl);
  const { isUploading, startUpload } = useUploadFiles(generateUploadUrl);

  const create = useMutation(api.blog.create);
  const update = useMutation(api.blog.update);
  const deleteBlog = useMutation(api.blog.deleteblog);
  const deleteConvexImage = useMutation(api.blog.deleteImage);

  const form = useForm<FormType>({
    resolver: zodResolver(formZodSchema),
    defaultValues: {
      title: "",
    },
  });

  const getBlog = useQuery(
    api.blog.GetBlogID,
    initialData ? { id: initialData } : "skip"
  );

  useEffect(() => {
    if (getBlog && type !== "create") {
      form.reset({ title: getBlog.title });
      setExistingImages(getBlog.imageUrls || []);
    }
  }, [getBlog, form, type]);

  const handleImageUpload = useCallback(
    (files: File[]) => {
      const totalImages = tempImages.length + existingImages.length;
      const remainingSlots = MAX_IMAGES - totalImages;
      const filesToAdd = files.slice(0, remainingSlots);

      const newTempImages = filesToAdd.map((file) => ({
        preview: URL.createObjectURL(file),
        file,
      }));

      setTempImages((prev) => [...prev, ...newTempImages]);

      if (files.length > remainingSlots) {
        toast({
          title: `Only ${remainingSlots} image(s) added. Maximum of ${MAX_IMAGES} images allowed.`,
          variant: "destructive",
        });
      } else {
        toast({ title: "Images added successfully" });
      }
    },
    [tempImages, existingImages, toast]
  );

  const uploadToConvex = useCallback(async (): Promise<
    { storageIds: Id<"_storage">[]; imageUrls: string[] } | undefined
  > => {
    if (!tempImages.length) return;

    try {
      const uploaded = await startUpload(tempImages.map((img) => img.file));
      const newStorageIds = uploaded.map(
        (item: any) => item.response.storageId as Id<"_storage">
      );

      const imageUrls = await Promise.all(
        newStorageIds.map((id) => getImageUrl({ storageId: id }))
      );
      const validImageUrls = imageUrls.filter(
        (url): url is string => url !== null
      );

      return { storageIds: newStorageIds, imageUrls: validImageUrls };
    } catch (error) {
      console.error(error);
      toast({
        title: "Error uploading images",
        variant: "destructive",
      });
    }
  }, [tempImages, startUpload, getImageUrl, toast]);

  const handleFormSubmit = async (values: FormType): Promise<boolean> => {
    setPending(true);
    try {
      const uploadedImages = await uploadToConvex();
      const allImages = [
        ...existingImages,
        ...(uploadedImages?.imageUrls || []),
      ];

      if (type === "create") {
        await create({
          ...values,
          imageStorageIds: uploadedImages?.storageIds || [],
          imageUrls: allImages,
        });
        toast({ title: "Blog created successfully" });
        return true;
      } else if (type === "update" && initialData) {
        await update({
          id: initialData,
          ...values,
          imageStorageIds: uploadedImages?.storageIds || [],
          imageUrls: allImages,
        });
        toast({ title: "Blog updated successfully" });
        return true;
      } else if (type === "delete" && initialData) {
        await deleteBlog({ id: initialData });
        toast({ title: "Blog deleted successfully" });
        return true;
      }

      // Reset form and images after successful submission
      form.reset();
      setTempImages([]);
      setExistingImages([]);
      return true;
    } catch (error) {
      console.error(error);
      toast({
        title: "Error submitting form",
        variant: "destructive",
      });
      return false;
    } finally {
      setPending(false);
    }
  };

  const handleSubmit = async () => {
    const success = await handleFormSubmit(form.getValues());
    if (success) {
      setIsOpen(false);
    }
  };

  const handleTempImageDelete = useCallback(
    (index: number) => {
      setTempImages((prev) => prev.filter((_, i) => i !== index));
      toast({ title: "Temporary image removed" });
    },
    [toast]
  );

  const handleExistingImageDelete = useCallback(
    async (index: number) => {
      if (!initialData) return;

      const imageUrl = existingImages[index];
      try {
        await deleteConvexImage({ blogId: initialData, imageUrl });
        setExistingImages((prev) => prev.filter((_, i) => i !== index));
        toast({ title: "Existing image removed" });
      } catch (error) {
        console.error(error);
        toast({
          title: "Error removing existing image",
          variant: "destructive",
        });
      }
    },
    [initialData, existingImages, deleteConvexImage, toast]
  );

  return {
    form,
    handleSubmit,
    handleFormSubmit: form.handleSubmit(handleFormSubmit),
    handleImageUpload,
    handleTempImageDelete,
    handleExistingImageDelete,
    tempImages,
    existingImages,
    isUploading,
    pending,
    type,
  };
};
