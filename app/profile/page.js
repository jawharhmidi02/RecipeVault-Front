"use client";
import React from "react";
import Cookies from "js-cookie";
const page = () => {
  const logout = () => {
    Cookies.remove("access_token");
    location.href = "/sign-in";
  };
  return (
    <div>
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
