"use client";

import { toast } from "@/hooks/use-toast";

import React, { useState, useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

const page = () => {
  const nameInput = useRef(null);
  const emailInput = useRef(null);
  const telephoneInput = useRef(null);
  const topicInput = useRef(null);
  const messageInput = useRef(null);

  const validateEmail = (email) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      );
  };

  const handleSendMessage = async () => {
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
      return false;
    } else if (telephoneInput.current.value.trim() == "") {
      toast({
        description: "Verify the Phone Number!",
        variant: "destructive",
        duration: 2000,
      });
      return false;
    } else if (topicInput.current.value.trim() == "") {
      toast({
        description: "You need to state a Topic!",
        variant: "destructive",
        duration: 2000,
      });
      return false;
    } else if (messageInput.current.value.trim() == "") {
      toast({
        description: "You need to enter a Message!",
        variant: "destructive",
        duration: 2000,
      });
      return false;
    } else {
      // SEND MESSAGE CODE
      toast({
        description: "Sending message...",
        variant: "default",
      });
      const formData = new FormData();
      formData.append("name", nameInput.current.value.trim());
      formData.append("email", emailInput.current.value.trim());
      formData.append("telephone", telephoneInput.current.value.trim());
      formData.append("topic", topicInput.current.value.trim());
      formData.append("message", messageInput.current.value.trim());
      await fetch("/api/contact", {
        method: "POST",
        body: formData,
      })
        .then((response) => response.json())
        .then((data) => {
          nameInput.current.value = "";
          emailInput.current.value = "";
          telephoneInput.current.value = "";
          topicInput.current.value = "";
          messageInput.current.value = "";
          toast({
            description: "Your message has been sent!",
            variant: "success",
            duration: 4000,
          });
        })
        .catch((error) => {
          console.error(error);
          toast({
            description: "Something went wrong!",
            variant: "destructive",
            duration: 5000,
          });
        });
    }
  };

  useEffect(() => {
    document.title = "RecipeVault: Contact";
  }, []);

  return (
    <div className="mx-auto mt-6 flex w-full items-center justify-center">
      <div className="mx-5 flex w-full max-w-[1300px] flex-col gap-20 sm:mx-10 xl:mx-28">
        <div className="flex w-full flex-col items-center justify-center gap-2 self-center">
          <div className="flex w-full flex-row items-center justify-center gap-3">
            <div className="h-[2px] w-10 bg-[var(--theme1)] xxsm:w-12 xsm:w-14 md:w-16 lg:w-20 xl:w-24"></div>
            <span className="font-lato text-center text-5xl font-bold text-neutral-800 sm:text-6xl md:text-7xl">
              Contact
            </span>
            <div className="h-[2px] w-10 bg-[var(--theme1)] xxsm:w-12 xsm:w-14 md:w-16 lg:w-20 xl:w-24"></div>
          </div>
          <span className="font-lato text-center text-lg text-slate-700 sm:text-xl md:text-2xl lg:text-3xl">
            Reach Out
          </span>
        </div>

        <div className="flex flex-col gap-8">
          <div className="flex flex-col items-center justify-evenly gap-3 rounded-sm border-[1px] border-neutral-100 bg-white px-4 py-6 shadow-sm drop-shadow-sm">
            <div className="flex h-12 w-12 items-center justify-center rounded-full border-[1px] border-dashed border-[var(--theme1)] p-7">
              <i className="fa-regular fa-envelope text-3xl text-[var(--theme1)]"></i>
            </div>
            <span className="font-raleway text-xl font-bold text-neutral-400">
              SEND US AN EMAIL
            </span>
            <span className="font-lato text-sm">recipevault@gmail.com</span>
          </div>

          <div className="flex flex-col gap-4 rounded-sm border-[1px] border-neutral-100 bg-white p-4 shadow-sm drop-shadow-sm">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <input
                ref={nameInput}
                type="text"
                placeholder="Name"
                className="border-[1px] border-neutral-300 px-3 py-2 outline-[var(--theme1)]"
              ></input>
              <input
                ref={emailInput}
                type="email"
                placeholder="Email"
                className="border-[1px] border-neutral-300 px-3 py-2 outline-[var(--theme1)]"
              ></input>
            </div>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <input
                ref={telephoneInput}
                type="tel"
                placeholder="Telephone"
                className="border-[1px] border-neutral-300 px-3 py-2 outline-[var(--theme1)]"
              ></input>
              <input
                ref={topicInput}
                type="text"
                placeholder="Topic"
                className="w-full border-[1px] border-neutral-300 px-3 py-2 outline-[var(--theme1)]"
              ></input>
            </div>

            <textarea
              ref={messageInput}
              maxLength={500}
              placeholder="Message"
              className="min-h-36 w-full border-[1px] border-neutral-300 px-3 py-2 outline-[var(--theme1)]"
            ></textarea>
            <span className="text-end text-[12px] font-light text-neutral-700">
              500 Chars max
            </span>
            <button
              onClick={() => {
                handleSendMessage();
              }}
              className="w-fit self-center rounded-sm border-2 border-[#ffffff] bg-[var(--theme1)] px-10 py-2.5 text-xl text-[#ffffff] transition-all duration-200 hover:border-[var(--theme1)] hover:bg-[#ffffff] hover:text-[var(--theme1)] active:scale-95"
              type="button"
            >
              Send Message
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
