import React from "react";
import { cn } from "@/lib/utils";
import RecipeCard from "../RecipeCard/RecipeCard";

const RejectedRecipes = ({ user }) => {
  const recipes = [
    {
      title: "Grilled Salmon",
      img: "/images/Recipe1.jpg",
      cuisineLocation: "Brazil",
      ingredientsLocation: "Tunis",
      likes: 1500,
      reason: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolor maiores eos repellat a placeat. Porro possimus a dicta quam deserunt nam soluta ut! Adipisci, corrupti. Quam mollitia optio nulla eum maiores minus laboriosam dolorem. Nulla cupiditate deserunt ratione quo qui."
    },
    {
      title: "Grilled Salmon",
      img: "/images/Recipe1.jpg",
      cuisineLocation: "Brazil",
      ingredientsLocation: "Tunis",
      likes: 1500,
      reason: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolor maiores eos repellat a placeat. Porro possimus a dicta quam deserunt nam soluta ut! Adipisci, corrupti. Quam mollitia optio nulla eum maiores minus laboriosam dolorem. Nulla cupiditate deserunt ratione quo qui."
    },
    {
      title: "Grilled Salmon",
      img: "/images/Recipe1.jpg",
      cuisineLocation: "Brazil",
      ingredientsLocation: "Tunis",
      likes: 1500,
      reason: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolor maiores eos repellat a placeat. Porro possimus a dicta quam deserunt nam soluta ut! Adipisci, corrupti. Quam mollitia optio nulla eum maiores minus laboriosam dolorem. Nulla cupiditate deserunt ratione quo qui."
    },
    {
      title: "Grilled Salmon",
      img: "/images/Recipe1.jpg",
      cuisineLocation: "Brazil",
      ingredientsLocation: "Tunis",
      likes: 1500,
      reason: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolor maiores eos repellat a placeat. Porro possimus a dicta quam deserunt nam soluta ut! Adipisci, corrupti. Quam mollitia optio nulla eum maiores minus laboriosam dolorem. Nulla cupiditate deserunt ratione quo qui."
    },
    {
      title: "Grilled Salmon",
      img: "/images/Recipe1.jpg",
      cuisineLocation: "Brazil",
      ingredientsLocation: "Tunis",
      likes: 1500,
      reason: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolor maiores eos repellat a placeat. Porro possimus a dicta quam deserunt nam soluta ut! Adipisci, corrupti. Quam mollitia optio nulla eum maiores minus laboriosam dolorem. Nulla cupiditate deserunt ratione quo qui."
    },
    {
      title: "Grilled Salmon",
      img: "/images/Recipe1.jpg",
      cuisineLocation: "Brazil",
      ingredientsLocation: "Tunis",
      likes: 1500,
      reason: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolor maiores eos repellat a placeat. Porro possimus a dicta quam deserunt nam soluta ut! Adipisci, corrupti. Quam mollitia optio nulla eum maiores minus laboriosam dolorem. Nulla cupiditate deserunt ratione quo qui."
    },
    {
      title: "Grilled Salmon",
      img: "/images/Recipe1.jpg",
      cuisineLocation: "Brazil",
      ingredientsLocation: "Tunis",
      likes: 1500,
      reason: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolor maiores eos repellat a placeat. Porro possimus a dicta quam deserunt nam soluta ut! Adipisci, corrupti. Quam mollitia optio nulla eum maiores minus laboriosam dolorem. Nulla cupiditate deserunt ratione quo qui."
    },
    {
      title: "Grilled Salmon",
      img: "/images/Recipe1.jpg",
      cuisineLocation: "Brazil",
      ingredientsLocation: "Tunis",
      likes: 1500,
      reason: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolor maiores eos repellat a placeat. Porro possimus a dicta quam deserunt nam soluta ut! Adipisci, corrupti. Quam mollitia optio nulla eum maiores minus laboriosam dolorem. Nulla cupiditate deserunt ratione quo qui."
    },
    {
      title: "Grilled Salmon",
      img: "/images/Recipe1.jpg",
      cuisineLocation: "Brazil",
      ingredientsLocation: "Tunis",
      likes: 1500,
      reason: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolor maiores eos repellat a placeat. Porro possimus a dicta quam deserunt nam soluta ut! Adipisci, corrupti. Quam mollitia optio nulla eum maiores minus laboriosam dolorem. Nulla cupiditate deserunt ratione quo qui."
    },
    {
      title: "Grilled Salmon",
      img: "/images/Recipe1.jpg",
      cuisineLocation: "Brazil",
      ingredientsLocation: "Tunis",
      likes: 1500,
      reason: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolor maiores eos repellat a placeat. Porro possimus a dicta quam deserunt nam soluta ut! Adipisci, corrupti. Quam mollitia optio nulla eum maiores minus laboriosam dolorem. Nulla cupiditate deserunt ratione quo qui."
    },
  ];
  return (
    <div className="grid gap-6 w-full grid-cols-1 md:grid-cols-2">
      { recipes.map((recipe, index) => (
        <RecipeCard key={index} recipe={recipe} accepted={false}/>
      ))}
    </div>
  );
};



export default RejectedRecipes;
