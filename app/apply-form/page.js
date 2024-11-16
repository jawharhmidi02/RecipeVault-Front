"use client";
import React, { useRef, useState } from "react";
import { toast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";
import Cookies from "js-cookie";

const page = () => {
  const resumeInput = useRef(null);
  const [resumeFileName, setResumeFileName] = useState("");
  const nameInput = useRef(null);
  const emailInput = useRef(null);
  const telephoneInput = useRef(null);
  const reasonInput = useRef(null);
  const [loading, setLoading] = useState(false);
  const validateEmail = (email) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      );
  };

  const handleApply = async () => {
    if (nameInput.current.value.trim() == "") {
      toast({
        description: "You need to enter a name!",
        variant: "destructive",
        duration: 2000,
      });
      return false;
    } else if (
      emailInput.current.value.trim() == "" ||
      !validateEmail(emailInput.current.value.trim())
    ) {
      toast({
        description: "Verify the Email!",
        variant: "destructive",
        duration: 2000,
      });
      return false;
    } else if (telephoneInput.current.value.trim() == "") {
      toast({
        description: "Verify the Phone Number!",
        variant: "destructive",
        duration: 2000,
      });
      return false;
    } else if (reasonInput.current.value.trim() == "") {
      toast({
        description: "You need to state a reason!",
        variant: "destructive",
        duration: 2000,
      });
      return false;
    } else if (!resumeInput.current.files[0]) {
      toast({
        description: "You need to upload a resume!",
        variant: "destructive",
        duration: 2000,
      });
      return false;
    } else {
      const formData = new FormData();
      formData.append("full_name", nameInput.current.value.trim());
      formData.append("email", emailInput.current.value.trim());
      formData.append("telephone", telephoneInput.current.value.trim());
      formData.append("description", reasonInput.current.value.trim());
      formData.append("file", resumeInput.current.files[0]);

      try {
        setLoading(true);
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/forms`,
          {
            method: "POST",
            headers: {
              access_token: Cookies.get("access_token"),
            },
            body: formData,
          },
        );
        if (!response.ok) {
          throw new Error("Something went wrong!");
        }

        const data = await response.json();
        if (data.statusCode !== 201) {
          throw new Error(data.message);
        }

        if (data.statusCode === 201) {
          toast({
            description: "Your application form has been submitted!",
            variant: "success",
            duration: 5000,
          });
          // nameInput.current.value = "";
          // emailInput.current.value = "";
          // telephoneInput.current.value = "";
          // reasonInput.current.value = "";
          // setResumeFileName("");
          // resumeInput.current.value = "";
        }
        setLoading(false);
      } catch (error) {
        setLoading(false);
        console.log(error);
        toast({
          title: "Error!",
          description: "Something went wrong!",
          variant: "destructive",
          duration: 2000,
        });
      }
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto mt-6 flex w-full items-center justify-center">
      <div className="mx-5 flex w-full max-w-[1300px] flex-col gap-20 sm:mx-10 xl:mx-28">
        <div className="flex w-full flex-col items-center justify-center gap-2 self-center">
          <div className="flex w-full flex-row items-center justify-center gap-3">
            <div className="h-[2px] w-10 bg-[var(--theme1)] xxsm:w-12 xsm:w-14 md:w-16 lg:w-20 xl:w-24"></div>
            <span className="font-lato text-center text-5xl font-bold text-neutral-800 sm:text-6xl md:text-7xl">
              Apply
            </span>
            <div className="h-[2px] w-10 bg-[var(--theme1)] xxsm:w-12 xsm:w-14 md:w-16 lg:w-20 xl:w-24"></div>
          </div>
          <span className="font-lato text-center text-lg text-slate-700 sm:text-xl md:text-2xl lg:text-3xl">
            As a nutrition specialist
          </span>
          <div className="flex w-full flex-col gap-4 rounded-sm border-[1px] border-neutral-100 bg-white p-4 shadow-sm drop-shadow-sm">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <input
                ref={nameInput}
                type="text"
                placeholder="Full Name"
                className="border-[1px] border-neutral-300 px-3 py-2 outline-[var(--theme1)]"
              ></input>
              <input
                ref={emailInput}
                type="email"
                placeholder="Email"
                className="border-[1px] border-neutral-300 px-3 py-2 outline-[var(--theme1)]"
              ></input>
            </div>
            <div className="grid grid-cols-1 gap-4">
              <input
                ref={telephoneInput}
                type="tel"
                placeholder="Telephone"
                className="border-[1px] border-neutral-300 px-3 py-2 outline-[var(--theme1)]"
              ></input>
            </div>
            <textarea
              ref={reasonInput}
              maxLength={500}
              placeholder="What inspired you to apply for this role?"
              className="min-h-36 w-full border-[1px] border-neutral-300 px-3 py-2 outline-[var(--theme1)]"
            ></textarea>
            <span className="text-end text-[12px] font-light text-neutral-700">
              500 Chars max
            </span>
            <div className="flex flex-col gap-2">
              <div className="text-2xl font-bold text-neutral-600">
                Upload file
              </div>
              <div className="text-[14px] font-light tracking-wider text-neutral-500">
                UPLOAD YOUR RESUME
              </div>
              <div
                onClick={() => {
                  resumeInput.current.click();
                }}
                className="flex flex-row items-center justify-center gap-4 rounded-lg border-[3px] border-dashed border-[var(--theme1)] py-6 hover:cursor-pointer"
              >
                <i className="fa-solid fa-upload text-4xl text-[var(--theme1)]"></i>
                <div>
                  <font className="hidden text-[26px] font-semibold text-[var(--theme1)] sm:block">
                    Drop items here or
                  </font>
                  <font className="hidden text-[26px] font-semibold sm:block">
                    {" "}
                    Browse files
                  </font>
                  <font className="text-xl font-semibold sm:hidden">
                    Upload Resume
                  </font>
                </div>
              </div>
              <div className="text-lg font-semibold text-emerald-500">
                {resumeFileName}
              </div>
            </div>
            <input
              type="file"
              accept=".pdf"
              ref={resumeInput}
              onChange={() => {
                const file = resumeInput.current.files[0];
                const reader = new FileReader();
                reader.onloadend = () => {
                  setResumeFileName(file.name);
                };
                reader.readAsDataURL(file);
              }}
              className="hidden"
            ></input>

            <button
              onClick={() => {
                handleApply();
              }}
              disabled={loading}
              className={cn(
                "w-fit self-center rounded-sm border-2 border-[#ffffff] bg-[var(--theme1)] px-10 py-2.5 text-xl text-[#ffffff] transition-all duration-200 hover:border-[var(--theme1)] hover:bg-[#ffffff] hover:text-[var(--theme1)] active:scale-95",
                loading && "pointer-events-none cursor-not-allowed opacity-50",
              )}
              type="button"
            >
              {loading ? (
                <div className="flex items-center justify-center">
                  <div className="h-5 w-5 animate-spin rounded-full border-b-2 border-white"></div>
                </div>
              ) : (
                "Apply"
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
