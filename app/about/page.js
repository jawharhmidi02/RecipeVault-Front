"use client";

import { useEffect } from "react";
import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const page = () => {
  const faqCards = [
    {
      question: "1. What is RecipeVault?",
      answer:
        "RecipeVault is a community-driven platform where users can share and discover recipes that emphasize local, seasonal ingredients. It promotes sustainable agriculture, healthy eating, and the global mission of Zero Hunger.",
    },
    {
      question: "2. How does RecipeVault support sustainable agriculture?",
      answer:
        "RecipeVault encourages users to use locally sourced and seasonal ingredients in their recipes. This reduces the environmental impact of food transportation and supports local farmers and markets.",
    },
    {
      question: "3. Who reviews the submitted recipes?",
      answer:
        "Recipes are reviewed by trusted nutrition specialists who can apply for this role directly on the website. Specialists ensure the recipes meet quality, nutritional, and sustainability standards before approval.",
    },
    {
      question:
        "4. How can I apply to be a nutrition specialist on RecipeVault?",
      answer:
        "If you’re a certified nutritionist or have relevant expertise, you can apply for the role via the application form on our website. Once verified, you’ll be able to review, accept, or reject submitted recipes.",
    },
    {
      question: "5. What happens if my recipe is rejected?",
      answer:
        "If your recipe is rejected, you’ll receive feedback from a specialist explaining the decision. You can refine and resubmit your recipe based on the feedback.",
    },
    {
      question: "6. Are all recipes free to access?",
      answer:
        "Yes, all approved recipes are freely available to the community. RecipeVault believes in making healthy and sustainable eating accessible to everyone.",
    },
    {
      question: "7. How do I find recipes based on local ingredients?",
      answer:
        "You can use our search filters to find recipes based on region, ingredient availability, and season. This ensures you're using fresh, local ingredients in your cooking.",
    },
    {
      question:
        "8. How do you ensure the accuracy of the nutritional information?",
      answer:
        "Nutrition specialists review all recipes for accuracy and completeness, ensuring the nutritional information provided aligns with current dietary guidelines.",
    },
    {
      question: "9. Can I interact with other users on RecipeVault?",
      answer:
        "Yes! Users can like, comment on, and share recipes. RecipeVault fosters a collaborative and supportive community for food enthusiasts.",
    },
    {
      question: "10. How does RecipeVault align with Goal 2 (Zero Hunger)?",
      answer:
        "By promoting recipes that prioritize local, sustainable ingredients and sharing knowledge about healthy eating, RecipeVault supports food security and reduces waste, aligning with Goal 2 of the UN’s Sustainable Development Goals.",
    },
    {
      question: "11. Can I contribute as a guest?",
      answer:
        "Guests can browse recipes, but creating, submitting, or interacting with content requires registering an account.",
    },
    {
      question: "12. How is RecipeVault different from other recipe platforms?",
      answer:
        "RecipeVault stands out by focusing on sustainability and health, with specialist-reviewed recipes that emphasize seasonal and local ingredients. It’s more than a recipe platform—it’s a movement toward zero hunger.",
    },
  ];

  useEffect(() => {
    document.title = "RecipeVault: About";
  }, []);
  return (
    <div className="m-6 mx-auto flex w-full flex-col items-center justify-center gap-10">
      <div className="flex w-full flex-col items-center justify-center gap-2 self-center">
        <div className="flex w-full flex-row items-center justify-center gap-3">
          <div className="h-[2px] w-10 bg-[var(--theme1)] xxsm:w-12 xsm:w-14 md:w-16 lg:w-20 xl:w-24"></div>
          <span className="font-lato text-center text-5xl font-bold text-neutral-800 sm:text-6xl md:text-7xl">
            About Us
          </span>
          <div className="h-[2px] w-10 bg-[var(--theme1)] xxsm:w-12 xsm:w-14 md:w-16 lg:w-20 xl:w-24"></div>
        </div>
        <span className="font-lato text-center text-lg text-slate-700 sm:text-xl md:text-2xl lg:text-3xl">
          Who We Are
        </span>
      </div>

      <div className="group mx-10 grid grid-cols-1 gap-10 lg:grid-cols-2">
        <div className="flex flex-col items-center justify-center gap-6">
          <div className="font-lato relative hidden text-4xl font-semibold before:absolute before:left-full before:top-3 before:h-10 before:w-10 before:border-b-2 before:border-r-2 before:border-[var(--theme1)] before:content-[''] after:absolute after:-left-10 after:-top-2 after:h-10 after:w-10 after:border-l-2 after:border-t-2 after:border-[var(--theme1)] after:bg-transparent after:transition-all after:content-[''] lg:block">
            <span>Our Website</span>
          </div>

          <div
            className="flex flex-row gap-1 font-ubuntu text-7xl font-semibold hover:cursor-pointer min-[500px]:flex-col min-[500px]:gap-0"
            onClick={() => {
              setLoadingPage(true);

              startTransition(() => {
                router.push("/");
              });
            }}
          >
            <div className="text-[var(--theme1)]">Recipe</div>
            <div>Vault</div>
          </div>
        </div>

        <div
          id="faqs"
          className="flex max-w-[600px] flex-col gap-4 rounded-md border-[1px] border-neutral-200 bg-white px-6 py-8 shadow-md drop-shadow-md xsm:px-12"
        >
          <span className="font-lato text-center text-xl font-semibold text-[var(--theme1)] xxsm:text-2xl">
            About our online site
          </span>
          <span className="font-raleway text-neutral-800">
            Welcome to RecipeVault, where passion for food meets the mission to
            make a difference. RecipeVault is more than just a recipe-sharing
            platform—it’s a community-driven initiative dedicated to promoting
            sustainable agriculture, healthy eating, and global food security.
            Our mission aligns with the United Nations' Goal 2: Zero Hunger. By
            empowering individuals to share and discover recipes made with
            local, seasonal ingredients, we aim to reduce food waste, support
            local farmers, and encourage a deeper connection to the food we eat.
            What sets RecipeVault apart is our commitment to quality and
            collaboration. Recipes submitted to our platform are reviewed by
            trusted nutrition specialists, ensuring they are not only delicious
            but also nutritious and aligned with sustainable practices.
            Specialists can apply for this role directly through our website,
            helping maintain the integrity of our community. Whether you're a
            culinary enthusiast, a health-conscious home cook, or someone
            passionate about sustainability, RecipeVault provides the tools to
            inspire and be inspired. Together, we can make healthy and
            sustainable eating accessible to everyone while contributing to a
            better future for our planet. Join us in creating a world where food
            brings people together and every meal makes an impact. RecipeVault:
            Share. Discover. Sustain.
          </span>
        </div>
      </div>

      <span
        className="font-lato mt-5 border-b-2 border-[var(--theme1)] pb-2 text-center text-4xl font-semibold"
        id="faq"
      >
        FAQ
      </span>
      <div className="mx-5 flex w-10/12 flex-col gap-3 sm:max-w-[800px]">
        <Accordion type="single" collapsible className="w-full">
          {faqCards.map((item, index) => (
            <AccordionItem value={`item-${index}`} key={index}>
              <AccordionTrigger className="hover:no-underline">
                {item.question}
              </AccordionTrigger>
              <AccordionContent className="text-neutral-600">
                {item.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </div>
  );
};

export default page;
