"use client";

import "./FeaturedRecipes.css";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

import { useRouter } from "next/navigation";
import RecipeCard from "../RecipeCard/RecipeCard";
import { useEffect, useState } from "react";
import SkeletonRecipeCard from "../RecipeCard/SkeletonRecipeCard";

const FeaturedRecipes = ({ ChangeUrl }) => {
  const router = useRouter();
  const [recipes, setRecipes] = useState([]);
  const [loadingRecipes, setLoadingRecipes] = useState(true);

  const fetchPopularRecipes = async () => {
    setLoadingRecipes(true);
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/recipes/like?limit=8`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        },
      );

      const data = await response.json();
      if (data.data === null) {
        throw new Error(data.message);
      }

      setRecipes(data.data.data);
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

  useEffect(() => {
    fetchPopularRecipes();
  }, []);

  return (
    <section className="recipes">
      <div className="flex w-full flex-col items-center justify-center gap-2 self-center">
        <div className="flex w-full flex-row items-center justify-center gap-3">
          <div className="h-[2px] w-8 bg-[var(--theme1)] md:w-16"></div>
          <span className="font-lato text-center text-2xl font-bold text-neutral-800 xsm:text-4xl">
            Most Popular Recipes
          </span>
          <div className="h-[2px] w-8 bg-[var(--theme1)] md:w-16"></div>
        </div>
      </div>

      <div className="flex w-full items-center justify-center">
        <div className="w-full max-w-screen-xl px-10">
          <Carousel>
            <CarouselContent className="-ml-1">
              {loadingRecipes
                ? Array.from({ length: 8 }, (_, index) => (
                    <CarouselItem
                      key={index}
                      className="flex w-full pl-1 min-[500px]:basis-1/2 md:basis-1/3 min-[940px]:basis-1/4 lg:basis-1/5"
                    >
                      <div className="flex w-full p-2">
                        <SkeletonRecipeCard key={index} className="w-full" />
                      </div>
                    </CarouselItem>
                  ))
                : recipes.map((recipe, index) => (
                    <CarouselItem
                      key={index}
                      className="flex w-full pl-1 min-[500px]:basis-1/2 md:basis-1/3 min-[940px]:basis-1/4 lg:basis-1/5"
                    >
                      <div className="flex w-full p-2">
                        <RecipeCard
                          className="w-full"
                          recipe={recipe}
                          accepted={true}
                          openRecipe={(id) => {
                            ChangeUrl(`/recipes/${id}`);
                          }}
                        />
                      </div>
                    </CarouselItem>
                  ))}
            </CarouselContent>
            <CarouselPrevious className="-left-8 border-0 text-xl" />
            <CarouselNext className="-right-8 border-0 text-xl" />
          </Carousel>
        </div>
      </div>
    </section>
  );
};

export default FeaturedRecipes;
