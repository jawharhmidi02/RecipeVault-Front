import React from "react";
import { Skeleton } from "../ui/skeleton";

const SkeletonSpecialistCard = () => {
  return (
    <div className="flex flex-col gap-3 rounded-lg bg-white px-8 py-6 shadow-md">
      <div className="group flex flex-col gap-1">
        <div className="text-sm font-light tracking-wider text-neutral-700">
          FULLNAME
        </div>
        <div className="rounded-lg p-2 text-lg transition-all duration-200 md:group-hover:bg-zinc-100">
          <Skeleton className={"h-5 w-[120px] bg-neutral-300"} />
        </div>
      </div>
      <div className="group flex flex-col gap-1">
        <div className="text-sm font-light tracking-wider text-neutral-700">
          EMAIL
        </div>
        <div className="rounded-lg p-2 text-lg transition-all duration-200 md:group-hover:bg-zinc-100">
          <Skeleton className={"h-5 w-[200px] bg-neutral-300"} />
        </div>
      </div>
      <div className="group flex flex-col gap-1">
        <div className="text-sm font-light tracking-wider text-neutral-700">
          TELEPHONE
        </div>
        <div className="rounded-lg p-2 text-lg transition-all duration-200 md:group-hover:bg-zinc-100">
          <Skeleton className={"h-5 w-[120px] bg-neutral-300"} />
        </div>
      </div>
      <div className="grid grid-cols-1 gap-4 min-[400px]:grid-cols-2">
        <div className="group flex flex-col gap-1">
          <div className="text-sm font-light tracking-wider text-green-500">
            RECIPES ACCEPTED
          </div>
          <div className="rounded-lg p-2 text-lg transition-all duration-200 md:group-hover:bg-green-100">
            <Skeleton className={"h-8 w-8 bg-neutral-300"} />
          </div>
        </div>
        <div className="group flex flex-col gap-1">
          <div className="text-sm font-light tracking-wider text-rose-600">
            RECIPES REJECTED
          </div>
          <div className="rounded-lg p-2 text-lg transition-all duration-200 md:group-hover:bg-rose-100">
            <Skeleton className={"h-8 w-8 bg-neutral-300"} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SkeletonSpecialistCard;
