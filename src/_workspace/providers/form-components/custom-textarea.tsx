import {
  FormControl,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Control,
  FieldPath,
  FieldValues,
  useController,
} from "react-hook-form";
import { IconType } from "react-icons";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/_workspace/lib/utils";
// Assuming you have a utility function for class names

interface CustomTextAreaProps<T extends FieldValues> {
  control: Control<T>;
  name: FieldPath<T>;
  label: string;
  placeholder?: string;
  icon?: IconType;
  disabled?: boolean;
  className?: string;
  rows?: number;
  error?: string;
}

function CustomTextArea<T extends FieldValues>({
  control,
  label,
  name,
  placeholder,
  icon: Icon,
  disabled,
  className,
  error,
  rows = 3,
}: CustomTextAreaProps<T>) {


  const {field,fieldState: { error: fieldError }} = useController({ name, control });

  return (
    <FormItem className={cn("space-y-1", className)}>
      <FormLabel
        htmlFor={`${name}-input`}
        className="flex items-center text-sm font-medium text-gray-700 dark:text-gray-300"
      >
        {Icon && <Icon className="mr-2 h-4 w-4" />}
        {label}
      </FormLabel>
      <FormControl>
        <Textarea
          id={`${name}-input`}
          placeholder={placeholder}
          disabled={disabled}
          rows={rows}
          className={cn(
            "resize-none focus:ring-2 focus:ring-offset-2",
            disabled && "opacity-50 cursor-not-allowed",
            fieldError && "border-red-500 focus:ring-red-500"
          )}
          {...field}
        />
      </FormControl>
      <FormMessage className="text-xs text-red-500">
        {error || fieldError?.message}
      </FormMessage>
    </FormItem>
  );
}

export default CustomTextArea;
