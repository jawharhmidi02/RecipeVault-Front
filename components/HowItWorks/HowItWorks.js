import React from "react";
import HomePageCard from "../HomePageCard/HomePageCard";

const HowItWorks = () => {
  const steps = [
    {
      title: "Cooks Submit Recipes",
      logo: "fa-solid fa-user",
      description:
        "Create an account to join our community of culinary enthusiasts. Share your favorite recipes by uploading detailed instructions, ingredient lists, preparation tips, and high-quality photos. Whether you’re a home cook or a seasoned chef, this is your chance to showcase your unique creations and inspire others in the kitchen.",
    },
    {
      title: "Nutritionists Review Recipes",
      logo: "fa-solid fa-cheese",
      description:
        "Our team of professional nutritionists carefully reviews each submission to ensure your recipes meet high standards for health and balance. They analyze the nutritional content and suggest any necessary adjustments to make your dish wholesome and diet-friendly. This ensures that every recipe shared promotes well-being while retaining its deliciousness.",
    },
    {
      title: "Approved Recipes Go Live",
      logo: "fa-solid fa-utensils",
      description:
        "Once your recipe has been approved, it will be published on the platform for the world to see. Inspire fellow food lovers, get feedback, and build your reputation as a culinary expert. Share your love for cooking and connect with a community that values creativity, health, and flavor.",
    },
  ];
  return (
    <div className="mx-auto mt-10 flex w-full max-w-[1400px] flex-col items-center justify-center gap-10">
      <div className="flex w-full flex-col items-center justify-center gap-2 self-center">
        <div className="flex w-full flex-row items-center justify-center gap-3">
          <div className="h-[2px] w-10 bg-[var(--theme1)] md:w-16 lg:w-20"></div>
          <span className="font-lato text-center xxsm:text-3xl xsm:text-5xl font-bold text-neutral-800 sm:text-6xl">
            Recipe Journey
          </span>
          <div className="h-[2px] w-10 bg-[var(--theme1)] md:w-16 lg:w-20"></div>
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
