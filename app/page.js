"use client";

import "./page.css";

import { useRef, useState, useEffect, useTransition } from "react";
import Hero from "@/components/Hero/Hero";
import HowItWorks from "@/components/HowItWorks/HowItWorks";
import LookingFor from "@/components/LookingFor/LookingFor";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";

export default function Home() {
  const [loadingPage, setLoadingPage] = useState(true);
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const [user, setUser] = useState({});
  const [signed, setSigned] = useState(false);
  const [loadingUser, setLoadingUser] = useState(true);

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
      console.log(error);

      setLoadingUser(false);
      setSigned(false);
    }
    setLoadingUser(false);
  };

  const ChangeUrl = (url) => {
    startTransition(() => {
      router.push(url);
    });
  };

  useEffect(() => {
    fetchUser();
  }, []);

  useEffect(() => {
    setLoadingPage(isPending);
  }, [isPending]);

  return (
    <div className="mx-auto flex w-full flex-col">
      {loadingPage && (
        <div className="fixed inset-0 z-50 flex h-full w-full items-center justify-center bg-white/60 backdrop-blur-sm">
          <div className="h-14 w-14 animate-spin rounded-full border-b-4 border-[var(--theme1)]"></div>
        </div>
      )}
      <Hero
        ChangeUrl={(url) => {
          ChangeUrl(url);
        }}
        loading={loadingUser}
        signed={signed}
      />
      <HowItWorks />
      <LookingFor
        ChangeUrl={(url) => {
          ChangeUrl(url);
        }}
        loading={loadingUser}
        signed={signed}
        user={user}
      />
    </div>
  );
}
