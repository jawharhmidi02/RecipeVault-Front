"use client";
import { usePathname, useRouter } from "next/navigation";
import React from "react";
import { cn } from "@/lib/utils";
import './Menu.css';


const Menu = ({ orientation, closeButton}) => {
  const router = useRouter();
  const pathname = usePathname();
  return (
    <div className={cn("flex-row items-center gap-8 hidden min-[1060px]:flex text-[15px]", orientation == "col" && "flex-col flex items-start gap-7 text-lg")}>
      <div
        className={cn(
          "link text-neutral-700",
          pathname === "/" && "active"
        )}
      >
        <a
          onClick={() => {
            router.push("/");
            setTimeout(() =>{closeButton?.current.click()}, 500)
          }}
          // href="/"
          className="hover:cursor-pointer"
        >
          Home
        </a>
      </div>
      <div className={cn("link text-neutral-700")}>
        <a className="hover:cursor-pointer">Page 1</a>
      </div>
      <div className={cn("link text-neutral-700")}>
        <a className="hover:cursor-pointer">Page 2</a>
      </div>
      <div className={cn("link text-neutral-700")}>
        <a className="hover:cursor-pointer">Page 3</a>
      </div>
      <div className={cn("link text-neutral-700")}>
        <a className="hover:cursor-pointer">Page 4</a>
      </div>
    </div>
  );
};

export default Menu;
