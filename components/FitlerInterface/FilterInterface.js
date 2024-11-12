"use client";
import React, { useState } from "react";
import SelectInterface from "../SelectInterface/SelectInterface";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import countries from "@/lib/countries";
import { cn } from "@/lib/utils";

const FilterInterface = () => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();
  let search = searchParams.get("search") || "";
  let sortOption = searchParams.get("sortOption") || "name";
  const [sortOrder, setSortOrder] = useState(searchParams.get("sortOrder") || "asc");
  const [cuisine, setCuisine] = useState(searchParams.get("cuisine") || "");
  const [ingredientsLocation, setIngredientsLocation] = useState(
    searchParams.get("ingredientsLocation") || "",
  );
  const changeSortOption = (option) => {
    sortOption = option;
  };
  return (
    <div className="grid grid-cols-1 place-content-center gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      <div className="flex flex-row items-center justify-center gap-4">
        <span className="text-xl font-semibold">Sort By:</span>
        <SelectInterface
          placeholder="Name"
          changeSortOption={(sortOption) => {
            changeSortOption(sortOption);
          }}
          values={[
            ["date", "Date"],
            ["name", "Name"],
          ]}
        />
      </div>
      <div className="flex flex-row items-center justify-center gap-4">
        <span className="text-xl font-semibold">Cuisine: </span>
        <Select value={cuisine} onValueChange={setCuisine}>
          <SelectTrigger className="border-neutral-300 bg-transparent focus:ring-[var(--theme2)]">
            <SelectValue placeholder="Select a country.." />
          </SelectTrigger>
          <SelectContent className="bg-white">
            <SelectGroup>
              <SelectLabel>Country</SelectLabel>
              {countries.map((country, index) => (
                <SelectItem
                  className="hover:cursor-pointer"
                  key={index}
                  value={country.value}
                >
                  {country.text}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
      <div className="flex flex-row items-center justify-center gap-4">
        <span className="text-nowrap text-xl font-semibold">Made In: </span>
        <Select
          value={ingredientsLocation}
          onValueChange={setIngredientsLocation}
        >
          <SelectTrigger className="border-neutral-300 bg-transparent focus:ring-[var(--theme2)]">
            <SelectValue placeholder="Select a country.." />
          </SelectTrigger>
          <SelectContent className="bg-white">
            <SelectGroup>
              <SelectLabel>Country</SelectLabel>
              {countries.map((country, index) => (
                <SelectItem
                  className="hover:cursor-pointer"
                  key={index}
                  value={country.value}
                >
                  {country.text}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
      <div className="col-span-1 flex flex-row items-center justify-center gap-4 lg:col-span-3 xl:col-span-1">
        <button
          type="button"
          onClick={() => {
            sortOrder == "asc" ? setSortOrder("desc") : setSortOrder("asc");
          }}
          className="flex items-center justify-center rounded-lg bg-[var(--theme1)] px-3 py-2.5 transition-all duration-200 hover:scale-105 hover:bg-[var(--theme2)]"
        >
          <i
            className={cn(
              "fa-solid fa-arrow-up self-center text-xl text-white transition-all duration-200",
              sortOrder == "asc" ? "rotate-0" : "rotate-180",
            )}
          ></i>
        </button>
        <button
          onClick={() => {
            router.push(
              `${pathname}?search=${search}&sortOption=${sortOption}&sortOrder=${sortOrder}&cuisine=${cuisine}&ingredientsLocation=${ingredientsLocation}`,
            );
          }}
          type="button"
          className="w-[200px] self-center justify-self-center rounded-lg bg-[var(--theme1)] px-3.5 py-2 text-xl font-semibold text-white transition-all duration-200 hover:scale-[1.02] hover:bg-[var(--theme2)]"
        >
          Apply
        </button>
      </div>
    </div>
  );
};

export default FilterInterface;
