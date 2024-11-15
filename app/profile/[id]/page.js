"use client";
import React from "react";
import { cn } from "@/lib/utils";
import { useState, useEffect, useRef, useTransition } from "react";
import { useParams, usePathname, useRouter } from "next/navigation";
import Cookies from "js-cookie";
import RecipeCard from "@/components/RecipeCard/RecipeCard";

const page = () => {
  const params = useParams();
  const id = params.id;
  const router = useRouter();
  const pathname = usePathname();
  const [loadingUser, setLoadingUser] = useState(true);
  const [signed, setSigned] = useState(false);
  const [loadingPage, setLoadingPage] = useState(true);
  const [isPending, startTransition] = useTransition();
  // const [user, setUser] = useState({});

  const user = {
    fullName: "Lafi Raed",
    role: "specialist",
    email: "lafiraed04@gmail.com",
  };

  const recipes = [
    {
      title: "Grilled Salmon",
      img: "/images/Recipe1.jpg",
      cuisineLocation: "Brazil",
      ingredientsLocation: "Tunis",
      likes: 1500,
    },
    {
      title: "Grilled Salmon",
      img: "/images/Recipe1.jpg",
      cuisineLocation: "Brazil",
      ingredientsLocation: "Tunis",
      likes: 1500,
    },
    {
      title: "Grilled Salmon",
      img: "/images/Recipe1.jpg",
      cuisineLocation: "Brazil",
      ingredientsLocation: "Tunis",
      likes: 1500,
    },
    {
      title: "Grilled Salmon",
      img: "/images/Recipe1.jpg",
      cuisineLocation: "Brazil",
      ingredientsLocation: "Tunis",
      likes: 1500,
    },
    {
      title: "Grilled Salmon",
      img: "/images/Recipe1.jpg",
      cuisineLocation: "Brazil",
      ingredientsLocation: "Tunis",
      likes: 1500,
    },
    {
      title: "Grilled Salmon",
      img: "/images/Recipe1.jpg",
      cuisineLocation: "Brazil",
      ingredientsLocation: "Tunis",
      likes: 1500,
    },
    {
      title: "Grilled Salmon",
      img: "/images/Recipe1.jpg",
      cuisineLocation: "Brazil",
      ingredientsLocation: "Tunis",
      likes: 1500,
    },
    {
      title: "Grilled Salmon",
      img: "/images/Recipe1.jpg",
      cuisineLocation: "Brazil",
      ingredientsLocation: "Tunis",
      likes: 1500,
    },
    {
      title: "Grilled Salmon",
      img: "/images/Recipe1.jpg",
      cuisineLocation: "Brazil",
      ingredientsLocation: "Tunis",
      likes: 1500,
    },
    {
      title: "Grilled Salmon",
      img: "/images/Recipe1.jpg",
      cuisineLocation: "Brazil",
      ingredientsLocation: "Tunis",
      likes: 1500,
    },
  ];

 
  const fetchUser = async () => {
    try {
      setLoadingUser(true);

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/users/account`,
        {
          method: "GET",
          headers: {
            access_token: Cookies.get("access_token"),
            "Content-Type": "application/json",
          },
        },
      );
      const data = await response.json();

      if (data.data === null) {
        throw new Error(data.message);
      }

      setLoadingUser(false);
      setSigned(true);
      // setUser(data.data);
    } catch (error) {
      setLoadingUser(false);
    }
    setLoadingUser(false);
  };

  useEffect(() => {
    fetchUser();
    setLoadingPage(false);
  }, []);

  useEffect(() => {
    setLoadingPage(isPending);
  }, [isPending]);

  return (
    <div className="mx-auto flex w-full items-center justify-center">
      {loadingPage && (
        <div className="fixed inset-0 z-50 flex h-full w-full items-center justify-center bg-white/60 backdrop-blur-sm">
          <div className="h-14 w-14 animate-spin rounded-full border-b-4 border-[var(--theme1)]"></div>
        </div>
      )}
      <div className="mx-6 mt-12 flex w-full max-w-[900px] flex-col items-center gap-8">
        <div className="flex w-full justify-center flex-row gap-6">
          <div className="grid size-[130px] place-items-center rounded-full bg-neutral-200 shadow-md sm:size-[200px]">
            <i className="fa-solid fa-user text-6xl text-neutral-400 sm:text-7xl"></i>
          </div>
          <div className="flex flex-col justify-center gap-4">
            <div className="text-2xl font-semibold text-neutral-800 sm:text-3xl">
              {user.fullName}
            </div>

            <div
              className={cn(
                "block",
              )}
            >
              <div className="text-xl font-light text-neutral-500">
                {user.role === "client"
                  ? "Verified by a Specialist"
                  : "A Specialist"}
              </div>
            </div>

            <div className="text-xl font-light text-neutral-500">
              {user.email}
            </div>
          </div>
        </div>

        {/* PROFILE MENU BELOW */}

        <div className="flex w-full max-w-[900px] flex-row items-center justify-center gap-2 px-5 min-[900px]:px-0">
          <div
            className="flex w-full flex-col items-center justify-between gap-2 pt-8 sm:pt-0"
          >
            <span className="hidden font-light sm:block">Your Recipes</span>
            <div
              className={cn(
                "h-1.5 w-full bg-[var(--theme2)]",
              )}
            ></div>
          </div>
        </div>


        <div className="text-4xl font-semibold text-[var(--theme1)]">
          {`${user.fullName}'s Recipes`}
        </div>

        {/* MENU TITLE DONE */}


        {/* YOUR RECIPES COMPONENT BELOW */}

        <div
          className={cn(
            "grid w-full gap-6 min-[450px]:grid-cols-2 md:grid-cols-3 lg:grid-cols-4",
          )}
        >
          {recipes.map((recipe, index) => (
            <RecipeCard key={index} recipe={recipe} accepted={true} />
          ))}
        </div>

        {/* YOUR RECIPES COMPONENT DONE */}
      </div>
    </div>
  );
};

export default page;
