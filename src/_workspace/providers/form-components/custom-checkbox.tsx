
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