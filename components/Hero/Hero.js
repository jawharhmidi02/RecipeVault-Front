"use client";
import React, { useEffect, useState } from "react";
import "./Hero.css";

const Hero = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const items = [
    {
      title:
        "Got a recipe to share? Showcase your culinary skills and inspire others to cook delicious, healthy meals!",
      subtitle: "SHARE YOUR RECIPE",
      buttonText: "Share",
      href: "",
    },
    {
      title:
        "Looking for inspiration? Explore a world of diverse, delicious, and healthy recipes shared by our community!",
      subtitle: "EXPLORE RECIPES",
      buttonText: "Explore",
      href: "",
    },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % items.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [items.length]);

  return (
    <div className="image relative flex h-[700px] w-full flex-col items-center justify-center bg-cover bg-center bg-no-repeat px-10 py-10 min-[400px]:py-0">
      <div className="absolute left-0 top-0 z-10 h-[700px] w-full bg-neutral-900 opacity-60"></div>

      {items.map((item, index) => (
        <div
          key={index}
          className={`absolute flex h-full w-full max-w-[1000px] flex-col items-center justify-center gap-6 transition-opacity duration-1000 ${
            currentIndex === index ? "z-20 opacity-100" : "z-0 opacity-0"
          }`}
        >
          <div className="text-center text-4xl font-semibold text-white opacity-95 lg:text-6xl">
            {item.title}
          </div>
          <div className="text-center text-2xl font-extralight tracking-wider text-white opacity-90 lg:text-4xl">
            {item.subtitle}
          </div>
          <button
            type="button"
            className="rounded-lg border-2 border-[var(--theme1)] bg-transparent px-6 py-3 text-center text-xl text-[var(--theme1)] transition-all duration-200 hover:scale-110 hover:border-[var(--theme1)] hover:bg-[var(--theme1)] hover:text-white md:px-12 md:py-4 md:text-3xl"
          >
            {item.buttonText}
          </button>
        </div>
      ))}
    </div>
  );
};

export default Hero;
