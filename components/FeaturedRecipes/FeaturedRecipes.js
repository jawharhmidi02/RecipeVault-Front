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

const FeaturedRecipes = ({ lng }) => {
  const router = useRouter();
  const recipes = [
    {
      id: 123456,
      title: "Grilled Salmon",
      img: "/images/Recipe1.jpg",
      cuisineLocation: "Tunis",
      ingredientsLocation: "Tunis",
      likes: 150,
    },
    {
      id: 123456,
      title: "Grilled Salmon",
      img: "/images/Recipe1.jpg",
      cuisineLocation: "Tunis",
      ingredientsLocation: "Tunis",
      likes: 150,
    },
    {
      id: 123456,
      title: "Grilled Salmon",
      img: "/images/Recipe1.jpg",
      cuisineLocation: "Tunis",
      ingredientsLocation: "Tunis",
      likes: 150,
    },
    {
      id: 123456,
      title: "Grilled Salmon",
      img: "/images/Recipe1.jpg",
      cuisineLocation: "Tunis",
      ingredientsLocation: "Tunis",
      likes: 150,
    },
    {
      id: 123456,
      title: "Grilled Salmon",
      img: "/images/Recipe1.jpg",
      cuisineLocation: "Tunis",
      ingredientsLocation: "Tunis",
      likes: 150,
    },
    {
      id: 123456,
      title: "Grilled Salmon",
      img: "/images/Recipe1.jpg",
      cuisineLocation: "Tunis",
      ingredientsLocation: "Tunis",
      likes: 150,
    },
    {
      id: 123456,
      title: "Grilled Salmon",
      img: "/images/Recipe1.jpg",
      cuisineLocation: "Tunis",
      ingredientsLocation: "Tunis",
      likes: 150,
    },
    {
      id: 123456,
      title: "Grilled Salmon",
      img: "/images/Recipe1.jpg",
      cuisineLocation: "Tunis",
      ingredientsLocation: "Tunis",
      likes: 150,
    },
    {
      id: 123456,
      title: "Grilled Salmon",
      img: "/images/Recipe1.jpg",
      cuisineLocation: "Tunis",
      ingredientsLocation: "Tunis",
      likes: 150,
    },
    {
      id: 123456,
      title: "Grilled Salmon",
      img: "/images/Recipe1.jpg",
      cuisineLocation: "Tunis",
      ingredientsLocation: "Tunis",
      likes: 150,
    },
  ];

  return (
    <section className="mt-7">
      <div className="flex w-full flex-col items-center justify-center gap-2 self-center mb-7">
        <div className="flex w-full flex-row items-center justify-center gap-3">
          <div className="h-[2px] w-8 bg-[var(--theme1)] md:w-16"></div>
          <span className="font-lato text-center font-bold text-neutral-800 text-2xl xsm:text-4xl">
            Most Popular Recipes
          </span>
          <div className="h-[2px] w-8 bg-[var(--theme1)] md:w-16"></div>
        </div>
      </div>

      <div className="flex w-full items-center justify-center">
        <div className="w-full max-w-screen-xl px-10">
          <Carousel>
            <CarouselContent className="-ml-1">
              {recipes.map((recipe, index) => (
                <CarouselItem
                  key={index}
                  className="flex w-full pl-1 min-[500px]:basis-1/2 md:basis-1/3 lg:basis-1/4"
                >
                  <div className="flex w-full p-2">
                    <RecipeCard
                      className="w-full"
                      recipe={recipe}
                      accepted={true}
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
