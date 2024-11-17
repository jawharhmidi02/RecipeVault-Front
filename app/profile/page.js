"use client";
import React from "react";
import { cn } from "@/lib/utils";
import { useState, useEffect, useRef, useTransition } from "react";
import { usePathname, useRouter } from "next/navigation";
import Cookies from "js-cookie";
import RecipeCard from "@/components/RecipeCard/RecipeCard";
import PendingRecipes from "@/components/PendingRecipes/PendingRecipes";
import RejectedRecipes from "@/components/RejectedRecipes/RejectedRecipes";
import RecipeRequests from "@/components/RecipeRequests/RecipeRequests";
import { toast } from "@/hooks/use-toast";
import { Skeleton } from "@/components/ui/skeleton";
import SkeletonRecipeCard from "@/components/RecipeCard/SkeletonRecipeCard";
import ApplicationRequests from "@/components/ApplicationRequests/ApplicationRequests";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import LikedRecipes from "@/components/LikedRecipes/LikedRecipes";
import SpecialistsOverview from "@/components/SpecialistsOverview/SpecialistsOverview";

const page = () => {
  const router = useRouter();
  const pathname = usePathname();
  const [loadingUser, setLoadingUser] = useState(true);
  const [signed, setSigned] = useState(false);
  const [loadingPage, setLoadingPage] = useState(true);
  const [isPending, startTransition] = useTransition();
  const [menuState, setMenuState] = useState("Your Recipes");
  const [user, setUser] = useState({});
  const [recipes, setRecipes] = useState([]);
  const [loadingRecipes, setLoadingRecipes] = useState(true);

  const parseRole = (role) => {
    if (role === "admin") {
      return "Admin";
    } else if (role === "client") {
      return "Normal User ";
    } else {
      return "Specialist";
    }
  };

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
      setUser(data.data);
      if (data.data.role === "admin") {
        setMenuState("Application Requests");
      }

      fetchUserRecipes();
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
    setLoadingRecipes(true);
    if (user.id) {
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

  useEffect(() => {
    fetchUser();
    setLoadingPage(false);
  }, []);

  const openRecipe = (url) => {
    startTransition(() => {
      router.push(`/recipes/${url}`);
    });
  };

  const openURL = (url) => {
    startTransition(() => {
      router.push(url);
    });
  };

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
        <div className="flex w-full flex-row gap-6">
          <div className="grid size-[130px] place-items-center rounded-full bg-neutral-200 shadow-md sm:size-[200px]">
            <i className="fa-solid fa-user text-6xl text-neutral-400 sm:text-7xl"></i>
          </div>
          <div className="flex flex-col justify-center gap-4">
            <div className="text-2xl font-semibold text-neutral-800 sm:text-3xl">
              {user.full_name}
            </div>

            <div className={cn("block")}>
              <div className="text-xl font-light text-neutral-500">
                {parseRole(user.role)}
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
            onClick={() => setMenuState("Your Recipes")}
            className={cn(
              "flex w-full flex-col items-center justify-between gap-2 pt-8 transition-all duration-100 hover:scale-[1.03] hover:cursor-pointer sm:pt-0",
              user.role === "admin" && "hidden",
            )}
          >
            <span className="hidden font-light sm:block">Your Recipes</span>
            <div
              className={cn(
                "h-1.5 w-full bg-stone-300",
                menuState == "Your Recipes" && "bg-[var(--theme2)]",
              )}
            ></div>
          </div>
          <div
            onClick={() => setMenuState("Pending Recipes")}
            className={cn(
              "flex w-full flex-col items-center justify-between gap-2 pt-8 transition-all duration-100 hover:scale-[1.03] hover:cursor-pointer sm:pt-0",
              user.role != "client" && "hidden",
            )}
          >
            <span className="hidden font-light sm:block">Pending Recipes</span>
            <div
              className={cn(
                "h-1.5 w-full bg-stone-300",
                menuState == "Pending Recipes" && "bg-[var(--theme2)]",
              )}
            ></div>
          </div>
          <div
            onClick={() => setMenuState("Rejected Recipes")}
            className={cn(
              "flex w-full flex-col items-center justify-between gap-2 pt-8 transition-all duration-100 hover:scale-[1.03] hover:cursor-pointer sm:pt-0",
              user.role != "client" && "hidden",
            )}
          >
            <span className="hidden font-light sm:block">Rejected Recipes</span>
            <div
              className={cn(
                "h-1.5 w-full bg-stone-300",
                menuState == "Rejected Recipes" && "bg-[var(--theme2)]",
              )}
            ></div>
          </div>
          <div
            onClick={() => setMenuState("Recipe Requests")}
            className={cn(
              "flex w-full flex-col items-center justify-between gap-2 pt-8 transition-all duration-100 hover:scale-[1.03] hover:cursor-pointer sm:pt-0",
              user.role != "specialist" && "hidden",
            )}
          >
            <span className="hidden font-light sm:block">Recipe Requests</span>
            <div
              className={cn(
                "h-1.5 w-full bg-stone-300",
                menuState == "Recipe Requests" && "bg-[var(--theme2)]",
              )}
            ></div>
          </div>
          <div
            onClick={() => setMenuState("Liked Recipes")}
            className={cn(
              "flex w-full flex-col items-center justify-between gap-2 pt-8 transition-all duration-100 hover:scale-[1.03] hover:cursor-pointer sm:pt-0",
              user.role === "admin" && "hidden",
            )}
          >
            <span className="hidden font-light sm:block">Liked Recipes</span>
            <div
              className={cn(
                "h-1.5 w-full bg-stone-300",
                menuState == "Liked Recipes" && "bg-[var(--theme2)]",
              )}
            ></div>
          </div>

          <div
            onClick={() => setMenuState("Specialists Overview")}
            className={cn(
              "flex w-full flex-col items-center justify-between gap-2 pt-8 transition-all duration-100 hover:scale-[1.03] hover:cursor-pointer sm:pt-0",
              user.role != "admin" && "hidden",
            )}
          >
            <span className="hidden font-light sm:block">
            Specialists Overview
            </span>
            <div
              className={cn(
                "h-1.5 w-full bg-stone-300",
                menuState == "Specialists Overview" && "bg-[var(--theme2)]",
              )}
            ></div>
          </div>

          <div
            onClick={() => setMenuState("Application Requests")}
            className={cn(
              "flex w-full flex-col items-center justify-between gap-2 pt-8 transition-all duration-100 hover:scale-[1.03] hover:cursor-pointer sm:pt-0",
              user.role != "admin" && "hidden",
            )}
          >
            <span className="hidden font-light sm:block">
              Application Requests
            </span>
            <div
              className={cn(
                "h-1.5 w-full bg-stone-300",
                menuState == "Application Requests" && "bg-[var(--theme2)]",
              )}
            ></div>
          </div>
        </div>

        {/* PROFILE MENU DONE */}

        {/* MENU TITLE */}

        <div className="text-center text-4xl font-semibold text-[var(--theme1)]">
          {menuState}
        </div>

        {/* MENU TITLE DONE */}

        {/* YOUR RECIPES COMPONENT BELOW */}
        {user.role != "admin" && (
          <div
            className={cn(
              "grid w-full gap-6 min-[450px]:grid-cols-2 md:grid-cols-3 lg:grid-cols-4",
              menuState != "Your Recipes" && "hidden",
            )}
          >
            <div
              onClick={() => {
                openURL("/profile/create-recipe");
              }}
              className="flex h-full min-h-[250px] flex-col items-center justify-center rounded-xl bg-amber-50 px-4 shadow-md transition-all duration-200 hover:scale-105 hover:cursor-pointer"
            >
              <div className="flex flex-col items-center justify-center gap-5">
                <div className="grid size-[40px] place-items-center rounded-full border-2 border-[var(--theme2)] text-2xl font-bold text-[var(--theme2)]">
                  <div>+</div>
                </div>
                <div className="font-semibold text-[var(--theme2)]">
                  Create a new recipe
                </div>
              </div>
            </div>
            {loadingRecipes ? (
              Array.from({ length: limit }, (_, index) => (
                <SkeletonRecipeCard key={index} />
              ))
            ) : recipes.length === 0 ? (
              <div className="col-span-1 md:col-span-2 lg:col-span-3 text-center flex w-full flex-col items-center justify-center gap-4">
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
                  openRecipe={(url) => {
                    openRecipe(url);
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
        )}

        {/* YOUR RECIPES COMPONENT DONE */}

        {/* PENDING RECIPES COMP BELOW */}

        <div
          className={cn(
            "flex w-full",
            menuState != "Pending Recipes" && "hidden",
          )}
        >
          {user.role === "client" && <PendingRecipes user={user} />}
        </div>

        {/* PENDING RECIPES COMP DONE */}

        {/* REJECTED RECIPES COMP BELOW */}

        <div
          className={cn(
            "flex w-full",
            menuState != "Rejected Recipes" && "hidden",
          )}
        >
          {user.role === "client" && <RejectedRecipes user={user} />}
        </div>

        {/* REJECTED RECIPES COMP DONE */}

        {/* RECIPE REQUESTS COMP BELOW  */}

        <div
          className={cn(
            "flex w-full",
            menuState != "Recipe Requests" && "hidden",
          )}
        >
          {user.role === "specialist" && <RecipeRequests user={user} />}
        </div>

        {/* RECIPE REQUESTS COMP DONE */}

        {/* LIKED RECIPES COMP BELOW */}

        <div
          className={cn(
            "flex w-full",
            menuState != "Liked Recipes" && "hidden",
          )}
        >
          {user.role !== "admin" && (
            <LikedRecipes
              user={user}
              openRecipe={(url) => {
                openRecipe(url);
              }}
            />
          )}
        </div>

        {/* LIKED RECIPES COMP DONE */}


        {/* Specialists Overview Comp  BELOW */}

        <div
          className={cn(
            "flex w-full",
            menuState != "Specialists Overview" && "hidden",
          )}
        >
          {user.role === "admin" && <SpecialistsOverview user={user} />}
        </div>

        {/* Specialists overview comp done */}

        {/* APPLICATION REQUESTS COMP BELOW */}

        <div
          className={cn(
            "flex w-full",
            menuState != "Application Requests" && "hidden",
          )}
        >
          {user.role === "admin" && <ApplicationRequests user={user} />}
        </div>

        {/* APPLICATION REQUESTS COMP DONE */}
      </div>
    </div>
  );
};

export default page;
