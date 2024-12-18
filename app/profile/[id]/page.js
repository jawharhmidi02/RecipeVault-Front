"use client";
import React from "react";
import { cn } from "@/lib/utils";
import { useState, useEffect, useRef, useTransition } from "react";
import { useParams, usePathname, useRouter } from "next/navigation";
import Cookies from "js-cookie";
import RecipeCard from "@/components/RecipeCard/RecipeCard";
import SkeletonRecipeCard from "@/components/RecipeCard/SkeletonRecipeCard";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

const page = () => {
  const params = useParams();
  const id = params.id;
  const router = useRouter();
  const pathname = usePathname();
  const [loadingRecipes, setLoadingRecipes] = useState(true);
  const [recipes, setRecipes] = useState([]);
  const [loadingUser, setLoadingUser] = useState(true);
  const [loadingPage, setLoadingPage] = useState(true);
  const [isPending, startTransition] = useTransition();
  const [user, setUser] = useState({});

  const fetchUser = async () => {
    try {
      setLoadingUser(true);

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/users/profile/${id}`,
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

      setLoadingUser(false);
      setUser(data.data);
    } catch (error) {
      setLoadingUser(false);
      toast({
        title: "Error",
        description: "Something went wrong, Please Try Again!",
        variant: "destructive",
      });
    }
    setLoadingUser(false);
  };

  const fetchUserRecipes = async () => {
    if (user.id) {
      setLoadingRecipes(true);
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/recipes/byuserid/${user.id}?page=${CurrentPage}&limit=${limit}`,
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
        setTotalItems(data.data.totalItems);
        setTotalPages(data.data.totalPages);
        setCurrentPage(Number(data.data.currentPage));

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

  const openRecipe = (id) => {
    startTransition(() => {
      router.push(`/recipes/${id}`);
    });
  };

  useEffect(() => {
    fetchUser();
  }, []);

  useEffect(() => {
    fetchUserRecipes();
  }, [user]);

  useEffect(() => {
    setLoadingPage(isPending);
  }, [isPending]);

  const [totalItems, setTotalItems] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [CurrentPage, setCurrentPage] = useState(1);
  const [limit, setLimit] = useState(8);
  const maxVisiblePages = 5;
  const [pages, setPages] = useState([]);

  const handlePageChange = (page) => {
    if (page > 0 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const createPageNumbers = () => {
    let startPage = Math.max(1, CurrentPage - Math.floor(maxVisiblePages / 2));
    let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

    if (endPage - startPage + 1 < maxVisiblePages) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }

    const newPages = [];
    for (let i = startPage; i <= endPage; i++) {
      newPages.push(i);
    }

    setPages(newPages);
  };

  useEffect(() => {
    fetchUserRecipes();
  }, [CurrentPage]);

  useEffect(() => {
    createPageNumbers();
  }, [CurrentPage, totalPages]);

  return (
    <div className="mx-auto flex w-full items-center justify-center">
      {loadingPage && (
        <div className="fixed inset-0 z-50 flex h-full w-full items-center justify-center bg-white/60 backdrop-blur-sm">
          <div className="h-14 w-14 animate-spin rounded-full border-b-4 border-[var(--theme1)]"></div>
        </div>
      )}
      <div className="mx-6 mt-12 flex w-full max-w-[900px] flex-col items-center gap-8">
        <div className="flex w-full flex-row justify-center gap-6">
          <div className="grid size-[130px] place-items-center rounded-full bg-neutral-200 shadow-md sm:size-[200px]">
            <i className="fa-solid fa-user text-6xl text-neutral-400 sm:text-7xl"></i>
          </div>
          <div className="flex flex-col justify-center gap-4">
            <div className="text-2xl font-semibold text-neutral-800 sm:text-3xl">
              {user.full_name}
            </div>

            <div className={cn("block")}>
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
          <div className="flex w-full flex-col items-center justify-between gap-2 pt-8 sm:pt-0">
            <span className="hidden font-light sm:block">Recipes</span>
            <div className={cn("h-1.5 w-full bg-[var(--theme2)]")}></div>
          </div>
        </div>

        <div className="text-4xl font-semibold text-[var(--theme1)]">
          {`${user.full_name}'s Recipes`}
        </div>

        {/* MENU TITLE DONE */}

        {/* YOUR RECIPES COMPONENT BELOW */}

        <div
          className={cn(
            "grid w-full gap-6 min-[450px]:grid-cols-2 md:grid-cols-3 lg:grid-cols-4",
          )}
        >
          {loadingRecipes ? (
            Array.from({ length: limit }, (_, index) => (
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
                accepted={true}
                openRecipe={(id) => {
                  openRecipe(id);
                }}
              />
            ))
          )}
          {!loadingRecipes && recipes.length > 0 && (
            <Pagination className="col-span-full">
              <PaginationContent className="flex items-center justify-center gap-2">
                <PaginationItem>
                  <PaginationPrevious
                    className={cn(
                      "rounded-md px-3 py-2 transition-all duration-200 hover:cursor-pointer",
                      CurrentPage === 1
                        ? " hover:cursor-not-allowed"
                        : "bg-white text-black hover:bg-[#fbbf24] hover:text-white",
                    )}
                    onClick={() => handlePageChange(CurrentPage - 1)}
                    disabled={CurrentPage === 1}
                  />
                </PaginationItem>

                {pages[0] > 1 && (
                  <>
                    <PaginationItem>
                      <PaginationLink
                        className="hover:cursor-pointerrounded-md bg-white px-3 py-2 text-black transition-all duration-200 hover:bg-[#fbbf24] hover:text-white"
                        onClick={() => handlePageChange(1)}
                      >
                        1
                      </PaginationLink>
                    </PaginationItem>
                    {pages[0] > 2 && <PaginationEllipsis />}
                  </>
                )}

                {pages.map((page) => (
                  <PaginationItem key={page}>
                    <PaginationLink
                      className={cn(
                        "duration- rounded-md px-3 py-2 transition-all hover:cursor-pointer",
                        page === CurrentPage
                          ? "bg-[#fbbf24] text-white"
                          : "bg-white text-black hover:bg-[#fbbf24] hover:text-white",
                      )}
                      isActive={page === CurrentPage}
                      onClick={() => handlePageChange(page)}
                    >
                      {page}
                    </PaginationLink>
                  </PaginationItem>
                ))}

                {pages[pages.length - 1] < totalPages && (
                  <>
                    {pages[pages.length - 1] < totalPages - 1 && (
                      <PaginationEllipsis />
                    )}
                    <PaginationItem>
                      <PaginationLink
                        className="rounded-md bg-white px-3 py-2 text-black transition-all duration-200 hover:cursor-pointer hover:bg-[#fbbf24] hover:text-white"
                        onClick={() => handlePageChange(totalPages)}
                      >
                        {totalPages}
                      </PaginationLink>
                    </PaginationItem>
                  </>
                )}

                <PaginationItem>
                  <PaginationNext
                    className={cn(
                      "rounded-md px-3 py-2 transition-all duration-200 hover:cursor-pointer",
                      CurrentPage === totalPages
                        ? " hover:cursor-not-allowed"
                        : "bg-white text-black hover:bg-[#fbbf24] hover:text-white",
                    )}
                    onClick={() => handlePageChange(CurrentPage + 1)}
                    disabled={CurrentPage === totalPages}
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          )}
        </div>

        {/* YOUR RECIPES COMPONENT DONE */}
      </div>
    </div>
  );
};

export default page;
