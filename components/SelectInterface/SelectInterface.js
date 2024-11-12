"use client";

import React, { useRef, useEffect, useState } from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useSearchParams } from "next/navigation";

const SelectInterface = ({ placeHolder, changeSortOption, values }) => {
  const useParams = useSearchParams();
  let optionParam = useParams.get("sortOption") || "name";

  const [value, setValue] = useState(optionParam)
  useEffect(() => {
    changeSortOption(value);
  }, [value]);
  useEffect(() => {
    setValue(optionParam)
  }, [optionParam])
  
  return (
    <div>
      <Select value={value} onValueChange={setValue}>
        <SelectTrigger className="w-[180px] bg-transparent focus:ring-[var(--theme)]">
          <SelectValue placeholder={placeHolder} />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            {values.map((value, index) => (
              <SelectItem key={index} value={value[0]}>
                {value[1]}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
};

export default SelectInterface;
