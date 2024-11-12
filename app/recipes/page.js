"use client";
import FilterInterface from "@/components/FitlerInterface/FilterInterface";
import { useSearchParams } from "next/navigation";
import React, { Suspense } from "react";

const page = () => {
  const searchParams = useSearchParams();
  const searchQuery = searchParams.get("search") || "";
  return (
    <div className="mx-auto flex w-full items-center justify-center">
      <div className="xsm:mx-8 mx-5 flex flex-row gap-10 sm:mx-10">
        <Suspense>
          <FilterInterface/>
        </Suspense>

        <div className="flex flex-col gap-4 items-center justify-center">
          <div className="text-2xl font-semibold text-[var(--theme1)]">
            { searchQuery ? (<>{`${searchQuery} Meals`}</>) : (<>You did not search for anything yet</>)}
          </div>
          <div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
