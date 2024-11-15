import React from "react";
import { cn } from "@/lib/utils";

const AboutCard = ({ text, logo}) => {
  return (
    <div className="grid grid-cols-1 place-items-center bg-white border-[1px] border-neutral-200 max-w-[500px] w-full min-[1100px]:max-w-[580px] min-[1375px]:max-w-[450px] shadow-md drop-shadow-md py-5 px-4 gap-10">
      { logo }
      <span className="font-medium text-3xl text-neutral-700">{ text }</span>
    </div>
  );
};

export default AboutCard;
