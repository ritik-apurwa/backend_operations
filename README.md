# React Convex , ConvexAuth, Shadcn , Tailwidn

## first of all create react typescript project with vite use these commands

```
npm create vite@latest my-project --template react-ts
```

#### install tailwind and postcss and autoprefixer

```
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
npm install @tailwindcss/typography

```

#### configure tailwind.config.js to ts and add the following content

```
/** @type {import('tailwindcss').Config} */
export default {
 content: [
   "./index.html",
   "./src/**/*.{js,ts,jsx,tsx}",
 ],
 theme: {
   extend: {},
 },
 plugins: [],
}
```

#### in your main css file add this @tailwind directives

```
@tailwind base;
@tailwind components;
@tailwind utilities;
```

#### add this into your tsconfig.json

```
{
  "files": [],
  "references": [
    {
      "path": "./tsconfig.app.json"
    },
    {
      "path": "./tsconfig.node.json"
    }
  ],
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"],
      "@convex/*": ["./convex/*"],
      // "@features/*": ["src/_features/*"],
      // "@providers/*": ["src/_workspace/lib/_providers/*"],
      // "@hooks/*": ["src/hooks/*"],
      // "@workspace/*": ["src/workspace/*"]
    }
  }
}
```

#### add this into your tsconfig.app.json

```
{
  "extends": "./tsconfig.json",
  "compilerOptions": {
    "composite": true,
    "tsBuildInfoFile": "./node_modules/.tmp/tsconfig.app.tsbuildinfo",
    "target": "ES2020",
    "useDefineForClassFields": true,
    "lib": ["ES2020", "DOM", "DOM.Iterable"],
    "module": "ESNext",
    "skipLibCheck": true,
    "moduleResolution": "bundler",
    "allowImportingTsExtensions": true,
    "resolveJsonModule": true,
    "isolatedModules": true,
    "moduleDetection": "force",
    "noEmit": true,
    "jsx": "react-jsx",
    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noFallthroughCasesInSwitch": true
  },
  "include": ["src", "convex"]
  // add these later "convex", "features", "providers", "hooks", "workspace", "src/_hooks/use-toast.ts", "all-files/navbar", "all-files/blog-page.tsx", "all-files/newBlogsPage.tsx"
}
```

#### for resolve path error install this (so you can import "path" without error)

```
npm i -D @types/node
```

#### add this into your vite.config.ts

```
import path from "path"
import react from "@vitejs/plugin-react-swc"
import { defineConfig } from "vite"


export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      "@convex": path.resolve(__dirname, "./convex"),
      // "@providers":path.resolve(__dirname, "./src/_providers"),
      // "@features":path.resolve(__dirname, "./src/_features"),
      // "@hooks":path.resolve(__dirname, "./src/_features"),
      // "workspace":path.resolve(__dirname, "./src/_workspace")
    },
  },
})
```

#### now install shadcn and install shadcn

```
npx shadcn@latest init
```

#### add this components from shadcn into your src/components/ui/

```
npx shadcn@latest add dropdown-menu
npx shadcn@latest add alert
npx shadcn@latest add alert-dialog
npx shadcn@latest add avatar
npx shadcn@latest add badge
npx shadcn@latest add button
npx shadcn@latest add card
npx shadcn@latest add carousel
npx shadcn@latest add checkbox
npx shadcn@latest add command
npx shadcn@latest add dialog
npx shadcn@latest add dropdown-menu
npx shadcn@latest add form
npx shadcn@latest add input
npx shadcn@latest add progress
npx shadcn@latest add select
npx shadcn@latest add skeleton
npx shadcn@latest add tabs
npx shadcn@latest add textarea
npx shadcn@latest add toast
```

#### add this dark theme provider in your

```
import { createContext, useContext, useEffect, useState } from "react"

type Theme = "dark" | "light" | "system"

type ThemeProviderProps = {
  children: React.ReactNode
  defaultTheme?: Theme
  storageKey?: string
}

type ThemeProviderState = {
  theme: Theme
  setTheme: (theme: Theme) => void
}

const initialState: ThemeProviderState = {
  theme: "system",
  setTheme: () => null,
}

const ThemeProviderContext = createContext<ThemeProviderState>(initialState)

export function ThemeProvider({
  children,
  defaultTheme = "system",
  storageKey = "vite-ui-theme",
  ...props
}: ThemeProviderProps) {
  const [theme, setTheme] = useState<Theme>(
    () => (localStorage.getItem(storageKey) as Theme) || defaultTheme
  )

  useEffect(() => {
    const root = window.document.documentElement

    root.classList.remove("light", "dark")

    if (theme === "system") {
      const systemTheme = window.matchMedia("(prefers-color-scheme: dark)")
        .matches
        ? "dark"
        : "light"

      root.classList.add(systemTheme)
      return
    }

    root.classList.add(theme)
  }, [theme])

  const value = {
    theme,
    setTheme: (theme: Theme) => {
      localStorage.setItem(storageKey, theme)
      setTheme(theme)
    },
  }

  return (
    <ThemeProviderContext.Provider {...props} value={value}>
      {children}
    </ThemeProviderContext.Provider>
  )
}

export const useTheme = () => {
  const context = useContext(ThemeProviderContext)

  if (context === undefined)
    throw new Error("useTheme must be used within a ThemeProvider")

  return context
}
```

#### add these also

```
npm install  react-router-dom
npm install react-icons
npm install framer-motion
```

#### wrap your app with this theme provider

```
 <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
     {childre}
    </ThemeProvider>
```

#### you can also add convex

```
npm i convex
```

#### run this command to start the project

```
npx convex dev
```

#### you can add this custom input

```
import React from "react";
import {
  FormControl,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Control,
  FieldValues,
  FieldPath,
  useController,
} from "react-hook-form";
import { IconType } from "react-icons";

interface CustomFormInputProps<T extends FieldValues> {
  control: Control<T>;
  name: FieldPath<T>;
  label: string;
  placeholder?: string;
  icon?: IconType;
  disabled?: boolean;
  className?: string;
  rows?: number;
  error?: string;
  ref?: React.RefObject<HTMLInputElement>;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => Promise<void>;
}

function CustomFormInput<T extends FieldValues>({
  control,
  name,
  label,
  placeholder,
  icon: Icon,
  disabled,
  className,
  error,
  onChange,
}: CustomFormInputProps<T>) {
  const {
    field,
    fieldState: { error: fieldError },
  } = useController({
    name,
    control,
  });

  return (
    <FormItem className="w-auto flex flex-col">
      <FormLabel
        htmlFor={`${name}-input`}
        className="flex h-6 items-center pl-2 dark:text-gray-400 text-gray-400"
      >
        {label}
      </FormLabel>

      <FormControl>
        <div className="relative flex items-center">
          {Icon && (
            <div className="absolute left-3">
              <Icon className="text-gray-400" />
            </div>
          )}
          <Input
            id={`${name}-input`}
            placeholder={placeholder}
            {...field}
            disabled={disabled}
            className={`${Icon ? "pl-10" : ""} ${className || ""}`}
            onChange={(e) => {
              field.onChange(e);
              onChange && onChange(e);
            }}
          />
        </div>
      </FormControl>

      <FormMessage className="text-xs">
        {(error || fieldError?.message) && (
          <span>{error || fieldError?.message}</span>
        )}
      </FormMessage>
    </FormItem>
  );
}

export default CustomFormInput;
```

#### this is for select input

```
import {
  FormControl,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Control,
  FieldPath,
  FieldValues,
  useController,
} from "react-hook-form";
import { IconType } from "react-icons";
import { cn } from "@/_workspace/lib/utils";
// Assuming you have a utility function for class names

interface SelectOption {
  value: string;
  label: string;
}

interface CustomSelectFormProps<T extends FieldValues> {
  control: Control<T>;
  name: FieldPath<T>;
  label: string;
  options: SelectOption[];
  placeholder?: string;
  icon?: IconType;
  disabled?: boolean;
  className?: string;
  error?: string;
}

function CustomSelectForm<T extends FieldValues>({
  control,
  label,
  name,
  options,
  placeholder = "Select an option",
  icon: Icon,
  disabled = false,
  className,
  error,
}: CustomSelectFormProps<T>) {
  const {
    field,
    fieldState: { error: fieldError },
  } = useController({ name, control });

  return (
    <FormItem className={cn("space-y-1", className)}>
      <FormLabel
        htmlFor={`${name}-select`}
        className="flex items-center text-sm font-medium text-gray-700 dark:text-gray-300"
      >
        {Icon && <Icon className="mr-2 h-4 w-4" />}
        {label}
      </FormLabel>
      <FormControl>
        <Select
          onValueChange={field.onChange}
          defaultValue={field.value}
          disabled={disabled}
        >
          <SelectTrigger
            id={`${name}-select`}
            className={cn(
              "w-full",
              disabled && "opacity-50 cursor-not-allowed",
              fieldError && "border-red-500 focus:ring-red-500"
            )}
          >
            <SelectValue placeholder={placeholder} />
          </SelectTrigger>
          <SelectContent>
            {options.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </FormControl>
      <FormMessage className="text-xs text-red-500">
        {error || fieldError?.message}
      </FormMessage>
    </FormItem>
  );
}

export default CustomSelectForm;

```

#### this is for checkbox input

```
import { Control, FieldPath, FieldValues, useController } from "react-hook-form";
import { IconType } from "react-icons";
import { LucideIcon } from "lucide-react";
import {
  FormControl,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { cn } from "@/_workspace/lib/utils";


interface CustomCheckBoxProps<T extends FieldValues> {
  control: Control<T>;
  name: FieldPath<T>;
  label: string;
  description?: string;
  icon?: IconType | LucideIcon;
  disabled?: boolean;
  className?: string;
  error?: string;
}

function CustomCheckBox<T extends FieldValues>({
  control,
  name,
  label,
  description,
  icon: Icon,
  disabled = false,
  className,
  error,
}: CustomCheckBoxProps<T>) {
  const {
    field,
    fieldState: { error: fieldError },
  } = useController({ name, control });

  return (
    <FormItem className={cn("space-y-2", className)}>
      <FormControl>
        <div className="flex items-start">
          <Checkbox
            id={`${name}-checkbox`}
            checked={field.value}
            onCheckedChange={field.onChange}
            disabled={disabled}
            className={cn(
              "mt-1",
              disabled && "opacity-50 cursor-not-allowed",
              fieldError && "border-red-500 focus:ring-red-500"
            )}
          />
          <div className="ml-3 space-y-1">
            <Label
              htmlFor={`${name}-checkbox`}
              className={cn(
                "text-sm font-medium text-gray-900 dark:text-gray-100",
                disabled && "opacity-50"
              )}
            >
              <span className="flex items-center">
                {Icon && <Icon className="mr-2 h-4 w-4" />}
                {label}
              </span>
            </Label>
            {description && (
              <p className="text-xs text-gray-500 dark:text-gray-400">
                {description}
              </p>
            )}
          </div>
        </div>
      </FormControl>
      <FormMessage className="text-xs text-red-500 ml-7">
        {error || fieldError?.message}
      </FormMessage>
    </FormItem>
  );
}

export default CustomCheckBox;
```

#### this is for image upload ui

```
import { Control, FieldPath, FieldValues, useController } from "react-hook-form";
import { IconType } from "react-icons";
import { LucideIcon } from "lucide-react";
import {
  FormControl,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { cn } from "@/_workspace/lib/utils";


interface CustomCheckBoxProps<T extends FieldValues> {
  control: Control<T>;
  name: FieldPath<T>;
  label: string;
  description?: string;
  icon?: IconType | LucideIcon;
  disabled?: boolean;
  className?: string;
  error?: string;
}

function CustomCheckBox<T extends FieldValues>({
  control,
  name,
  label,
  description,
  icon: Icon,
  disabled = false,
  className,
  error,
}: CustomCheckBoxProps<T>) {
  const {
    field,
    fieldState: { error: fieldError },
  } = useController({ name, control });

  return (
    <FormItem className={cn("space-y-2", className)}>
      <FormControl>
        <div className="flex items-start">
          <Checkbox
            id={`${name}-checkbox`}
            checked={field.value}
            onCheckedChange={field.onChange}
            disabled={disabled}
            className={cn(
              "mt-1",
              disabled && "opacity-50 cursor-not-allowed",
              fieldError && "border-red-500 focus:ring-red-500"
            )}
          />
          <div className="ml-3 space-y-1">
            <Label
              htmlFor={`${name}-checkbox`}
              className={cn(
                "text-sm font-medium text-gray-900 dark:text-gray-100",
                disabled && "opacity-50"
              )}
            >
              <span className="flex items-center">
                {Icon && <Icon className="mr-2 h-4 w-4" />}
                {label}
              </span>
            </Label>
            {description && (
              <p className="text-xs text-gray-500 dark:text-gray-400">
                {description}
              </p>
            )}
          </div>
        </div>
      </FormControl>
      <FormMessage className="text-xs text-red-500 ml-7">
        {error || fieldError?.message}
      </FormMessage>
    </FormItem>
  );
}

export default CustomCheckBox;
```

#### this is for its function and how to set it with a form

```
npm i @xixixao/uploadstuff
```

```typescirpt
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
```

####  add this vercel.json for particular router pages 
```
{
  "rewrites": [{ "source": "/(.*)", "destination": "/index.html" }]
}
```


