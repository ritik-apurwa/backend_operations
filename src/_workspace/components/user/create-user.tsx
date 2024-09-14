import React from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Form } from "@/components/ui/form";
import { Bell, Loader } from "lucide-react";
import { useUserForm } from "@/_workspace/hooks/useUserForm";
import CustomFormInput from "@/_workspace/providers/form-components/custom-form-input";
import { Id } from "@convex/_generated/dataModel";
import GenerateImage from "../../providers/upload/generate-image";
import CustomCheckBox from "@/_workspace/providers/form-components/custom-checkbox";
import CustomSelectForm from "@/_workspace/providers/form-components/custom-select-form";
import {
  MentalStateOption,
  RelationWithUserOption,
} from "@/_workspace/providers/zod-schema/user-schema";
import CustomTextArea from "@/_workspace/providers/form-components/custom-textarea";
import { useFieldArray } from "react-hook-form";

interface UserFormProps {
  type: "create" | "update" | "delete";
  userId?: Id<"user">;
}

const UserForm: React.FC<UserFormProps> = ({ type, userId }) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const {
    form,
    onSubmitUserForm,
    isLoading,
    fileInputRef,
    handleImageSelect,
    RemoveExistingImage,
    error,
    RemoveLocallaySelectedImage,
    onCancelForm,
    existingImages,
    newImageFiles,
  } = useUserForm({
    setIsOpen,
    type,
    userId,
  });

  const title =
    type === "create"
      ? "Create User"
      : type === "update"
        ? "Update User"
        : "Delete User";

  const handleOpenChange = (open: boolean) => {
    if (!open) {
      onCancelForm();
    }
    setIsOpen(open);
  };

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "userFamilyDetails",
  });

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <Button
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
          variant="outline"
        >
          {title}
        </Button>
      </DialogTrigger>
      <DialogContent className="container max-h-[calc(98vh-40px)] overflow-y-auto max-w-3xl">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>
            {type === "delete"
              ? "Are you sure you want to delete this user?"
              : "Fill in the user details below."}
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              onSubmitUserForm();
            }}
            className="space-y-4"
          >
            {type !== "delete" && (
              <>
                <GenerateImage
                  fileInputRef={fileInputRef}
                  onImageSelect={handleImageSelect}
                  newImageFiles={newImageFiles}
                  existingImages={existingImages}
                  onRemoveExistingImage={RemoveExistingImage}
                  onRemoveSelectedImage={RemoveLocallaySelectedImage}
                />

                <CustomFormInput
                  control={form.control}
                  name="name"
                  label="Name"
                  placeholder="Enter user name"
                  error={error!}
                />

                <CustomSelectForm
                  control={form.control}
                  options={MentalStateOption}
                  label="Your Mental State"
                  name="yourMentalState"
                  placeholder="click and choose  "
                />

                <CustomTextArea
                  control={form.control}
                  label="Description"
                  name="description"
                  placeholder="Tell us More About You Mental State"
                  rows={5}
                />
                {fields.map((field, index) => (
                  <div key={field.id}>
                    <CustomFormInput
                      control={form.control}
                      name={`userFamilyDetails.${index}.name`}
                      label="Name"
                      placeholder="Enter Your Name here"
                    />
                    <CustomFormInput
                      control={form.control}
                      name={`userFamilyDetails.${index}.city`}
                      label="City"
                      placeholder="Enter Your City here"
                    />

                    <CustomSelectForm
                      control={form.control}
                      label="Enter Your relation"
                      name={`userFamilyDetails.${index}.relationWithUser`}
                      options={RelationWithUserOption}
                    />
                    <div className="grid grid-cols-2 gap-4 mt-4 justify-center items-center">
                      {fields.length > 1 && (
                        <Button
                          type="button"
                          variant="destructive"
                          className="bg-red-400/60 text-black font-medium"
                          onClick={() => remove(index)}
                        >
                          Remove File
                        </Button>
                      )}
                      {fields.length <= 2 && (
                        <Button
                          type="button"
                          className="bg-green-500/60 text-black font-medium"
                          onClick={() =>
                            append({
                              city: "",
                              name: "",
                              relationWithUser: "brother",
                            })
                          }
                        >
                          Add More
                        </Button>
                      )}
                    </div>
                  </div>
                ))}

                <CustomCheckBox
                  control={form.control}
                  name="areYouReady"
                  label="Are You Ready"
                  icon={Bell}
                />
              </>
            )}
            <DialogFooter className="grid md:grid-cols-2 gap-4 px-4">
              <Button type="button" variant="outline" onClick={onCancelForm}>
                Cancel
              </Button>
              <Button type="submit" disabled={isLoading}>
                {isLoading ? (
                  <>
                    <Loader className="mr-2 h-4 w-4 animate-spin" />
                    {type === "create"
                      ? "Creating"
                      : type === "update"
                        ? "Updating"
                        : "Deleting"}
                  </>
                ) : type === "create" ? (
                  "Create"
                ) : type === "update" ? (
                  "Update"
                ) : (
                  "Delete"
                )}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default UserForm;
