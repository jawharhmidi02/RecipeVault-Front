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
    <div className="flex flex-row w-full justify-between items-center  mb-10  px-5 md:px-10 pt-2 pb-4">
      <div className="flex flex-row gap-12 text-lg font-semibold items-center">
        <div
          className="flex flex-row min-[500px]:flex-col gap-1 min-[500px]:gap-0 hover:cursor-pointer text-2xl font-semibold font-ubuntu"
          onClick={() => {
            router.push("/");
          }}
        >
          <div className=" text-[var(--theme1)]">Recipe</div>
          <div>Vault</div>
        </div>
        <Menu orientation="row" />
      </div>
      <div className="flex flex-row gap-4">
        <div className="flex-row gap-1 items-center border rounded-md px-2 py-2 mr-4 hidden min-[500px]:flex">
          <i className="fa-solid fa-magnifying-glass px-1 text-md text-neutral-500"></i>
          <input
            placeholder={"Search for recipes"}
            className="outline-none placeholder-neutral-500 bg-transparent"
          />
        </div>
        <Dialog>
          <DialogTrigger>
            <div className="flex justify-center active:scale-105 transition-all duration-200 rounded-md active:bg-zinc-100 p-2 items-center min-[500px]:hidden">
              <i className="fa-solid fa-magnifying-glass text-2xl"></i>
            </div>
          </DialogTrigger>
          <DialogContent className="items-center justify-center flex py-12">
            <DialogTitle></DialogTitle>
            <div className="flex flex-col gap-4 items-center justify-center">
              <div className="font-semibold text-xl text-neutral-800">
                What would you like to cook?
              </div>
              <div className="flex-row gap-1 items-center border rounded-md px-2 py-2 mr-4">
                <i className="fa-solid fa-magnifying-glass px-1 text-md text-neutral-500"></i>
                <input
                  placeholder={"Search for recipes"}
                  className="outline-none placeholder-neutral-500"
                />
              </div>
            </div>
          </DialogContent>
        </Dialog>
        <div onClick={() => {
          router.push('/sign-in')
        }} className="flex flex-row gap-2 items-center hover:cursor-pointer hover:scale-105 transition-all duration-200 hover:bg-zinc-100 rounded-lg p-2">
          <i className="fa-regular fa-user text-2xl min-[500px]:text-xl"></i>
          <div className="text-lg hidden min-[700px]:block">
            Sign In / Sign Up
          </div>
        </div>
        <Sheet>
          <SheetTrigger asChild>
            <div className="min-[1060px]:hidden self-center flex">
              <i className="fa-solid fa-bars text-2xl min-[500px]:text-xl self-center"></i>
            </div>
          </SheetTrigger>
          <SheetContent className="bg-white w-[220px]">
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
