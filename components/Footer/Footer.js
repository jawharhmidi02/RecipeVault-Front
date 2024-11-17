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
        "mt-20 bg-white pt-10 font-sans",
        pathname.includes("create") && "hidden",
      )}
    >
      {loadingPage && (
        <div className="fixed inset-0 z-50 flex h-full w-full items-center justify-center bg-white/60 backdrop-blur-sm">
          <div className="h-14 w-14 animate-spin rounded-full border-b-4 border-[var(--theme1)]"></div>
        </div>
      )}
      <div className="mx-auto px-6">
        <div className="grid gap-8 sm:grid-cols-2 min-[950px]:grid-cols-4">
          <div className="mb-4 font-ubuntu sm:col-span-2 min-[950px]:col-span-1">
            <h2
              className="text-center text-3xl font-bold hover:cursor-pointer"
              onClick={() => {
                startTransition(() => {
                  router.push("/");
                });
              }}
            >
              Recipe<span className="text-[var(--theme1)]">Vault</span>
            </h2>
            <p className="mx-auto mt-4 max-w-screen-sm text-center text-neutral-700">
              RecipeVault offers a vibrant community platform where culinary
              enthusiasts can discover, share, and explore a wide variety of
              recipes from around the world. Join us to find inspiration for
              every meal and connect with others who share your passion for
              cooking.
            </p>
            {/* Social Media Icons */}
            <div className="mb-5 mt-4 flex justify-center space-x-6">
              <a
                href="#"
                className="transition-colors duration-300 hover:text-[var(--theme2)]"
              >
                <FaFacebook size={26} />
              </a>
              <a
                href="#"
                className="transition-colors duration-300 hover:text-[var(--theme2)]"
              >
                <FaYoutube size={26} />
              </a>
              <a
                href="#"
                className="transition-colors duration-300 hover:text-[var(--theme2)]"
              >
                <FaTwitter size={26} />
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-xl font-semibold">Support</h3>
            <ul className="mt-2 space-y-1">
              <li>
                <div className={cn("link text-neutral-700")}>
                  <a
                    className="hover:cursor-pointer"
                    onClick={() => {
                      startTransition(() => {
                        router.push("/about#faq");
                      });
                    }}
                  >
                    Help Center
                  </a>
                </div>
              </li>
              <li>
                <div className={cn("link text-neutral-700")}>
                  <a
                    className="hover:cursor-pointer"
                    onClick={() => {
                      startTransition(() => {
                        router.push("/terms-and-conditions#privacy");
                      });
                    }}
                  >
                    Privacy Policy
                  </a>
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
          <div>
            <h3 className="text-xl font-semibold">Menu</h3>
            <ul className="mt-2 space-y-1">
              <li>
                <div className={cn("link text-neutral-700")}>
                  <a
                    onClick={() => {
                      setLoadingPage(true);
                      startTransition(() => {
                        router.push("/");
                      });
                    }}
                    className="hover:cursor-pointer"
                  >
                    Home
                  </a>
                </div>
              </li>
              <li>
                <div className={cn("link text-neutral-700")}>
                  <a
                    onClick={() => {
                      setLoadingPage(true);
                      startTransition(() => {
                        router.push("/recipes");
                      });
                    }}
                    className="hover:cursor-pointer"
                  >
                    Recipes
                  </a>
                </div>
              </li>
              <li>
                <div className={cn("link text-neutral-700")}>
                  <a
                    onClick={() => {
                      setLoadingPage(true);
                      startTransition(() => {
                        router.push("/about");
                      });
                    }}
                    className="hover:cursor-pointer"
                  >
                    About
                  </a>
                </div>
              </li>
              <li>
                <div className={cn("link text-neutral-700")}>
                  <a
                    onClick={() => {
                      setLoadingPage(true);
                      startTransition(() => {
                        router.push("/contact");
                      });
                    }}
                    className="hover:cursor-pointer"
                  >
                    Contact
                  </a>
                </div>
              </li>
            </ul>
          </div>

          {/* Right Side: Contact Us */}
          <div>
            <h3 className="text-xl font-semibold">Contact Us</h3>
            <ul className="mt-2 space-y-1">
              <li className="flex flex-row items-center pb-2 text-neutral-700">
                <i className="fa-solid fa-location-dot mr-2 text-[20px]"></i>
                4100, Medenine
              </li>
              <li
                className="flex flex-row items-center pb-2 text-neutral-700 transition-all duration-100 hover:cursor-pointer hover:text-[var(--theme1)]"
                onClick={() => {
                  window.open("mailto:recipevault@gmail.com");
                }}
              >
                <i className="fa-solid fa-envelope mr-2 text-[20px]"></i>
                RecipeVault@gmail.com
              </li>
              <li
                className="flex flex-row items-center text-neutral-700 transition-all duration-100 hover:cursor-pointer hover:text-[var(--theme1)]"
                onClick={() => {
                  window.open("mailto:recipevault@gmail.com");
                }}
              >
                <i className="fa-solid fa-phone mr-2 text-[20px]"></i>
                +216 12 345 678
              </li>
            </ul>
          </div>
        </div>

        <div className="border-mask mt-8 h-[1px] w-full bg-black min-[950px]:mt-0"></div>
        <div className="py-3 text-center text-black">
          Copyright © 2024{" "}
          <a className="text-lg font-bold hover:cursor-pointer">
            Recipe<span className="text-[var(--theme1)]">Vault</span>
          </a>
          . All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
