"use client";
import React, { useState } from "react";
import SelectInterface from "../SelectInterface/SelectInterface";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import countries from "@/lib/countries";
import categories from "@/lib/categories";
import difficulties from "@/lib/difficulties";
import { cn } from "@/lib/utils";
import ScrollableSelect from "../ScrollableSelect/ScrollableSelect";

const FilterInterface = () => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();
  let search = searchParams.get("search") || "";
  let sortOption = searchParams.get("sortOption") || "name";
  const [difficulty, setDifficulty] = useState(
    searchParams.get("difficutly") || "",
  );
  const [category, setCategory] = useState(searchParams.get("category") || "");
  const [sortOrder, setSortOrder] = useState(
    searchParams.get("sortOrder") || "asc",
  );
  const [cuisine, setCuisine] = useState(searchParams.get("cuisine") || "");
  const [ingredientsLocation, setIngredientsLocation] = useState(
    searchParams.get("ingredientsLocation") || "",
  );
  const changeSortOption = (option) => {
    sortOption = option;
  };
  return (
    <div className="grid grid-cols-1 place-content-start md:place-items-start gap-6 md:grid-cols-2 lg:grid-cols-3 min-[1500px]:grid-cols-5">
      <div className="flex flex-row items-center justify-center gap-4">
        <span className="text-nowrap text-xl font-semibold">Sort By:</span>
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
        <ScrollableSelect
          state={cuisine}
          setState={setCuisine}
          label="Country"
          placeHolder="Select a cuisine.."
          items={countries}
        />
      </div>
      <div className="flex flex-row items-center justify-center gap-4">
        <span className="text-nowrap text-xl font-semibold">Made In: </span>
        <ScrollableSelect
          state={ingredientsLocation}
          setState={setIngredientsLocation}
          label="Country"
          placeHolder="Select ingredients location.."
          items={countries}
        />
      </div>
      <div className="flex flex-row items-center justify-center gap-4">
        <span className="text-xl font-semibold">Category: </span>
        <ScrollableSelect
          state={category}
          setState={setCategory}
          label="Category"
          placeHolder="Select a category.."
          items={categories}
        />
      </div>

      <div className="col-span-1 flex flex-row items-center justify-center gap-4 min-[900px]:col-span-2 min-[1500px]:col-span-1">
        <span className="text-xl font-semibold">Difficulty: </span>
        <ScrollableSelect
          state={difficulty}
          setState={setDifficulty}
          label="Difficulty"
          placeHolder="Select a difficulty.."
          items={difficulties}
        />
      </div>

      <div className="flex flex-row items-center justify-center place-self-center gap-4 min-[900px]:col-span-2 min-[1500px]:col-span-5">
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
              `${pathname}?search=${search}&sortOption=${sortOption}&sortOrder=${sortOrder}&cuisine=${cuisine}&ingredientsLocation=${ingredientsLocation}&category=${category}&difficulty=${difficulty}`,
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
