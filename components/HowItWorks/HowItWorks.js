import React from "react";
import HomePageCard from "../HomePageCard/HomePageCard";

const HowItWorks = () => {
  const steps = [
    {
      title: "Cooks Submit Recipes",
      logo: "fa-solid fa-user",
      description:
        "Create an account, upload your recipe with details and photos.",
    },
    {
      title: "Nutritionists Review Recipes",
      logo: "fa-solid fa-cheese",
      description:
        "Experts ensure your recipe is healthy, balanced, and complete.",
    },
    {
      title: "Approved Recipes Go Live",
      logo: "fa-solid fa-utensils",
      description: "Share your culinary creations with the world!",
    },
  ];
  return (
    <div className="mx-auto mt-10 flex w-full max-w-[1400px] flex-col items-center justify-center gap-10">
      <div className="flex w-full flex-col items-center justify-center gap-2 self-center">
        <div className="flex w-full flex-row items-center justify-center gap-3">
          <div className="h-[2px] w-10 bg-[var(--theme1)] xxsm:w-12 xsm:w-14 md:w-16 lg:w-20"></div>
          <span className="font-lato text-center text-5xl font-bold text-neutral-800 sm:text-6xl">
            Introduction
          </span>
          <div className="h-[2px] w-10 bg-[var(--theme1)] xxsm:w-12 xsm:w-14 md:w-16 lg:w-20"></div>
        </div>
        <span className="font-lato text-center text-lg text-slate-700 sm:text-xl md:text-2xl lg:text-3xl">
          What to do
        </span>
      </div>
      <div className="grid w-full grid-cols-1 gap-10 px-10 lg:grid-cols-3">
        {steps.map((step, index) => (
          <HomePageCard
            title={step.title}
            logo={step.logo}
            description={step.description}
            key={index}
          />
        ))}
      </div>
    </div>
  );
};

export default HowItWorks;
