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
