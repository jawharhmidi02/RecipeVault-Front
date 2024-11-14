// components/Footer.js
"use client";
import React from "react";
import { FaFacebook, FaYoutube, FaTwitter } from "react-icons/fa";
import { cn } from "@/lib/utils";
import "./Footer.css";
import { usePathname, useRouter } from "next/navigation";
import { useState, useEffect, useTransition } from "react";

const Footer = () => {
  const router = useRouter();
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();
  const [loadingPage, setLoadingPage] = useState(false);

  useEffect(() => {
    setLoadingPage(isPending);
  }, [isPending]);

  return (
    <footer
      className={cn(
        "mt-10 bg-white py-10 font-sans",
        pathname.includes("create") && "hidden",
      )}
    >
      {loadingPage && (
        <div className="justify-cente fixed inset-0 z-50 flex h-full w-full items-center justify-center bg-white/60 backdrop-blur-sm">
          <div className="h-14 w-14 animate-spin rounded-full border-b-4 border-[var(--theme1)]"></div>
        </div>
      )}
      <div className="container mx-auto px-6">
        <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-4">
          {/* Left Side: Project Name */}
          <div
            className="mb-4 font-ubuntu hover:cursor-pointer sm:col-span-2 md:col-span-1"
            onClick={() => {
              startTransition(() => {
                router.push("/");
              });
            }}
          >
            <h2 className="ml-32 text-2xl font-bold text-[var(--theme1)]">
              Recipe
            </h2>
            <h2 className="ml-32 text-2xl font-bold">Vault</h2>
            <p className="text-black-800 mt-10 max-w-xs text-center">
              RecipeVault offers a vibrant community platform where culinary
              enthusiasts can discover, share, and explore a wide variety of
              recipes from around the world. Join us to find inspiration for
              every meal and connect with others who share your passion for
              cooking.
            </p>
          </div>

          {/* Center Sections */}
          <div>
            <h3 className="text-lg font-semibold">Resources</h3>
            <ul className="mt-2 space-y-1">
              <li>
                <div className={cn("link text-neutral-700")}>
                  <a className="hover:cursor-pointer">Documentation</a>
                </div>
              </li>
              <li>
                <div className={cn("link text-neutral-700")}>
                  <a className="hover:cursor-pointer">Tutorials</a>
                </div>
              </li>
              <li>
                <div className={cn("link text-neutral-700")}>
                  <a className="hover:cursor-pointer">Support</a>
                </div>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold">Support</h3>
            <ul className="mt-2 space-y-1">
              <li>
                <div className={cn("link text-neutral-700")}>
                  <a className="hover:cursor-pointer">Help Center</a>
                </div>
              </li>
              <li>
                <div className={cn("link text-neutral-700")}>
                  <a className="hover:cursor-pointer">Privacy Policy</a>
                </div>
              </li>
              <li>
                <div
                  onClick={() => {
                    startTransition(() => {
                      router.push("/terms-and-conditions");
                    });
                  }}
                  className={cn("link text-neutral-700")}
                >
                  <a className="hover:cursor-pointer">Terms & Conditions</a>
                </div>
              </li>
            </ul>
          </div>

          {/* Right Side: Contact Us */}
          <div>
            <h3 className="text-lg font-semibold">Contact Us</h3>
            <ul className="mt-2 space-y-1">
              <li className="pb-2">4100, Medenine</li>
              <li
                className="transition-all duration-100 hover:cursor-pointer hover:text-[var(--theme1)]"
                onClick={() => {
                  window.open("mailto:recipevault@gmail.com");
                }}
              >
                RecipeVault@gmail.com
              </li>
            </ul>
          </div>
        </div>

        {/* Social Media Icons */}
        <div className="mt-10 flex justify-center space-x-6">
          <a href="#" className="hover:text-[var(--theme2)]">
            <FaFacebook size={24} />
          </a>
          <a href="#" className="hover:text-[var(--theme2)]">
            <FaYoutube size={24} />
          </a>
          <a href="#" className="hover:text-[var(--theme2)]">
            <FaTwitter size={24} />
          </a>
        </div>
        <div className="pb-3 pt-3 text-center text-black">
          Copyright © 2024{" "}
          <a className="font-bold hover:cursor-pointer">Recipe Vault</a>. All
          rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
