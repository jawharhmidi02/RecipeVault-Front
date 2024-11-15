"use client";
import RecipeCard from "@/components/RecipeCard/RecipeCard";
import SkeletonRecipeCard from "@/components/RecipeCard/SkeletonRecipeCard";
import { toast } from "@/hooks/use-toast";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useRef, useState, useTransition } from "react";
import countries from "@/lib/countries";
import categories from "@/lib/categories";
import difficulties from "@/lib/difficulties";
import SelectInterface from "../SelectInterface/SelectInterface";
import ScrollableSelect from "../ScrollableSelect/ScrollableSelect";
import { cn } from "@/lib/utils";
import Cookies from "js-cookie";

const Recipes = () => {
  const [loadingRecipes, setLoadingRecipes] = useState(true);
  const [recipes, setRecipesData] = useState([]);
  const [totalItem, setTotalItem] = useState(0);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const searchParams = useSearchParams();
  const searchInputPC = useRef(null);
  const router = useRouter();
  const searchQuery = searchParams.get("search") || "";
  const [isPending, startTransition] = useTransition();
  let sortOption = searchParams.get("sortOption") || "alpha";
  const [difficulty, setDifficulty] = useState(
    searchParams.get("difficutly") || "",
  );
  const [category, setCategory] = useState(searchParams.get("category") || "");
  const [sortOrder, setSortOrder] = useState(
    searchParams.get("sortOrder") || "asc",
  );
  const [cuisine, setCuisine] = useState(searchParams.get("cuisine") || "");
  const [ingredientsLocation, setIngredientsLocation] = useState(
    searchParams.get("ingredientsLocation") || "",
  );
  const [loadingPage, setLoadingPage] = useState(false);
  const [isPendingPage, startTransitionPage] = useTransition();
  const [user, setUser] = useState({});
  const [userLikes, setUserLikes] = useState([]);

  const changeSortOption = (option) => {
    sortOption = option;
  };

  const fetchRecipes = async () => {
    setLoadingRecipes(true);
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/recipes/search?${searchQuery && `title=${searchQuery}`}${searchQuery && `&tag=${searchQuery}`}${category && `&type=${category}`}${ingredientsLocation && `&ingredientsLocation=${ingredientsLocation}`}${cuisine && `&cuisineLocation=${cuisine}`}${difficulty && `&difficulty=${difficulty}`}${sortOption && `&sortBy=${sortOption}`}${sortOrder && `&sortOrder=${sortOrder}`}${page && `&page=${page}`}${limit && `&limit=${limit}`}`,
        {
          method: "GET",
        },
      );
      const data = await res.json();
      if (data.data === null) {
        throw new Error(data.message);
      }
      setRecipesData(data.data.data);
      setTotalItem(data.totalItems);
      setPage(data.currenPage);

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

  const Search = () => {
    startTransition(() => {
      router.push(
        `/recipes?${searchInputPC && `search=${searchInputPC.current.value.trim()}`}${sortOption && `&sortOption=${sortOption}`}${sortOrder && `&sortOrder=${sortOrder}`}${cuisine && `&cuisine=${cuisine}`}${ingredientsLocation && `&ingredientsLocation=${ingredientsLocation}`}${category && `&category=${category}`}${difficulty && `&difficulty=${difficulty}`}`,
      );
    });
  };

  const openRecipe = (id) => {
    startTransitionPage(() => {
      router.push(`/recipes/${id}`);
    });
  };

  const checkUserLike = async () => {
    try {
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
      setUser(data.data);

      const responseLikes = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/recipelikes/user/${data.data.id}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        },
      );
      const dataLikes = await responseLikes.json();
      if (dataLikes.data === null) {
        throw new Error(dataLikes.message);
      }
      setUserLikes(dataLikes.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    setLoadingPage(isPendingPage);
  }, [isPendingPage]);

  useEffect(() => {
    if (!isPending) {
      if (fetchRecipes) {
        fetchRecipes();
      }
    }
  }, [isPending]);

  useEffect(() => {
    checkUserLike();
  }, []);
  return (
    <div className="mx-auto flex w-full items-center justify-center">
      {loadingPage && (
        <div className="justify-cente fixed inset-0 z-50 flex h-full w-full items-center justify-center bg-white/60 backdrop-blur-sm">
          <div className="h-14 w-14 animate-spin rounded-full border-b-4 border-[var(--theme1)]"></div>
        </div>
      )}
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
              defaultValue={searchQuery}
            />
            <button
              onClick={() => {
                Search();
              }}
              type="button"
              className="mr-1 rounded-xl bg-[var(--theme1)] px-2.5 py-2 text-white transition-all duration-200 hover:scale-105 hover:bg-[var(--theme2)]"
            >
              Search
            </button>
          </div>
          <div className="grid grid-cols-1 place-content-start gap-6 md:grid-cols-2 md:place-items-start lg:grid-cols-3 min-[1500px]:grid-cols-5">
            <div className="flex w-full flex-row items-center justify-center gap-4">
              <span className="text-nowrap text-xl font-semibold">
                Sort By:
              </span>
              <SelectInterface
                placeholder="Name"
                changeSortOption={(sortOption) => {
                  changeSortOption(sortOption);
                }}
                values={[
                  ["date", "Date"],
                  ["alpha", "Name"],
                ]}
              />
            </div>
            <div className="flex w-full flex-row items-center justify-center gap-4">
              <span className="text-xl font-semibold">Cuisine: </span>
              <ScrollableSelect
                key={"cuisine"}
                state={cuisine}
                setState={setCuisine}
                label="Country"
                placeHolder="Select a cuisine.."
                items={countries}
              />
            </div>
            <div className="flex w-full flex-row items-center justify-center gap-4">
              <span className="text-nowrap text-xl font-semibold">
                Made In:{" "}
              </span>
              <ScrollableSelect
                key={"ingredientsLocation"}
                state={ingredientsLocation}
                setState={setIngredientsLocation}
                label="Country"
                placeHolder="Select ingredients location.."
                items={countries}
              />
            </div>
            <div className="flex w-full flex-row items-center justify-center gap-4">
              <span className="text-xl font-semibold">Category: </span>
              <ScrollableSelect
                key={"category"}
                state={category}
                setState={setCategory}
                label="Category"
                placeHolder="Select a category.."
                items={categories}
              />
            </div>

            <div className="col-span-1 flex w-full flex-row items-center justify-center gap-4 min-[900px]:col-span-2 min-[1500px]:col-span-1">
              <span className="text-xl font-semibold">Difficulty: </span>
              <ScrollableSelect
                key={"difficulty"}
                state={difficulty}
                setState={setDifficulty}
                label="Difficulty"
                placeHolder="Select a difficulty.."
                items={difficulties}
              />
            </div>

            <div className="flex w-full flex-row items-center justify-center gap-4 place-self-center min-[900px]:col-span-2 min-[1500px]:col-span-5">
              <button
                type="button"
                onClick={() => {
                  location.href = "/recipes";
                }}
                className="flex items-center justify-center rounded-lg bg-[var(--theme1)] px-3 py-2.5 transition-all duration-200 hover:scale-105 hover:bg-[var(--theme2)]"
              >
                <i
                  className={cn(
                    "fa-solid fa-close self-center text-xl text-white transition-all duration-200",
                  )}
                ></i>
              </button>

              <button
                type="button"
                onClick={() => {
                  sortOrder == "asc"
                    ? setSortOrder("desc")
                    : setSortOrder("asc");
                }}
                className="flex items-center justify-center rounded-lg bg-[var(--theme1)] px-3 py-2.5 transition-all duration-200 hover:scale-105 hover:bg-[var(--theme2)]"
              >
                <i
                  className={cn(
                    "fa-solid fa-arrow-up self-center text-xl text-white transition-all duration-200",
                    sortOrder == "asc" ? "rotate-0" : "rotate-180",
                  )}
                ></i>
              </button>

              <button
                onClick={() => {
                  Search();
                }}
                type="button"
                className="w-[200px] self-center justify-self-center rounded-lg bg-[var(--theme1)] px-3.5 py-2 text-xl font-semibold text-white transition-all duration-200 hover:scale-[1.02] hover:bg-[var(--theme2)]"
              >
                Apply
              </button>
            </div>
          </div>

          <div className="mt-2 grid w-full grid-cols-1 gap-8 min-[800px]:grid-cols-2 xl:grid-cols-3 min-[1580px]:grid-cols-4">
            {loadingRecipes
              ? Array.from({ length: 10 }).map((_, index) => (
                  <SkeletonRecipeCard key={index} />
                ))
              : recipes.map((recipe, index) => (
                  <RecipeCard
                    key={index}
                    recipe={recipe}
                    openRecipe={(id) => {
                      openRecipe(id);
                    }}
                    liked={userLikes.some(
                      (like) => like.recipe.id === recipe.id,
                    )}
                  />
                ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Recipes;
