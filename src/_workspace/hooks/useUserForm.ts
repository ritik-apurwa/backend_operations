import { useState, useRef, useEffect, useCallback } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery } from "convex/react";
import { useUploadFiles } from "@xixixao/uploadstuff/react";
import { useToast } from "./use-toast";
import { api } from "@convex/_generated/api";
import { Id } from "@convex/_generated/dataModel";
import {
  userSchema,
  UserSchemaType,
} from "../providers/zod-schema/user-schema";
export interface UserImage {
  userImageUrl: string;
  userImageStorageId: string;
}
interface UseUserFormProps {
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  type: "create" | "update" | "delete";
  userId?: Id<"user">;
}

export const useUserForm = ({ setIsOpen, type, userId }: UseUserFormProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [existingImages, setExistingImages] = useState<UserImage[]>([]);
  const [newImageFiles, setNewImageFiles] = useState<File[]>([]);

  const { toast } = useToast();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const form = useForm<UserSchemaType>({
    resolver: zodResolver(userSchema),
    defaultValues: {
      name: "",
      areYouReady: false,
      yourMentalState: "Happy",
      description: "",
      userFamilyDetails: [
        {
          city: "",
          name: "",
          relationWithUser: "self" as const,
        },
      ],
    },
  });

  const create = useMutation(api.user.createUser);
  const update = useMutation(api.user.updateUser);
  const removeUser = useMutation(api.user.deleteUser);
  const generateUploadUrl = useMutation(api.files.generateUploadUrl);
  const getImageUrl = useMutation(api.files.getUrl);
  const removeUserImage = useMutation(api.user.deleteUserImage);

  const { startUpload } = useUploadFiles(generateUploadUrl);

  const userData = useQuery(
    api.user.getUserById,
    userId ? { id: userId } : "skip"
  );

  const loadUserData = useCallback(() => {
    if (userData) {
      console.log("Loading user data:", userData);
      form.reset(userData);
      setExistingImages(userData.userImages || []);
      console.log("Existing images set:", userData.userImages || []);
    } else {
      console.log("No user data, resetting form and images");
      form.reset({ name: "" });
      setExistingImages([]);
    }
  }, [userData, form]);

  useEffect(() => {
    console.log("useEffect triggered. Type:", type, "UserId:", userId);
    loadUserData();
  }, [loadUserData, type, userId]);

  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    setNewImageFiles((prevFiles) => [...prevFiles, ...files]);
    console.log("New image files selected:", files);
  };

  const RemoveLocallaySelectedImage = (index: number) => {
    setNewImageFiles((prev) => prev.filter((_, i) => i !== index));
    console.log("Locally selected image removed at index:", index);
  };

  const RemoveExistingImage = async (index: number) => {
    console.log("Removing existing image at index:", index);
    if (type === "update" && userId) {
      const imageToRemove = existingImages[index];
      if (imageToRemove.userImageStorageId) {
        await removeUserImage({
          userId,
          imageUrl: imageToRemove.userImageUrl,
        });
        console.log("Image removed from server:", imageToRemove);
      }
    }
    setExistingImages((prevImages) => prevImages.filter((_, i) => i !== index));
    console.log("Existing images updated");
  };

  const uploadNewImages = async (): Promise<UserImage[]> => {
    if (newImageFiles.length > 0) {
      console.log("Uploading new images:", newImageFiles);
      const uploadPromises = newImageFiles.map(async (file) => {
        const uploadedFile = new File([file], file.name, { type: file.type });
        const uploaded = await startUpload([uploadedFile]);
        const storageId = (uploaded[0].response as any).storageId;
        const imageUrl = await getImageUrl({ storageId });
        return { userImageUrl: imageUrl, userImageStorageId: storageId };
      });
      const results = await Promise.all(uploadPromises);
      console.log("Upload results:", results);
      return results.filter(
        (result): result is UserImage =>
          result.userImageUrl !== null &&
          typeof result.userImageStorageId === "string"
      );
    }
    return [];
  };

  async function onSubmitUserForm(data: UserSchemaType) {
    console.log("Form submitted. Type:", type);
    setIsLoading(true);
    setError(null);

    try {
      const uploadedImages = await uploadNewImages();
      const allImages: UserImage[] = [...existingImages, ...uploadedImages];
      console.log("All images to be saved:", allImages);

      switch (type) {
        case "create":
          await create({
            name: data.name,
            userImages: allImages,
            areYouReady: data.areYouReady,
            yourMentalState: data.yourMentalState,
            description: data.description,
            userFamilyDetails: data.userFamilyDetails,
          });
          toast({ title: "User created successfully" });
          break;
        case "update":
          if (!userId) throw new Error("User ID is required for update");
          await update({
            id: userId,
            name: data.name,
            userImages: allImages,
            areYouReady: data.areYouReady,
            yourMentalState: data.yourMentalState,
            description: data.description,
            userFamilyDetails: data.userFamilyDetails,
          });
          toast({ title: "User updated successfully" });
          break;
        case "delete":
          if (!userId) throw new Error("User ID is required for deletion");
          await removeUser({ id: userId });
          toast({ title: "User deleted successfully" });
          break;
        default:
          throw new Error("Invalid operation type");
      }

      setIsOpen(false);
      form.reset();
      setNewImageFiles([]);
    } catch (err) {
      console.error("Error in form submission:", err);
      setError(err instanceof Error ? err.message : "An error occurred");
      toast({
        title: `Error ${
          type === "create"
            ? "creating"
            : type === "update"
              ? "updating"
              : "deleting"
        } user`,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  }
  const onCancelForm = () => {
    console.log("Form cancelled");
    form.reset();
    setNewImageFiles([]);
    setIsOpen(false);
  };

  useEffect(() => {
    console.log(
      "Current state - Existing Images:",
      existingImages,
      "New Image Files:",
      newImageFiles
    );
  }, [existingImages, newImageFiles]);

  return {
    form,
    onSubmitUserForm: form.handleSubmit(onSubmitUserForm),
    isLoading,
    error,
    existingImages,
    newImageFiles,
    handleImageSelect,
    RemoveExistingImage,
    fileInputRef,
    onCancelForm,
    RemoveLocallaySelectedImage,
  };
};
