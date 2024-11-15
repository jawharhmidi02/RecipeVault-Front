"use client";
import React from "react";
import { cn } from "@/lib/utils";
import { useState, useEffect, useRef, useTransition } from "react";
import { usePathname, useRouter } from "next/navigation";
import Cookies from "js-cookie";

const page = () => {
  const router = useRouter();
  const pathname = usePathname();
  const [loadingUser, setLoadingUser] = useState(true);
  const [signed, setSigned] = useState(false);
  const [loadingPage, setLoadingPage] = useState(true);
  const [isPending, startTransition] = useTransition();
  const [user, setUser] = useState({});

  const logout = () => {
    Cookies.remove("access_token");
    location.href = "/sign-in";
  };

  const fetchUser = async () => {
    try {
      setLoadingUser(true);

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/users/account`,
        {
          method: "GET",
          headers: {
            access_token: Cookies.get("access_token"),
            "Content-Type": "application/json",
          },
        },
      );
      const data = await response.json();

      if (data.data === null) {
        throw new Error(data.message);
      }

      setLoadingUser(false);
      setSigned(true);
      setUser(data.data);
    } catch (error) {
      setLoadingUser(false);
    }
    setLoadingUser(false);
  };

  useEffect(() => {
    fetchUser();
    setLoadingPage(false);
  }, []);

  useEffect(() => {
    setLoadingPage(isPending);
  }, [isPending]);

  return (
    <div>
      {loadingPage && (
        <div className="justify-cente fixed inset-0 z-50 flex h-full w-full items-center justify-center bg-white/60 backdrop-blur-sm">
          <div className="h-14 w-14 animate-spin rounded-full border-b-4 border-[var(--theme1)]"></div>
        </div>
      )}
      Profile Page
      <button
        className="rounded-lg bg-[var(--theme1)] px-5 py-2 text-white transition-all duration-300 hover:-translate-y-4 hover:translate-x-4 hover:rotate-90 hover:scale-110"
        onClick={() => {
          logout();
        }}
      >
        LogOut
      </button>
    </div>
  );
};

export default page;
