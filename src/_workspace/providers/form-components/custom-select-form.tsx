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
