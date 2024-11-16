import React from "react";
import { Skeleton } from "../ui/skeleton";
import { cn } from "@/lib/utils";

const SkeletonRequestCard = () => {
  return (
    <div className="flex flex-col gap-4 rounded-lg bg-white px-5 py-5 shadow-md min-[500px]:px-8 min-[500px]:py-8">
      <div className="flex flex-col gap-2">
        <div className="text-sm font-light tracking-wider text-neutral-700">
          FULL NAME
        </div>
        <div className="w-fit rounded-lg bg-zinc-100 p-2">
          <Skeleton className={"h-5 w-[100px] bg-neutral-300"} />
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <div className="text-sm font-light tracking-wider text-neutral-700">
          EMAIL
        </div>
        <div className="w-fit rounded-lg bg-zinc-100 p-2">
          <Skeleton className={"h-5 w-[200px] bg-neutral-300"} />
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <div className="text-sm font-light tracking-wider text-neutral-700">
          TELEPHONE
        </div>
        <div className="w-fit rounded-lg bg-zinc-100 p-2">
          <Skeleton className={"h-5 w-[100px] bg-neutral-300"} />
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <div className="text-sm font-light tracking-wider text-neutral-700">
          APPLICATION REASON
        </div>
        <div className="w-fit rounded-lg bg-zinc-100 p-2">
          <Skeleton className={"mb-2 h-5 w-[220px] bg-neutral-300"} />
          <Skeleton className={"mb-2 h-5 w-[220px] bg-neutral-300"} />
          <Skeleton className={"mb-2 h-5 w-[80px] bg-neutral-300"} />
        </div>
      </div>
      <div className="flex w-full">
        <a className="w-full rounded-lg border-2 border-transparent bg-slate-400 py-3 text-center font-semibold text-[#ffffff] transition-all duration-200 hover:cursor-not-allowed hover:border-slate-400 hover:bg-slate-100 hover:text-[#9094ac]">
          <div className="flex items-center justify-center">
            <div className="h-5 w-5 animate-spin rounded-full border-b-2 border-white"></div>
          </div>
        </a>
      </div>
      <div className="flex w-full flex-col gap-2 min-[450px]:flex-row">
        <button
          type="button"
          disabled={true}
          className={cn(
            "w-full rounded-lg border-2 border-transparent bg-rose-600 px-4 py-2 text-xl font-semibold text-[#ffffff] transition-all duration-200 hover:cursor-not-allowed hover:border-rose-600 hover:bg-rose-100 hover:text-rose-600",
          )}
        >
          <div className="flex items-center justify-center">
            <div className="h-5 w-5 animate-spin rounded-full border-b-2 border-white"></div>
          </div>
        </button>
        <button
          type="button"
          disabled={true}
          className={cn(
            "w-full rounded-lg border-2 border-transparent bg-emerald-500 px-4 py-2 text-xl font-semibold text-[#ffffff] transition-all duration-200 hover:cursor-not-allowed hover:border-emerald-500 hover:bg-emerald-100 hover:text-emerald-500",
          )}
        >
          <div className="flex items-center justify-center">
            <div className="h-5 w-5 animate-spin rounded-full border-b-2 border-white"></div>
          </div>
        </button>
      </div>
    </div>
  );
};

export default SkeletonRequestCard;
