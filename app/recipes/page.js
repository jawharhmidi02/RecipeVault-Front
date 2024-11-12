"use client";
import FilterInterface from "@/components/FitlerInterface/FilterInterface";
import RecipeCard from "@/components/RecipeCard/RecipeCard";
import { useRouter, useSearchParams } from "next/navigation";
import React, { Suspense, useRef } from "react";

const page = () => {
  const recipes = [
    {
      image: "/images/Recipe1.jpg",
      name: "Chicken Rice",
      cuisine: "Hainanese",
      ingredientsLocation: "Asia",
      likes: 1500,
    },
    {
      image: "/images/Recipe1.jpg",
      name: "Chicken Rice",
      cuisine: "Hainanese",
      ingredientsLocation: "Asia",
      likes: 1500,
    },
    {
      image: "/images/Recipe1.jpg",
      name: "Chicken Rice",
      cuisine: "Hainanese",
      ingredientsLocation: "Asia",
      likes: 1500,
    },
    {
      image: "/images/Recipe1.jpg",
      name: "Chicken Rice",
      cuisine: "Hainanese",
      ingredientsLocation: "Asia",
      likes: 1500,
    },
    {
      image: "/images/Recipe1.jpg",
      name: "Chicken Rice",
      cuisine: "Hainanese",
      ingredientsLocation: "Asia",
      likes: 1500,
    },
    {
      image: "/images/Recipe1.jpg",
      name: "Chicken Rice",
      cuisine: "Hainanese",
      ingredientsLocation: "Asia",
      likes: 1500,
    },
    {
      image: "/images/Recipe1.jpg",
      name: "Chicken Rice",
      cuisine: "Hainanese",
      ingredientsLocation: "Asia",
      likes: 1500,
    },
    {
      image: "/images/Recipe1.jpg",
      name: "Chicken Rice",
      cuisine: "Hainanese",
      ingredientsLocation: "Asia",
      likes: 1500,
    },
    {
      image: "/images/Recipe1.jpg",
      name: "Chicken Rice",
      cuisine: "Hainanese",
      ingredientsLocation: "Asia",
      likes: 1500,
    },
    {
      image: "/images/Recipe1.jpg",
      name: "Chicken Rice",
      cuisine: "Hainanese",
      ingredientsLocation: "Asia",
      likes: 1500,
    },
  ];
  const searchParams = useSearchParams();
  const searchQuery = searchParams.get("search") || "";
  const searchInputPC = useRef("");
  const router = useRouter();
  return (
    <div className="mx-auto flex w-full items-center justify-center">
      <div className="flex w-full items-center justify-center flex-row gap-10 px-5 min-[600px]:px-20 min-[800px]:px-14">
        <div className="flex w-full flex-col items-center justify-center gap-8">
          <div className="text-2xl font-semibold text-[var(--theme1)]">
            {searchQuery ? (
              <>{`${searchQuery.slice(0, 1).toUpperCase() + searchQuery?.slice(1)} Recipes`}</>
            ) : (
              <></>
            )}
          </div>
          <div className="flex w-full flex-row items-center gap-1 rounded-md border px-2 py-2">
            <i className="fa-solid fa-magnifying-glass text-md px-2 text-neutral-500"></i>
            <input
              placeholder={"Search for recipes"}
              className="w-full bg-transparent placeholder-neutral-500 outline-none"
              ref={searchInputPC}
            />
            <button
              onClick={() => {
                router.push(`/recipes/?search=${searchInputPC.current.value}`);
              }}
              type="button"
              className="mr-1 rounded-xl bg-[var(--theme1)] px-2.5 py-2 text-white transition-all duration-200 hover:scale-105 hover:bg-[var(--theme2)]"
            >
              Search
            </button>
          </div>
          <Suspense>
            <FilterInterface />
          </Suspense>

          <div className="mt-2 w-full grid grid-cols-1 gap-8 min-[800px]:grid-cols-2 xl:grid-cols-3 min-[1580px]:grid-cols-4">
            {recipes.map((recipe, index) => (
              <RecipeCard key={index} recipe={recipe} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
