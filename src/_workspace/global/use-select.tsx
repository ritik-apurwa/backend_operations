import * as React from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export type MentalStateType =
  | "Depressed"
  | "Anxious"
  | "Stressed"
  | "Happy"
  | "all";

interface UseSelectProps {
  setFilter: React.Dispatch<React.SetStateAction<MentalStateType>>;
}

export const MentalStateOption = [
  { value: "Depressed", label: "Depressed" },
  { value: "Anxious", label: "Anxious" },
  { value: "Stressed", label: "Stressed" },
  { value: "Happy", label: "Happy" },
  { value: "all", label: "All" },
];

const UseSelect = ({ setFilter }: UseSelectProps) => {
  const [value, setValue] = React.useState<MentalStateType>("all");

  const handleValueChange = (newValue: MentalStateType) => {
    setValue(newValue);
    setFilter(newValue);
  };

  return (
    <Select value={value} onValueChange={handleValueChange}>
      <SelectTrigger className="flex-shrink-0 max-w-fit min-w-32 px-4">
        <SelectValue placeholder="Select mental state" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Mental State</SelectLabel>
          {MentalStateOption.map((item) => (
            <SelectItem key={item.value} value={item.value}>
              {item.label}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};

export default UseSelect;
