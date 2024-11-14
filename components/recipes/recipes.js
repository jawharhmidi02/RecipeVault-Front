"use client";
import FilterInterface from "@/components/FitlerInterface/FilterInterface";
import RecipeCard from "@/components/RecipeCard/RecipeCard";
import { toast } from "@/hooks/use-toast";
import { useRouter, useSearchParams } from "next/navigation";
import React, { Suspense, useEffect, useRef, useState } from "react";

const Recipes = () => {
  const [loadingRecipes, setLoadingRecipes] = useState(true);
  const [recipesData, setRecipesData] = useState([]);
  const [totalItem, setTotalItem] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const searchParams = useSearchParams();
  const searchQuery = searchParams.get("search") || "";
  const searchInputPC = useRef("");
  const router = useRouter();

  const fetchRecipes = async () => {
    setLoadingRecipes(true);
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/recipes/search?type&ingredientsLocation&tag&title&page&limit&sortBy&sortOrder&cuisineLocation&sortOrder&sortBy`,
        {
          method: "GET",
        },
      );
      const data = await res.json();
      if (data.data === null) {
        throw new Error(data.message);
      }
      setRecipesData(data.data.data);
      console.log(data.data);

      setTotalItem(data.totalItems);
      setCurrentPage(data.currenPage);

      setLoadingRecipes(false);
    } catch (error) {
      console.log(error);
      toast({
        title: "Error",
        description: "Something went wrong, Please Try Again!",
        variant: "destructive",
      });
      setLoadingRecipes(false);
    }
    setLoadingRecipes(false);
  };

  const recipes = [
    {
      id: "e5bdac5b-ff37-4ff3-aaf0-ca443e121cac",
      title: "Recipe test 1",
      steps: ["3abi", "meow"],
      description: "this is a bad meal",
      ingredientsLocation: "Tunis",
      ingredients: ["Tomato"],
      is_approved: false,
      is_rejected: false,
      rejection_reason: null,
      approvedAt: null,
      user: {
        dialogues: [],
        email: "client01@gmail.com",
        id: "dee658f7-0f25-4b13-9729-e0b8282a57f3",
        full_name: "Client Account",
        phone: "+21650974080",
        role: "client",
        nonce: null,
      },
      img: "/images/Recipe1.jpg",
      cuisineLocation: "Brazil",
      tags: ["tag5", "tag2"],
      type: "Starter",
      likes: 2000,
    },
    {
      img: "/images/Recipe1.jpg",
      title: "Chicken Rice",
      cuisineLocation: "Hainanese",
      ingredientsLocation: "Asia",
      likes: 1500,
    },
    {
      img: "/images/Recipe1.jpg",
      title: "Chicken Rice",
      cuisineLocation: "Hainanese",
      ingredientsLocation: "Asia",
      likes: 1500,
    },
    {
      img: "/images/Recipe1.jpg",
      title: "Chicken Rice",
      cuisineLocation: "Hainanese",
      ingredientsLocation: "Asia",
      likes: 1500,
    },
    {
      img: "/images/Recipe1.jpg",
      title: "Chicken Rice",
      cuisineLocation: "Hainanese",
      ingredientsLocation: "Asia",
      likes: 1500,
    },
    {
      img: "/images/Recipe1.jpg",
      title: "Chicken Rice",
      cuisineLocation: "Hainanese",
      ingredientsLocation: "Asia",
      likes: 1500,
    },
    {
      img: "/images/Recipe1.jpg",
      title: "Chicken Rice",
      cuisineLocation: "Hainanese",
      ingredientsLocation: "Asia",
      likes: 1500,
    },
    {
      img: "/images/Recipe1.jpg",
      title: "Chicken Rice",
      cuisineLocation: "Hainanese",
      ingredientsLocation: "Asia",
      likes: 1500,
    },
    {
      img: "/images/Recipe1.jpg",
      title: "Chicken Rice",
      cuisineLocation: "Hainanese",
      ingredientsLocation: "Asia",
      likes: 1500,
    },
    {
      img: "/images/Recipe1.jpg",
      title: "Chicken Rice",
      cuisineLocation: "Hainanese",
      ingredientsLocation: "Asia",
      likes: 1500,
    },
    {
      img: "/images/Recipe1.jpg",
      title: "Chicken Rice",
      cuisineLocation: "Hainanese",
      ingredientsLocation: "Asia",
      likes: 1500,
    },
  ];

  useEffect(() => {
    fetchRecipes();
  }, []);

  return (
    <div className="mx-auto flex w-full items-center justify-center">
      <div className="flex w-full flex-row items-center justify-center gap-10 px-5 min-[600px]:px-20 min-[800px]:px-14">
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

          <div className="mt-2 grid w-full grid-cols-1 gap-8 min-[800px]:grid-cols-2 xl:grid-cols-3 min-[1580px]:grid-cols-4">
            {recipes.map((recipe, index) => (
              <RecipeCard key={index} recipe={recipe} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Recipes;
