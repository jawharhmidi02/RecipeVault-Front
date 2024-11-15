import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import RecipeCard from "../RecipeCard/RecipeCard";
import SkeletonRecipeCard from "../RecipeCard/SkeletonRecipeCard";
import { toast } from "@/hooks/use-toast";

const RejectedRecipes = ({ user }) => {
  const [recipes, setRecipes] = useState([]);
  const [loadingRecipes, setLoadingRecipes] = useState(true);

  const fetchUserRejectedRecipes = async () => {
    setLoadingRecipes(true);
    if (user.id) {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/recipes/rejected/byuserid/${user.id}`,
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
    }
  };

  useEffect(() => {
    fetchUserRejectedRecipes();
  }, [user]);

  // const recipes = [
  //   {
  //     title: "Grilled Salmon",
  //     img: "/images/Recipe1.jpg",
  //     cuisineLocation: "Brazil",
  //     ingredientsLocation: "Tunis",
  //     likes: 1500,
  //     rejection_reason:
  //       "Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolor maiores eos repellat a placeat. Porro possimus a dicta quam deserunt nam soluta ut! Adipisci, corrupti. Quam mollitia optio nulla eum maiores minus laboriosam dolorem. Nulla cupiditate deserunt ratione quo qui.",
  //   },
  //   {
  //     title: "Grilled Salmon",
  //     img: "/images/Recipe1.jpg",
  //     cuisineLocation: "Brazil",
  //     ingredientsLocation: "Tunis",
  //     likes: 1500,
  //     rejection_reason:
  //       "Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolor maiores eos repellat a placeat. Porro possimus a dicta quam deserunt nam soluta ut! Adipisci, corrupti. Quam mollitia optio nulla eum maiores minus laboriosam dolorem. Nulla cupiditate deserunt ratione quo qui.",
  //   },
  //   {
  //     title: "Grilled Salmon",
  //     img: "/images/Recipe1.jpg",
  //     cuisineLocation: "Brazil",
  //     ingredientsLocation: "Tunis",
  //     likes: 1500,
  //     rejection_reason:
  //       "Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolor maiores eos repellat a placeat. Porro possimus a dicta quam deserunt nam soluta ut! Adipisci, corrupti. Quam mollitia optio nulla eum maiores minus laboriosam dolorem. Nulla cupiditate deserunt ratione quo qui.",
  //   },
  //   {
  //     title: "Grilled Salmon",
  //     img: "/images/Recipe1.jpg",
  //     cuisineLocation: "Brazil",
  //     ingredientsLocation: "Tunis",
  //     likes: 1500,
  //     rejection_reason:
  //       "Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolor maiores eos repellat a placeat. Porro possimus a dicta quam deserunt nam soluta ut! Adipisci, corrupti. Quam mollitia optio nulla eum maiores minus laboriosam dolorem. Nulla cupiditate deserunt ratione quo qui.",
  //   },
  //   {
  //     title: "Grilled Salmon",
  //     img: "/images/Recipe1.jpg",
  //     cuisineLocation: "Brazil",
  //     ingredientsLocation: "Tunis",
  //     likes: 1500,
  //     rejection_reason:
  //       "Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolor maiores eos repellat a placeat. Porro possimus a dicta quam deserunt nam soluta ut! Adipisci, corrupti. Quam mollitia optio nulla eum maiores minus laboriosam dolorem. Nulla cupiditate deserunt ratione quo qui.",
  //   },
  //   {
  //     title: "Grilled Salmon",
  //     img: "/images/Recipe1.jpg",
  //     cuisineLocation: "Brazil",
  //     ingredientsLocation: "Tunis",
  //     likes: 1500,
  //     rejection_reason:
  //       "Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolor maiores eos repellat a placeat. Porro possimus a dicta quam deserunt nam soluta ut! Adipisci, corrupti. Quam mollitia optio nulla eum maiores minus laboriosam dolorem. Nulla cupiditate deserunt ratione quo qui.",
  //   },
  //   {
  //     title: "Grilled Salmon",
  //     img: "/images/Recipe1.jpg",
  //     cuisineLocation: "Brazil",
  //     ingredientsLocation: "Tunis",
  //     likes: 1500,
  //     rejection_reason:
  //       "Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolor maiores eos repellat a placeat. Porro possimus a dicta quam deserunt nam soluta ut! Adipisci, corrupti. Quam mollitia optio nulla eum maiores minus laboriosam dolorem. Nulla cupiditate deserunt ratione quo qui.",
  //   },
  //   {
  //     title: "Grilled Salmon",
  //     img: "/images/Recipe1.jpg",
  //     cuisineLocation: "Brazil",
  //     ingredientsLocation: "Tunis",
  //     likes: 1500,
  //     rejection_reason:
  //       "Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolor maiores eos repellat a placeat. Porro possimus a dicta quam deserunt nam soluta ut! Adipisci, corrupti. Quam mollitia optio nulla eum maiores minus laboriosam dolorem. Nulla cupiditate deserunt ratione quo qui.",
  //   },
  //   {
  //     title: "Grilled Salmon",
  //     img: "/images/Recipe1.jpg",
  //     cuisineLocation: "Brazil",
  //     ingredientsLocation: "Tunis",
  //     likes: 1500,
  //     rejection_reason:
  //       "Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolor maiores eos repellat a placeat. Porro possimus a dicta quam deserunt nam soluta ut! Adipisci, corrupti. Quam mollitia optio nulla eum maiores minus laboriosam dolorem. Nulla cupiditate deserunt ratione quo qui.",
  //   },
  //   {
  //     title: "Grilled Salmon",
  //     img: "/images/Recipe1.jpg",
  //     cuisineLocation: "Brazil",
  //     ingredientsLocation: "Tunis",
  //     likes: 1500,
  //     rejection_reason:
  //       "Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolor maiores eos repellat a placeat. Porro possimus a dicta quam deserunt nam soluta ut! Adipisci, corrupti. Quam mollitia optio nulla eum maiores minus laboriosam dolorem. Nulla cupiditate deserunt ratione quo qui.",
  //   },
  // ];
  return (
    <div className="grid w-full grid-cols-1 gap-6 md:grid-cols-2">
      {loadingRecipes ? (
        Array.from({ length: 6 }, (_, index) => (
          <SkeletonRecipeCard key={index} />
        ))
      ) : recipes.length === 0 ? (
        <div className="flex w-full flex-col items-center justify-center gap-4">
          <div className="text-2xl font-semibold text-neutral-800">
            No Recipes Found
          </div>
        </div>
      ) : (
        recipes.map((recipe, index) => (
          <RecipeCard key={index} recipe={recipe} accepted={false} />
        ))
      )}
    </div>
  );
};

export default RejectedRecipes;
