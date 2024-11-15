import React from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";

const ScrollableSelect = ({
  state,
  setState,
  label,
  placeHolder,
  items,
  border,
  bg,
}) => {
  return (
    <Select value={state} onValueChange={setState}>
      <SelectTrigger
        className={cn(
          "w-full border-neutral-300 bg-transparent text-left focus:ring-[var(--theme2)]",
          border,
          bg,
        )}
      >
        <SelectValue placeholder={placeHolder} className="text-left" />
      </SelectTrigger>
      <SelectContent className="bg-white">
        <SelectGroup>
          <SelectLabel>{label}</SelectLabel>
          {items.map((item, index) => (
            <SelectItem
              className="hover:cursor-pointer"
              key={index}
              value={item.value}
            >
              {item.text}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};

export default ScrollableSelect;
