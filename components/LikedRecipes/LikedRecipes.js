import React from "react";
import RecipeCard from "../RecipeCard/RecipeCard";
import { cn } from "@/lib/utils";

const LikedRecipes = ({ user }) => {
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
  return (
    <div
      className={cn(
        "grid w-full gap-6 min-[450px]:grid-cols-2 md:grid-cols-3 lg:grid-cols-4",
      )}
    >
      {recipes.map((recipe, index) => (
        <RecipeCard key={index} recipe={recipe} accepted={true} />
      ))}
    </div>
  );
};

export default LikedRecipes;
