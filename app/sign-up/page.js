"use client";
import AccountDecoration from "@/components/AccountDecoration/AccountDecoration";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { toast } from "@/hooks/use-toast";
import Cookies from "js-cookie";
import { useRef } from "react";

const page = () => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const nameRef = useRef(null);
  const phoneRef = useRef(null);

  const login = async () => {
    if (
      emailRef.current.value === "" ||
      passwordRef.current.value === "" ||
      nameRef.current.value === "" ||
      phoneRef.current.value === ""
    ) {
      toast({
        title: "Error",
        description: "Please fill in all fields.",
        variant: "destructive",
        duration: 2500,
      });
      return;
    }
    try {
      setLoading(true);

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/users/signup`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: emailRef.current.value,
            password: passwordRef.current.value,
            full_name: nameRef.current.value,
            phone: phoneRef.current.value,
          }),
        },
      );
      const data = await response.json();

      if (data.data === null) {
        if (data.message === "Email already exists") {
          toast({
            title: "Error",
            description: "Email already exists, Please use another email!",
            variant: "destructive",
            duration: 2500,
          });
          setLoading(false);
          return;
        }
        throw new Error(data.message);
      }

      toast({
        title: "Success",
        description: "Your account has been created successfully!",
        variant: "success",
        duration: 2500,
      });

      router.push("/sign-in");
      setLoading(false);
    } catch (error) {
      setLoading(false);

      toast({
        title: "Error",
        description: "An error occurred while logging in.",
        variant: "destructive",
        duration: 2500,
      });

      console.log(error);
    }
    setLoading(false);
  };
  return (
    <div className="mx-auto mt-10 flex h-full w-full items-center justify-center">
      <div
        className={cn(
          "xsm:mx-10 mx-4 grid w-full max-w-[580px] grid-cols-1 min-[800px]:max-w-[1200px] min-[800px]:grid-cols-2",
        )}
      >
        <div className="flex flex-col justify-center rounded-t-3xl bg-white px-8 py-10 shadow-md drop-shadow-md min-[800px]:rounded-l-3xl min-[800px]:rounded-tr-none lg:py-14 xl:py-20">
          <div
            className={cn("flex flex-col items-center justify-center gap-5")}
          >
            <span className="font-lato text-xl font-semibold text-neutral-900">
              Sign Up
            </span>

            <div className="flex w-full max-w-[400px] flex-col gap-1">
              <label htmlFor="fullName" className="font-lato text-sm font-bold">
                {" "}
                FULL NAME
              </label>
              <input
                ref={nameRef}
                type="text"
                placeholder="Full Name"
                id="fullName"
                className="rounded-full bg-[var(--bg2)] py-3 pl-4 outline-[var(--theme1)]"
              />
            </div>

            <div className="flex w-full max-w-[400px] flex-col gap-1">
              <label htmlFor="phone" className="font-lato text-sm font-bold">
                {" "}
                PHONE
              </label>
              <input
                ref={phoneRef}
                type="tel"
                placeholder="+216 12 345 678"
                id="phone"
                className="rounded-full bg-[var(--bg2)] py-3 pl-4 outline-[var(--theme1)]"
              />
            </div>

            <div className="flex w-full max-w-[400px] flex-col gap-1">
              <label htmlFor="email" className="font-lato text-sm font-bold">
                {" "}
                EMAIL
              </label>
              <input
                ref={emailRef}
                type="email"
                placeholder="Example@domain.com"
                id="email"
                className="rounded-full bg-[var(--bg2)] py-3 pl-4 outline-[var(--theme1)]"
              />
            </div>

            <div className="flex w-full max-w-[400px] flex-col gap-1">
              <label htmlFor="password" className="font-lato text-sm font-bold">
                {" "}
                PASSWORD
              </label>
              <input
                ref={passwordRef}
                type="password"
                placeholder="Password"
                id="password"
                className="rounded-full bg-[var(--bg2)] py-3 pl-4 outline-[var(--theme1)]"
              />
            </div>

            <button
              type="button"
              onClick={() => {
                login();
              }}
              disabled={loading}
              className={cn(
                "font-lato w-full max-w-[400px] rounded-full border-2 border-[#ffffff] border-[var(--theme1)] bg-[var(--theme1)] py-3 text-[#ffffff] outline-none transition-colors duration-200 hover:bg-[var(--hover-theme2)] hover:text-[var(--theme1)]",
                loading && "hover:cursor-not-allowed",
              )}
            >
              {loading ? (
                <div className="flex items-center justify-center">
                  <div className="h-5 w-5 animate-spin rounded-full border-b-2 border-white"></div>
                </div>
              ) : (
                "Sign Up"
              )}
            </button>
          </div>
        </div>
        <AccountDecoration
          welcomeText="Welcome Aboard!"
          accountText="Already have an account?"
          signText="Sign In"
          url="./sign-in"
        />
      </div>
    </div>
  );
};

export default page;
