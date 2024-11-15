import React, { useState } from "react";
import "./RecipeCard.css";
import { cn } from "@/lib/utils";
import { Skeleton } from "@/components/ui/skeleton";

const SkeletonRecipeCard = () => {
  return (
    <div className="flex flex-col gap-2 rounded-xl bg-white shadow-md transition-all duration-200 hover:scale-[1.03] hover:cursor-pointer">
      <div className="relative overflow-hidden rounded-t-xl">
        <Skeleton className="h-[200px] w-full rounded-t-xl" />
      </div>
      <div className="flex flex-col gap-2 px-6 pb-4 pt-2">
        <div className="break-all text-[22px] font-bold">
          <Skeleton className="h-6 w-full" />
        </div>
        <div>
          <Skeleton className="h-6 w-[200px]" />
        </div>
        <div>
          <Skeleton className="h-6 w-[200px]" />
        </div>
      </div>
    </div>
  );
};

export default SkeletonRecipeCard;
