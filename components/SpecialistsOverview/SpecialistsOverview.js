import React from "react";
import SpecialistCard from "../SpecialistCard/SpecialistCard";
import { useState, useEffect, useRef, useTransition } from "react";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import SkeletonRecipeCard from "@/components/RecipeCard/SkeletonRecipeCard";
import { toast } from "@/hooks/use-toast";
import Cookies from "js-cookie";
import { cn } from "@/lib/utils";
import SkeletonSpecialistCard from "../SpecialistCard/SkeletonSpecialistCard";

const SpecialistsOverview = ({ user }) => {
  const [specialists, setSpecialists] = useState([]);
  const [loadingSpecialists, setLoadingSpecialists] = useState(true);

  const fetchSpecialists = async () => {
    setLoadingSpecialists(true);
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/users/specialists?page=${CurrentPage}&limit=${limit}`,
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

      setLoadingSpecialists(false);
      setSpecialists(data.data.data);

      setTotalItems(data.data.totalItems);
      setTotalPages(data.data.totalPages);
      setCurrentPage(Number(data.data.currentPage));
    } catch (error) {
      console.log(error);

      setLoadingSpecialists(false);
      toast({
        title: "Error",
        description: "Something went wrong for Specialists, Please Try Again!",
        variant: "destructive",
      });
    }
    setLoadingSpecialists(false);
  };

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
    fetchSpecialists();
  }, [CurrentPage]);

  useEffect(() => {
    createPageNumbers();
  }, [CurrentPage, totalPages]);
  return (
    <div className="grid w-full grid-cols-1 gap-8 sm:grid-cols-2">
      {loadingSpecialists ? (
        Array.from({ length: limit }, (_, index) => (
          <SkeletonSpecialistCard key={index} />
        ))
      ) : specialists.length === 0 ? (
        <div className="col-span-1 flex w-full flex-col items-center justify-center gap-4 text-center md:col-span-2 lg:col-span-3">
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
              No Specialists Found
            </div>
          </div>
        </div>
      ) : (
        specialists.map((specialist, index) => (
          <SpecialistCard specialist={specialist} key={index} />
        ))
      )}

      {!loadingSpecialists && specialists.length > 0 && (
        <Pagination className="col-span-full">
          <PaginationContent className="flex items-center justify-center gap-2">
            <PaginationItem>
              <PaginationPrevious
                className={cn(
                  "rounded-md px-3 py-2 transition-all duration-200 hover:cursor-pointer",
                  CurrentPage === 1
                    ? "hover:cursor-not-allowed"
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
                    ? "hover:cursor-not-allowed"
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

export default SpecialistsOverview;