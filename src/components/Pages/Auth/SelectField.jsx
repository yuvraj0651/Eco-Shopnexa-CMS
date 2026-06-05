import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/UI";

import { IoChevronDown } from "react-icons/io5";

const SelectField = ({ field, value, onChange }) => {
  const handleValueChange = (selectedValue) => {
    onChange({
      target: {
        name: field.name,
        value: selectedValue,
      },
    });
  };

  return (
    <div className="relative">
      <Select value={value || ""} onValueChange={handleValueChange} className="!h-auto leading-none">
        <SelectTrigger
          id={field.name}
          aria-label={field.label}
          className="w-full rounded-sm border border-slate-200 bg-white px-4 text-sm font-medium dark:border-slate-700 dark:bg-slate-950 h-auto leading-none"
        >
          <SelectValue
            placeholder={field.placeholder || "Select an option"}
          />
        </SelectTrigger>

        <SelectContent>
          <SelectGroup>
            {field?.options?.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>

      <div className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-slate-400">
        <IoChevronDown />
      </div>
    </div>
  );
};

export default SelectField;