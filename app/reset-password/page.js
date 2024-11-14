"use client";
import { useRef, useState } from "react";
import { cn } from "@/lib/utils";
import AccountDecoration from "@/components/AccountDecoration/AccountDecoration";
import { useRouter } from "next/navigation";
import { toast } from "@/hooks/use-toast";

const page = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const emailRef = useRef(null);

  const sendRecoverEmail = async () => {
    setLoading(true);
    if (emailRef.current.value === "") {
      toast({
        title: "Error",
        description: "Please fill in all fields.",
        variant: "destructive",
      });
      setLoading(false);
      return;
    }
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/users/recoverpass/${emailRef.current.value.trim()}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        },
      );
      const responseData = await response.json();
      console.log(responseData);

      if (responseData.statusCode !== 200) {
        if (responseData.message === "Email not found") {
          toast({
            title: "Error",
            description: "Email not found",
            variant: "destructive",
          });
          setLoading(false);
          return;
        }
        throw new Error(responseData.message || "Something went wrong");
      }
      toast({
        title: "Success",
        description: "Email sent successfully, Check your Inbox!",
        variant: "success",
      });
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
      toast({
        title: "Error",
        description: "Something went wrong",
        variant: "destructive",
      });
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
            <div className="flex w-full max-w-[400px] flex-row justify-between">
              <div
                className="group hover:cursor-pointer"
                onClick={() => {
                  router.push("./sign-in");
                }}
              >
                <i className="fa-solid fa-arrow-left text-3xl text-neutral-900 transition-colors duration-200 group-hover:text-[var(--theme1)]"></i>
              </div>
              <span className="font-lato self-center text-xl font-semibold text-neutral-900">
                Password Recovery
              </span>
            </div>
            <div className="flex w-full max-w-[400px] flex-col gap-1">
              <label htmlFor="email" className="font-lato text-sm font-bold">
                {" "}
                EMAIL
              </label>
              <input
                type="email"
                ref={emailRef}
                placeholder="Example@domain.com"
                id="email"
                className="rounded-full bg-[var(--bg2)] py-3 pl-4 outline-[var(--theme1)]"
              />
            </div>

            <button
              type="button"
              disabled={loading}
              onClick={() => {
                sendRecoverEmail();
              }}
              className={cn(
                "font-lato w-full max-w-[400px] rounded-full border-2 border-[#ffffff] border-[var(--theme1)] bg-[var(--theme1)] py-3 text-[#ffffff] outline-none transition-colors duration-200 hover:bg-[var(--hover-theme2)] hover:text-[var(--theme1)]",
                loading && "cursor-not-allowed",
              )}
            >
              {loading ? (
                <div className="flex items-center justify-center">
                  <div className="h-5 w-5 animate-spin rounded-full border-b-2 border-white"></div>
                </div>
              ) : (
                "Send"
              )}
            </button>
          </div>
        </div>
        <AccountDecoration
          welcomeText="Welcome Back!"
          accountText="Don't have an account?"
          signText="Sign Up"
          url="./sign-up"
        />
      </div>
    </div>
  );
};

export default page;
