"use client";
import React from "react";
import { cn } from "@/lib/utils";
import { useState } from "react";

const HomePageCard = ({ title, description, logo}) => {
  const [hover, setHover] = useState(false);
  return (
    <div
      onMouseOver={() => {
        setHover(true);
      }}
      onMouseOut={() => {
        setHover(false);
      }}
      className="flex flex-col p-10 gap-4 bg-white border-[1px] border-neutral-100 shadow-sm drop-shadow-sm max-w-[700px] w-full mx-auto"
    >
      <div
        className={cn(
          "bg-zinc-200 transition-colors duration-200 text-center rounded-full w-12 h-12",
          hover && "bg-[var(--theme1)]"
        )}
      >
        <i className={`${logo} text-[44px] relative top-1 left-3 text-neutral-700`}></i>
      </div>
      <div
        className={cn(
          "text-slate-800 w-fit text-start text-xl font-semibold font-lato py-2 border-b-[4px] border-b-[var(--tertiary)] transition-colors duration-200",
          hover && "border-b-[var(--theme1)]"
        )}
      >
        { title }
      </div>
      <div className="text-slate-600 text-base">
        { description }
      </div>
    </div>
  );
};

export default HomePageCard;
