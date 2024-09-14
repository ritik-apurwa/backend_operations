import { Checkbox } from "@/components/ui/checkbox";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { EyeIcon, UploadCloud } from "lucide-react";
import { useState } from "react";
import { Control, FieldValues, Path } from "react-hook-form";
// import "react-phone-number-input/style.css";
import { IconType } from "react-icons";
import { EyeClosedIcon } from "@radix-ui/react-icons";

export enum FormType {
  INPUT = "input",
  TEXTAREA = "textarea",
  CHECKBOX = "checkbox",
  SELECT = "select",
  NUMBER_INPUT = "numberInput",
  PASSWORD_INPUT = "passwordInput",
  PHONE_INPUT = "phoneInput",
  IMAGE_SELECT = "image_select",
}

interface SelectOption {
  value: string;
  label: string;
}

interface EnhancedFormProps<T extends FieldValues> {
  control: Control<T>;
  name: Path<T>;
  label: string;
  placeholder?: string;
  icon?: IconType;
  disabled?: boolean;
  formType: FormType;
  className?: string;
  options?: SelectOption[];
  rows?: number;
  error?: string;
  ref?: React.RefObject<HTMLInputElement>;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => Promise<void>;
}

const RenderInput = <T extends FieldValues>({
  field,
  props,
}: {
  field: any;
  props: EnhancedFormProps<T>;
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const Icon = props.icon;

  const togglePasswordVisibility = () => setShowPassword(!showPassword);

  const getAutoCompleteAttribute = (formType: FormType) => {
    switch (formType) {
      case FormType.PASSWORD_INPUT:
        return "current-password";
      case FormType.PHONE_INPUT:
        return "tel";
      default:
        return "on";
    }
  };

  switch (props.formType) {
    case FormType.IMAGE_SELECT:
      return (
        <FormControl>
          <div className="relative w-full h-20 flex justify-center items-center">
            <Input
              type="file"
              ref={props.ref}
              onChange={props.onChange}
              accept="image/*"
              className="absolute w-full inset-0 opacity-0 cursor-pointer"
            />
            <div className="h-full w-full flex flex-col justify-center items-center bg-gray-100 dark:bg-gray-700 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg text-center">
              <UploadCloud className="w-12 h-12 text-gray-400 dark:text-gray-200 mb-2" />
              <h2 className="text-sm font-medium text-gray-500 dark:text-gray-300">
                Upload a Photo
              </h2>
              <p className="text-xs text-gray-400 dark:text-gray-500">
                Drag & drop or click to select a file
              </p>
            </div>
          </div>
        </FormControl>
      );

    // case FormType.PHONE_INPUT:
    //   return (
    //     <FormControl>
    //       <PhoneInput
    //         id={`${props.name}-input`}
    //         defaultCountry="US"
    //         placeholder={props.placeholder}
    //         international
    //         withCountryCallingCode
    //         value={field.value}
    //         onChange={(value) => field.onChange(value || undefined)}
    //         className="w-full p-2 border rounded-md shadow-sm"
    //         autoComplete={getAutoCompleteAttribute(props.formType)}
    //       />
    //     </FormControl>
    //   );

    case FormType.NUMBER_INPUT:
      return (
        <FormControl>
          <Input
            id={`${props.name}-input`}
            type="number"
            {...field}
            onChange={(e) => field.onChange(parseFloat(e.target.value))}
            className="w-full p-2 border rounded-md shadow-sm"
            placeholder={props.placeholder}
            autoComplete={getAutoCompleteAttribute(props.formType)}
          />
        </FormControl>
      );

    case FormType.PASSWORD_INPUT:
      return (
        <FormControl>
          <div className="relative">
            <Input
              id={`${props.name}-input`}
              type={showPassword ? "text" : "password"}
              {...field}
              className="w-full p-2 pr-10 border rounded-md shadow-sm"
              placeholder={props.placeholder}
              autoComplete={getAutoCompleteAttribute(props.formType)}
            />
            <button
              type="button"
              onClick={togglePasswordVisibility}
              className="absolute inset-y-0 right-0 flex items-center pr-3"
            >
              {showPassword ? (
                <EyeIcon className="text-gray-400" />
              ) : (
                <EyeClosedIcon className="text-gray-400" />
              )}
            </button>
          </div>
        </FormControl>
      );

    case FormType.INPUT:
      return (
        <FormControl>
          <div className="relative flex items-center">
            {Icon && (
              <div className="absolute  left-3">
                <Icon className="text-gray-400" />
              </div>
            )}
            <Input
              id={`${props.name}-input`}
              placeholder={props.placeholder}
              {...field}
              disabled={props.disabled}
              className={` ${Icon ? "pl-10" : ""}`}
              autoComplete={getAutoCompleteAttribute(props.formType)}
            />
          </div>
        </FormControl>
      );

    case FormType.TEXTAREA:
      return (
        <FormControl>
          <Textarea
            id={`${props.name}-input`}
            placeholder={props.placeholder}
            {...field}
            className={`w-full p-2 border rounded-md shadow-sm ${props.className}`}
            rows={props.rows || 4}
            autoComplete={getAutoCompleteAttribute(props.formType)}
          />
        </FormControl>
      );

    case FormType.CHECKBOX:
      return (
        <FormControl>
          <div className="flex items-center space-x-2">
            <Checkbox
              id={`${props.name}-checkbox`}
              checked={field.value}
              onCheckedChange={field.onChange}
            />
            <Label
              htmlFor={`${props.name}-checkbox`}
              className="text-sm font-medium text-gray-700"
            >
              {props.label}
            </Label>
          </div>
        </FormControl>
      );

    case FormType.SELECT:
      return (
        <FormControl>
          <Select onValueChange={field.onChange} defaultValue={field.value}>
            <SelectTrigger id={`${props.name}-selectss`} className="w-full">
              <SelectValue placeholder={props.placeholder} />
            </SelectTrigger>
            <SelectContent>
              {props.options?.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </FormControl>
      );

    default:
      return null;
  }
};

const EnhancedCustomForm = <T extends FieldValues>(
  props: EnhancedFormProps<T>
) => {
  const { control, name, label, formType } = props;

  return (
    <FormField
      control={control}
      name={name}
      
      render={({ field }) => (
        <FormItem className="w-auto flex flex-col">
          {formType !== FormType.CHECKBOX && (
            <FormLabel
              htmlFor={`${name}-input`}
              className=" flex h-6 items-center pl-2 dark:text-gray-400 text-gray-400 "
            >
              {label}
            </FormLabel>
          )}
          <RenderInput field={field} props={props} />

          <FormMessage className="text-xs">
            {props.error && <span>{props.error}</span>}
          </FormMessage>
        </FormItem>
      )}
    />
  );
};

export default EnhancedCustomForm;