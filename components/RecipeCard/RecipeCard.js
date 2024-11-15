import "./RecipeCard.css";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { useState, useEffect, useTransition } from "react";

const RecipeCard = ({ recipe, openRecipe, liked, accepted, pending }) => {
  const [loadingPage, setLoadingPage] = useState(false);
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  useEffect(() => {
    setLoadingPage(isPending);
  }, [isPending]);

  return (
    <div
      onClick={() => {
        if (pending) {
          return;
        }
        if (accepted) {
          openRecipe(recipe.id);
        } else {
          if (!recipe.is_approved && !recipe.is_rejected) {
            router.push(`/profile/verify/${recipe.id}`);
          }
        }
      }}
      className={cn(
        "flex flex-col gap-2 rounded-xl bg-white shadow-md transition-all duration-200",
        (accepted || (!recipe.is_approved && !recipe.is_rejected)) &&
          "hover:scale-[1.03] hover:cursor-pointer",
      )}
    >
      <div className="relative overflow-hidden rounded-t-xl">
        <img
          src={recipe.img}
          alt={recipe.title}
          className={cn(
            "h-[200px] w-full rounded-t-xl object-cover transition-all duration-200",
            (accepted || (!recipe.is_approved && !recipe.is_rejected)) &&
              "hover:scale-110",
          )}
        />
        <div
          className={cn(
            "absolute bottom-2 right-3 flex flex-row items-center justify-center gap-1 rounded-xl bg-white px-2 py-[3px]",
            !accepted && "hidden",
          )}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className={cn(
              "duration-50 peer z-10 size-5 opacity-100 transition-all hover:opacity-0",
              liked && "opacity-0",
            )}
            viewBox="0 0 512 512"
          >
            <path
              fill="black"
              d="M225.8 468.2l-2.5-2.3L48.1 303.2C17.4 274.7 0 234.7 0 192.8l0-3.3c0-70.4 50-130.8 119.2-144C158.6 37.9 198.9 47 231 69.6c9 6.4 17.4 13.8 25 22.3c4.2-4.8 8.7-9.2 13.5-13.3c3.7-3.2 7.5-6.2 11.5-9c0 0 0 0 0 0C313.1 47 353.4 37.9 392.8 45.4C462 58.6 512 119.1 512 189.5l0 3.3c0 41.9-17.4 81.9-48.1 110.4L288.7 465.9l-2.5 2.3c-8.2 7.6-19 11.9-30.2 11.9s-22-4.2-30.2-11.9zM239.1 145c-.4-.3-.7-.7-1-1.1l-17.8-20-.1-.1s0 0 0 0c-23.1-25.9-58-37.7-92-31.2C81.6 101.5 48 142.1 48 189.5l0 3.3c0 28.5 11.9 55.8 32.8 75.2L256 430.7 431.2 268c20.9-19.4 32.8-46.7 32.8-75.2l0-3.3c0-47.3-33.6-88-80.1-96.9c-34-6.5-69 5.4-92 31.2c0 0 0 0-.1 .1s0 0-.1 .1l-17.8 20c-.3 .4-.7 .7-1 1.1c-4.5 4.5-10.6 7-16.9 7s-12.4-2.5-16.9-7z"
            />
          </svg>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className={cn(
              "duration-50 peer absolute -left-[-8px] size-5 opacity-0 transition-all peer-hover:opacity-100",
              liked && "opacity-100",
            )}
            viewBox="0 0 512 512"
          >
            <path
              fill="#ff8787"
              d="M47.6 300.4L228.3 469.1c7.5 7 17.4 10.9 27.7 10.9s20.2-3.9 27.7-10.9L464.4 300.4c30.4-28.3 47.6-68 47.6-109.5v-5.8c0-69.9-50.5-129.5-119.4-141C347 36.5 300.6 51.4 268 84L256 96 244 84c-32.6-32.6-79-47.5-124.6-39.9C50.5 55.6 0 115.2 0 185.1v5.8c0 41.5 17.2 81.2 47.6 109.5z"
            />
          </svg>
          <div className="text-sm">{recipe.likes}</div>
        </div>
      </div>
      <div className="flex flex-col gap-2 px-6 pb-4 pt-2">
        <div className="break-all text-[22px] font-bold">{recipe.title}</div>
        <div>
          <span className="text-lg font-semibold text-neutral-700">
            Cuisine:
          </span>{" "}
          {recipe.cuisineLocation}
        </div>
        <div>
          <span className="text-lg font-semibold text-neutral-700">
            Made In:
          </span>{" "}
          {recipe.ingredientsLocation}
        </div>
        <div className={cn("flex flex-col gap-2", !recipe.rejection_reason && "hidden")}>
          <div className="font-semibold text-rose-600">Rejection Reason:</div>
          <div className={cn("font-light text-neutral-600")}>
            {recipe.rejection_reason}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecipeCard;
