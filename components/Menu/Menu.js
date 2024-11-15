"use client";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useTransition } from "react";
import { cn } from "@/lib/utils";
import "./Menu.css";

const Menu = ({ orientation, closeButton, setLoadingPage }) => {
  const router = useRouter();
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    setLoadingPage(isPending);
  }, [isPending]);
  return (
    <div
      className={cn(
        "hidden flex-row items-center gap-8 text-[15px] min-[1180px]:flex",
        orientation == "col" && "flex flex-col items-start gap-7 text-lg",
      )}
    >
      <div
        className={cn("link text-neutral-700", pathname === "/" && "active")}
      >
        <a
          onClick={() => {
            setLoadingPage(true);
            startTransition(() => {
              router.push("/");
            });
            setTimeout(() => {
              closeButton?.current.click();
            }, 500);
          }}
          // href="/"
          className="hover:cursor-pointer"
        >
          Home
        </a>
      </div>
      <div
        className={cn(
          "link text-neutral-700",
          pathname.includes("recipes") && "active",
        )}
      >
        <a
          onClick={() => {
            setLoadingPage(true);
            startTransition(() => {
              router.push("/recipes");
            });
            setTimeout(() => {
              closeButton?.current.click();
            }, 500);
          }}
          className="hover:cursor-pointer"
        >
          Recipes
        </a>
      </div>
      <div
        className={cn(
          "link text-neutral-700",
          pathname.includes("about") && "active",
        )}
      >
        <a
          onClick={() => {
            setLoadingPage(true);
            startTransition(() => {
              router.push("/about");
            });
            setTimeout(() => {
              closeButton?.current.click();
            }, 500);
          }}
          className="hover:cursor-pointer"
        >
          About
        </a>
      </div>
      <div
        className={cn(
          "link text-neutral-700",
          pathname.includes("contact") && "active",
        )}
      >
        <a
          onClick={() => {
            setLoadingPage(true);
            startTransition(() => {
              router.push("/contact");
            });
            setTimeout(() => {
              closeButton?.current.click();
            }, 500);
          }}
          className="hover:cursor-pointer"
        >
          Contact
        </a>
      </div>
      <div
        className={cn(
          "link text-neutral-700",
          pathname.includes("apply-form") && "active",
        )}
      >
        <a
          onClick={() => {
            setLoadingPage(true);
            startTransition(() => {
              router.push("/apply-form");
            });
            setTimeout(() => {
              closeButton?.current.click();
            }, 500);
          }}
          className="hover:cursor-pointer"
        >
          Form
        </a>
      </div>
    </div>
  );
};

export default Menu;
