"use client";
import { usePathname, useRouter } from "next/navigation";
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
  DialogClose,
  DialogTrigger,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";

const Nav = () => {
  const searchInputPC = useRef("");
  const searchInputMB = useRef("");
  const router = useRouter();
  const closeButton = useRef(null);
  const closeDialog = useRef(null);
  const pathname = usePathname();
  return (
    <div className={cn("mb-10 flex w-full flex-row items-center justify-between bg-white px-5 pb-4 pt-4 md:px-10", pathname.includes("create") && "mb-0")}>
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
        {!pathname.includes("recipes") && (
          <div className="mr-1 hidden flex-row items-center gap-1 rounded-md border px-2 py-2 min-[600px]:flex min-[800px]:mr-4">
            <i className="fa-solid fa-magnifying-glass text-md px-2 text-neutral-500"></i>
            <input
              placeholder={"Search for recipes"}
              className="bg-transparent placeholder-neutral-500 outline-none"
              ref={searchInputPC}
            />
            <button
              onClick={() => {
                router.push(`/recipes/?search=${searchInputPC.current.value}`);
              }}
              type="button"
              className="mr-1 rounded-xl bg-[var(--theme1)] px-2.5 py-2 text-white transition-all duration-200 hover:scale-105 hover:bg-[var(--theme2)]"
            >
              Search
            </button>
          </div>
        )}
        {!pathname.includes("recipes") && (
        <Dialog>
          <DialogTrigger>
            <div className="flex items-center justify-center rounded-md p-2 transition-all duration-200 active:scale-105 active:bg-zinc-100 min-[600px]:hidden">
              <i className="fa-solid fa-magnifying-glass text-2xl"></i>
            </div>
          </DialogTrigger>
          <DialogContent className="flex items-center justify-center py-12 px-2">
            <DialogTitle></DialogTitle>
            <div className="flex flex-col items-center justify-center gap-4">
              <div className="text-xl font-semibold text-neutral-800">
                What would you like to cook?
              </div>
              <div className="flex-row items-center gap-1 rounded-md border px-2 py-2">
                {/* <i className="fa-solid fa-magnifying-glass text-md px-1 text-neutral-500"></i> */}
                <button
                  onClick={() => {
                    setTimeout(() => {
                      closeDialog.current.click();
                    }, 500);
                    router.push(
                      `/recipes/?search=${searchInputMB.current.value}`,
                    );
                  }}
                  type="button"
                  className="mr-4 rounded-md bg-[var(--theme1)] px-2.5 py-2 text-white transition-all duration-200 hover:scale-105 hover:bg-[var(--theme2)]"
                >
                  <div className="min-[390px]:hidden">
                    <i className="fa-solid fa-magnifying-glass text-md text-white"></i>
                  </div>
                  <span className="hidden min-[390px]:block">Search</span>
                </button>
                <input
                  placeholder={"Search for recipes"}
                  className="placeholder-neutral-500 outline-none"
                  ref={searchInputMB}
                />
              </div>
            </div>
            <DialogClose>
              <a className="hidden" ref={closeDialog}></a>
            </DialogClose>
          </DialogContent>
        </Dialog>
        )}
        <div
          onClick={() => {
            router.push("/sign-in");
          }}
          className="flex flex-row items-center gap-2 rounded-lg p-2 transition-all duration-200 hover:scale-105 hover:cursor-pointer hover:bg-zinc-100"
        >
          <i className="fa-regular fa-user text-2xl min-[500px]:text-xl"></i>
          <div className="hidden text-lg min-[800px]:block">
            Sign In / Sign Up
          </div>
        </div>
        <Sheet>
          <SheetTrigger asChild>
            <div className="flex self-center min-[1180px]:hidden">
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
