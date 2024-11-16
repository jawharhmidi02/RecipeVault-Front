import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import RecipeCard from "../RecipeCard/RecipeCard";
import SkeletonRecipeCard from "../RecipeCard/SkeletonRecipeCard";
import { toast } from "@/hooks/use-toast";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

const RejectedRecipes = ({ user }) => {
  const [recipes, setRecipes] = useState([]);
  const [loadingRecipes, setLoadingRecipes] = useState(true);

  const fetchUserRejectedRecipes = async () => {
    setLoadingRecipes(true);
    if (user.id) {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/recipes/rejected/byuserid/${user.id}?page=${CurrentPage}&limit=${limit}`,
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
    fetchUserRejectedRecipes();
  }, [user]);

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
    fetchUserRejectedRecipes();
  }, [CurrentPage]);

  useEffect(() => {
    createPageNumbers();
  }, [CurrentPage, totalPages]);

  return (
    <div className="grid w-full grid-cols-1 gap-6 md:grid-cols-2">
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
          <RecipeCard key={index} recipe={recipe} accepted={false} />
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
                    ? "bg-gray-300 text-gray-500 hover:cursor-not-allowed"
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
                    ? "bg-gray-300 text-gray-500 hover:cursor-not-allowed"
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
  );
};

export default RejectedRecipes;
