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
  //   {
  //     question: "1. What products does Golden Brand specialize in?",
  //     answer:
  //       "Golden Brand specializes in high-quality stainless steel and aluminum products, including kitchens, handrails, work tables, cabinets, sink tables, shelves, trolleys, and custom hoods designed for both residential and commercial use.",
  //   },
  //   {
  //     question:
  //       "2. Why choose stainless steel for kitchen and handrail products?",
  //     answer:
  //       "Stainless steel is durable, resistant to rust and corrosion, and easy to clean, making it an ideal choice for kitchens and handrails. Its sleek, modern appearance also enhances any space, and it withstands high temperatures, ensuring long-lasting performance.",
  //   },
  //   {
  //     question: "3. Are Golden Brand’s products customizable?",
  //     answer:
  //       "Yes, we offer customization for most of our products. Our team can work with your specifications to create items tailored to your specific needs and space requirements. Contact us to discuss custom options.",
  //   },
  //   {
  //     question: "4. How do I place an order?",
  //     answer:
  //       "You can browse our product catalog on our website, add items to your cart, and complete the order through our checkout page. For custom orders or specific inquiries, please reach out through our contact form.",
  //   },
  //   {
  //     question: "5. What payment methods are accepted?",
  //     answer:
  //       "We accept various payment methods for your convenience, including Visa, Mastercard, Apple Pay, and cash on delivery for qualifying orders.",
  //   },
  //   {
  //     question: "6. What is the delivery time for orders?",
  //     answer:
  //       "Delivery times may vary depending on the item and your location. Standard orders are typically delivered within 7-10 business days. For custom or bulk orders, please allow additional time. We offer free delivery for orders over 10,000 QAR.",
  //   },
  //   {
  //     question: "7. Does Golden Brand ship internationally?",
  //     answer:
  //       "Currently, we primarily serve customers in Qatar. However, for large or special orders, please contact us directly, and we can discuss international shipping options.",
  //   },
  //   {
  //     question: "8. What is the return policy for Golden Brand products?",
  //     answer:
  //       "We offer a satisfaction guarantee for our products. If you are not satisfied with your purchase, please contact us within 7 days of delivery for returns or exchanges, following our return policy guidelines.",
  //   },
  //   {
  //     question:
  //       "9. How should I care for and maintain stainless steel products?",
  //     answer:
  //       "Stainless steel is low-maintenance but benefits from regular cleaning with mild soap and water or a stainless steel cleaner. Avoid abrasive materials to prevent scratches and keep the finish looking new.",
  //   },
  //   {
  //     question: "10. Do you offer installation services?",
  //     answer:
  //       "Yes, we offer professional installation services for our products to ensure they are securely fitted and meet quality standards. Installation details and fees can be discussed at the time of purchase.",
  //   },
  //   {
  //     question: "11. Are bulk order discounts available?",
  //     answer:
  //       "Yes, we offer special pricing for bulk orders. For large quantities, please contact our sales team to discuss potential discounts and lead times.",
  //   },
  //   {
  //     question: "12. What sets Golden Brand apart from other suppliers?",
  //     answer:
  //       "Golden Brand is committed to using high-grade stainless steel and aluminum, guaranteeing durability, aesthetic appeal, and hygiene in every product. We prioritize quality, customizability, and exceptional customer service for all our clients.F",
  //   },
  ];
  

  useEffect(() => {
    document.title = "RecipeVault: About";
  }, []);
  return (
    <div className="m-6 mx-auto flex w-full flex-col items-center justify-center gap-10">
      <div className="flex w-full flex-col items-center justify-center gap-2 self-center">
        <div className="flex w-full flex-row items-center justify-center gap-3">
          <div className="h-[2px] w-10 bg-[var(--theme1)] xxsm:w-12 xsm:w-14 md:w-16 lg:w-20 xl:w-24"></div>
          <span className="text-center font-lato text-5xl font-bold text-neutral-800 sm:text-6xl md:text-7xl">
            About Us
          </span>
          <div className="h-[2px] w-10 bg-[var(--theme1)] xxsm:w-12 xsm:w-14 md:w-16 lg:w-20 xl:w-24"></div>
        </div>
        <span className="text-center font-lato text-lg text-slate-700 sm:text-xl md:text-2xl lg:text-3xl">
          Who We Are
        </span>
      </div>

      <div className="group mx-10 grid grid-cols-1 gap-10 lg:grid-cols-2">
        <div className="flex flex-col items-center justify-evenly">
          <div className="relative hidden font-lato text-4xl font-semibold before:absolute before:left-full before:top-3 before:h-10 before:w-10 before:border-b-2 before:border-r-2 before:border-[var(--theme1)] before:content-[''] after:absolute after:-left-10 after:-top-2 after:h-10 after:w-10 after:border-l-2 after:border-t-2 after:border-[var(--theme1)] after:bg-transparent after:transition-all after:content-[''] lg:block">
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
          <span className="text-center font-lato text-xl font-semibold text-[var(--theme1)] xxsm:text-2xl">
            About our online site
          </span>
          <span className="font-raleway text-neutral-800">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quod dolorem earum laudantium corrupti doloremque, rerum fugiat ea nostrum alias sequi quasi voluptate assumenda ipsum repellendus dignissimos omnis quo sed eligendi a, excepturi iusto molestias itaque? Quibusdam necessitatibus itaque quisquam sint, ad vel repellat fugit inventore odio eveniet earum error perspiciatis!
          </span>
        </div>
      </div>

      <span className="mt-5 border-b-2 border-[var(--theme1)] pb-2 text-center font-lato text-4xl font-semibold">
        FAQ
      </span>
      <div className="mx-5 flex w-10/12 flex-col gap-3 sm:max-w-[800px]">
        <Accordion type="single" collapsible className="w-full">
          {faqCards.map((item, index) => (
            <AccordionItem value={`item-${index}`} key={index}>
              <AccordionTrigger>{item.question}</AccordionTrigger>
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
