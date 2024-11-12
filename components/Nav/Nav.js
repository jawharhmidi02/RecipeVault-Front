"use client";
import { useRouter } from "next/navigation";
import React, { useRef } from "react";
import "./Nav.css";
import Menu from "../Menu/Menu";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

const Nav = () => {
  const router = useRouter();
  const closeButton = useRef(null);
  return (
    <div className="mb-10 flex w-full flex-row items-center justify-between px-5 pb-4 pt-2 md:px-10">
      <div className="flex flex-row items-center gap-12 text-lg font-semibold">
        <div
          className="flex flex-row gap-1 font-ubuntu text-2xl font-semibold hover:cursor-pointer min-[500px]:flex-col min-[500px]:gap-0"
          onClick={() => {
            router.push("/");
          }}
        >
          <div className="text-[var(--theme1)]">Recipe</div>
          <div>Vault</div>
        </div>
        <Menu orientation="row" />
      </div>
      <div className="flex flex-row gap-4">
        <div className="mr-4 hidden flex-row items-center gap-1 rounded-md border px-2 py-2 min-[500px]:flex">
          <i className="fa-solid fa-magnifying-glass text-md px-1 text-neutral-500"></i>
          <input
            placeholder={"Search for recipes"}
            className="bg-transparent placeholder-neutral-500 outline-none"
          />
        </div>
        <Dialog>
          <DialogTrigger>
            <div className="flex items-center justify-center rounded-md p-2 transition-all duration-200 active:scale-105 active:bg-zinc-100 min-[500px]:hidden">
              <i className="fa-solid fa-magnifying-glass text-2xl"></i>
            </div>
          </DialogTrigger>
          <DialogContent className="flex items-center justify-center py-12">
            <DialogTitle></DialogTitle>
            <div className="flex flex-col items-center justify-center gap-4">
              <div className="text-xl font-semibold text-neutral-800">
                What would you like to cook?
              </div>
              <div className="mr-4 flex-row items-center gap-1 rounded-md border px-2 py-2">
                <i className="fa-solid fa-magnifying-glass text-md px-1 text-neutral-500"></i>
                <input
                  placeholder={"Search for recipes"}
                  className="placeholder-neutral-500 outline-none"
                />
              </div>
            </div>
          </DialogContent>
        </Dialog>
        <div
          onClick={() => {
            router.push("/sign-in");
          }}
          className="flex flex-row items-center gap-2 rounded-lg p-2 transition-all duration-200 hover:scale-105 hover:cursor-pointer hover:bg-zinc-100"
        >
          <i className="fa-regular fa-user text-2xl min-[500px]:text-xl"></i>
          <div className="hidden text-lg min-[700px]:block">
            Sign In / Sign Up
          </div>
        </div>
        <Sheet>
          <SheetTrigger asChild>
            <div className="flex self-center min-[1060px]:hidden">
              <i className="fa-solid fa-bars self-center text-2xl min-[500px]:text-xl"></i>
            </div>
          </SheetTrigger>
          <SheetContent className="w-[220px] bg-white">
            <DialogTitle></DialogTitle>
            <Menu orientation="col" closeButton={closeButton} />
            <SheetClose>
              <a className="hidden" ref={closeButton}></a>
            </SheetClose>
          </SheetContent>
        </Sheet>
      </div>
    </div>
  );
};

export default Nav;
