import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import RecipeCard from "../RecipeCard/RecipeCard";
import SkeletonRecipeCard from "../RecipeCard/SkeletonRecipeCard";
import { toast } from "@/hooks/use-toast";

const PendingRecipes = ({ user }) => {
  const [recipes, setRecipes] = useState([]);
  const [loadingRecipes, setLoadingRecipes] = useState(true);

  // const recipes = [
  //   {
  //     title: "Grilled Salmon",
  //     img: "/images/Recipe1.jpg",
  //     cuisineLocation: "Brazil",
  //     ingredientsLocation: "Tunis",
  //     likes: 1500,
  //   },
  //   {
  //     title: "Grilled Salmon",
  //     img: "/images/Recipe1.jpg",
  //     cuisineLocation: "Brazil",
  //     ingredientsLocation: "Tunis",
  //     likes: 1500,
  //   },
  //   {
  //     title: "Grilled Salmon",
  //     img: "/images/Recipe1.jpg",
  //     cuisineLocation: "Brazil",
  //     ingredientsLocation: "Tunis",
  //     likes: 1500,
  //   },
  //   {
  //     title: "Grilled Salmon",
  //     img: "/images/Recipe1.jpg",
  //     cuisineLocation: "Brazil",
  //     ingredientsLocation: "Tunis",
  //     likes: 1500,
  //   },
  //   {
  //     title: "Grilled Salmon",
  //     img: "/images/Recipe1.jpg",
  //     cuisineLocation: "Brazil",
  //     ingredientsLocation: "Tunis",
  //     likes: 1500,
  //   },
  //   {
  //     title: "Grilled Salmon",
  //     img: "/images/Recipe1.jpg",
  //     cuisineLocation: "Brazil",
  //     ingredientsLocation: "Tunis",
  //     likes: 1500,
  //   },
  //   {
  //     title: "Grilled Salmon",
  //     img: "/images/Recipe1.jpg",
  //     cuisineLocation: "Brazil",
  //     ingredientsLocation: "Tunis",
  //     likes: 1500,
  //   },
  //   {
  //     title: "Grilled Salmon",
  //     img: "/images/Recipe1.jpg",
  //     cuisineLocation: "Brazil",
  //     ingredientsLocation: "Tunis",
  //     likes: 1500,
  //   },
  //   {
  //     title: "Grilled Salmon",
  //     img: "/images/Recipe1.jpg",
  //     cuisineLocation: "Brazil",
  //     ingredientsLocation: "Tunis",
  //     likes: 1500,
  //   },
  //   {
  //     title: "Grilled Salmon",
  //     img: "/images/Recipe1.jpg",
  //     cuisineLocation: "Brazil",
  //     ingredientsLocation: "Tunis",
  //     likes: 1500,
  //   },
  // ];

  const fetchUserPendingRecipes = async () => {
    setLoadingRecipes(true);
    if (user.id) {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/recipes/pending/byuserid/${user.id}`,
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
    fetchUserPendingRecipes();
  }, [user]);

  return (
    <div
      className={cn(
        "grid w-full gap-6 min-[450px]:grid-cols-2 md:grid-cols-3 lg:grid-cols-4",
      )}
    >
      {loadingRecipes ? (
        Array.from({ length: 6 }, (_, index) => (
          <SkeletonRecipeCard key={index} />
        ))
      ) : recipes.length === 0 ? (
        <div className="col-span-full flex w-full flex-col items-center justify-center gap-4">
          <div className="flex flex-col items-center justify-center gap-4">
            <div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="80"
                height="80"
                fill="#262626"
                className="bi bi-slash-circle"
                viewBox="0 0 16 16"
              >
                <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16" />
                <path d="M11.354 4.646a.5.5 0 0 0-.708 0l-6 6a.5.5 0 0 0 .708.708l6-6a.5.5 0 0 0 0-.708" />
              </svg>
            </div>
            <div className="text-2xl font-semibold text-neutral-800">
              No Recipes Found
            </div>
          </div>
        </div>
      ) : (
        recipes.map((recipe, index) => (
          <RecipeCard
            key={index}
            recipe={recipe}
            accepted={false}
            pending={true}
          />
        ))
      )}
    </div>
  );
};

export default PendingRecipes;
