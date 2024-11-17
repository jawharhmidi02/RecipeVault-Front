"use client";
import { cn } from "@/lib/utils";
import { act, useEffect, useRef, useState, useTransition } from "react";
import { useRouter, useSearchParams, useParams } from "next/navigation";
import { Skeleton } from "@/components/ui/skeleton";
import { toast } from "@/hooks/use-toast";
import Cookies from "js-cookie";
import { ToastAction } from "@radix-ui/react-toast";

const page = () => {
  const searchParams = useParams();
  const id = searchParams.id;
  const router = useRouter();
  const [user, setUser] = useState({});
  const [userLiked, setUserLiked] = useState(false);
  const [recipe, setRecipe] = useState({});
  const [signedIn, setSignedIn] = useState(false);
  const [CanLike, setCanLike] = useState(false);
  const [loadingRecipe, setLoadingRecipe] = useState(true);
  const [loadingPage, setLoadingPage] = useState(false);
  const [isPendingPage, startTransitionPage] = useTransition();

  const parseTime = (minutes) => {
    return [Math.floor(minutes / 60), minutes % 60];
  };

  const parseAmount = (ing) => {
    return ing.substring(0, ing.indexOf(":"));
  };
  const parseSecondAmount = (ing) => {
    let ch = ing.substring(ing.indexOf(":") + 1);
    return ch.substring(0, ch.indexOf(":"));
  };
  const parseUnit = (ing) => {
    let ch = ing.substring(ing.indexOf(":") + 1);
    ch = ch.substring(ch.indexOf(":") + 1);
    return ch.substring(0, ch.indexOf(":"));
  };
  const parseIngredient = (ing) => {
    return ing.substring(ing.lastIndexOf(":") + 1);
  };

  const redirectToUser = (userId) => {
    startTransitionPage(() => {
      router.push(`/profile/${userId}`);
    });
  };

  const checkUserAndHisLikes = async () => {
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
      setSignedIn(true);
      setCanLike(true);

      const responseLikes = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/recipelikes/user/${data.data.id}?limit=999`,
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
      console.log(dataLikes);

      setUserLiked(dataLikes.data.data.some((like) => like.recipe.id === id));
    } catch (error) {
      console.log(error);
    }
  };

  const fetchRecipes = async () => {
    setLoadingRecipe(true);
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/recipes/byid/${id}`,
        {
          method: "GET",
        },
      );
      const data = await res.json();
      if (data.data === null) {
        throw new Error(data.message);
      }
      setRecipe(data.data);

      setLoadingRecipe(false);
    } catch (error) {
      console.log(error);
      toast({
        title: "Error",
        description: "Something went wrong, Please Try Again!",
        variant: "destructive",
      });
      setLoadingRecipe(false);
    }
    setLoadingRecipe(false);
  };

  const dis_likeRecipe = async () => {
    if (!loadingRecipe) {
      if (!signedIn) {
        toast({
          title: "Oops!",
          description: "You need to Register First!",
          variant: "warning",
          action: (
            <ToastAction
              className="rounded-md border-2 border-white px-4 py-2 transition-colors duration-300 hover:bg-white hover:text-yellow-400"
              altText="Register"
              onClick={() => {
                startTransitionPage(() => {
                  router.push("/sign-up");
                });
              }}
            >
              Register!
            </ToastAction>
          ),
        });
        return;
      }
      if (user.role === "admin") {
        toast({
          title: "Oops!",
          description: "Admins can't like recipes!",
          variant: "warning",
        });
        return;
      }
      if (CanLike) {
        try {
          setCanLike(false);
          const response = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/recipelikes`,
            {
              method: "POST",
              headers: {
                access_token: Cookies.get("access_token"),
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                recipe: { id },
              }),
            },
          );
          const data = await response.json();
          if (data.data === null) {
            throw new Error(data.message);
          }
          if (data.message === "Recipe like created successfully") {
            setUserLiked(true);
            setRecipe({ ...recipe, likes: recipe.likes + 1 });
            toast({
              title: "Success",
              description: "Recipe Liked Successfully",
              variant: "success",
              duration: 3500,
            });
          } else {
            setUserLiked(false);
            setRecipe({ ...recipe, likes: recipe.likes - 1 });
            toast({
              title: "Success",
              description: "Recipe Disliked Successfully",
              variant: "success",
              duration: 3500,
            });
          }
          setCanLike(true);
        } catch (error) {
          console.log(error);
          toast({
            title: "Error",
            description: "Something went wrong, Please Try Again!",
            variant: "destructive",
          });
        }
      }
    }
  };

  useEffect(() => {
    setLoadingPage(isPendingPage);
  }, [isPendingPage]);

  useEffect(() => {
    checkUserAndHisLikes();
    fetchRecipes();
  }, []);

  return (
    <div className="mx-auto flex w-full items-center justify-center">
      {loadingPage && (
        <div className="fixed inset-0 z-50 flex h-full w-full items-center justify-center bg-white/60 backdrop-blur-sm">
          <div className="h-14 w-14 animate-spin rounded-full border-b-4 border-[var(--theme1)]"></div>
        </div>
      )}
      <div className="mx-5 flex w-full max-w-[800px] flex-col gap-4">
        <div className="flex flex-row items-center gap-2">
          <div
            onClick={() => {
              startTransitionPage(() => {
                router.push("/recipes");
              });
            }}
            className="font-light text-neutral-500 transition-all duration-100 hover:cursor-pointer hover:text-neutral-800"
          >
            Recipes
          </div>
          <div className="flex items-end justify-end">
            <i className="fa-solid fa-chevron-right text-[12px] font-thin text-neutral-400"></i>
          </div>
          {loadingRecipe ? (
            <Skeleton className="h-4 w-[100px] bg-neutral-300" />
          ) : (
            <div className="truncate text-neutral-900">{recipe.title}</div>
          )}
        </div>
        {loadingRecipe ? (
          <Skeleton className={"h-[400px] w-full bg-neutral-300"} />
        ) : (
          <img
            src={recipe.img}
            alt="meal"
            className="rounded-xl object-cover"
          ></img>
        )}
        <div className="flex flex-col gap-2">
          <div className="flex flex-row items-center gap-8">
            {loadingRecipe ? (
              <Skeleton className={"h-8 w-[200px] bg-neutral-300"} />
            ) : (
              <div className="text-xl font-bold text-neutral-800 min-[500px]:text-2xl">
                {recipe.title}
              </div>
            )}
            <div className="flex w-fit flex-row items-center gap-2">
              <div className="relative">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className={cn(
                    "peer z-10 size-7 opacity-100 transition-all peer-hover:opacity-0 min-[500px]:size-9",
                    loadingRecipe && !CanLike && "cursor-pointer",
                    signedIn && userLiked && "opacity-0",
                  )}
                  viewBox="0 0 512 512"
                >
                  <path
                    fill="#737373"
                    d="M225.8 468.2l-2.5-2.3L48.1 303.2C17.4 274.7 0 234.7 0 192.8l0-3.3c0-70.4 50-130.8 119.2-144C158.6 37.9 198.9 47 231 69.6c9 6.4 17.4 13.8 25 22.3c4.2-4.8 8.7-9.2 13.5-13.3c3.7-3.2 7.5-6.2 11.5-9c0 0 0 0 0 0C313.1 47 353.4 37.9 392.8 45.4C462 58.6 512 119.1 512 189.5l0 3.3c0 41.9-17.4 81.9-48.1 110.4L288.7 465.9l-2.5 2.3c-8.2 7.6-19 11.9-30.2 11.9s-22-4.2-30.2-11.9zM239.1 145c-.4-.3-.7-.7-1-1.1l-17.8-20-.1-.1s0 0 0 0c-23.1-25.9-58-37.7-92-31.2C81.6 101.5 48 142.1 48 189.5l0 3.3c0 28.5 11.9 55.8 32.8 75.2L256 430.7 431.2 268c20.9-19.4 32.8-46.7 32.8-75.2l0-3.3c0-47.3-33.6-88-80.1-96.9c-34-6.5-69 5.4-92 31.2c0 0 0 0-.1 .1s0 0-.1 .1l-17.8 20c-.3 .4-.7 .7-1 1.1c-4.5 4.5-10.6 7-16.9 7s-12.4-2.5-16.9-7z"
                  />
                </svg>
                <svg
                  onClick={() => {
                    dis_likeRecipe();
                  }}
                  xmlns="http://www.w3.org/2000/svg"
                  className={cn(
                    "duration-50 peer absolute -left-[1px] -top-[1px] size-[30px] opacity-0 transition-all hover:cursor-pointer hover:opacity-100 min-[500px]:size-[38px]",
                    loadingRecipe && !CanLike && "cursor-pointer",
                    signedIn && userLiked && "opacity-100",
                  )}
                  viewBox="0 0 512 512"
                >
                  <path
                    fill="#ff8787"
                    d="M47.6 300.4L228.3 469.1c7.5 7 17.4 10.9 27.7 10.9s20.2-3.9 27.7-10.9L464.4 300.4c30.4-28.3 47.6-68 47.6-109.5v-5.8c0-69.9-50.5-129.5-119.4-141C347 36.5 300.6 51.4 268 84L256 96 244 84c-32.6-32.6-79-47.5-124.6-39.9C50.5 55.6 0 115.2 0 185.1v5.8c0 41.5 17.2 81.2 47.6 109.5z"
                  />
                </svg>
              </div>
              {loadingRecipe ? (
                <Skeleton className={"h-8 w-8 bg-neutral-300"} />
              ) : (
                <div className="font-bold text-neutral-500 min-[500px]:text-lg">
                  {recipe.likes}
                </div>
              )}
            </div>
          </div>
          <div className="flex flex-row gap-4">
            <div className="text-lg font-semibold min-[500px]:text-xl">
              Cuisine:
            </div>
            <div className="text-lg font-light text-neutral-600 min-[500px]:text-xl">
              {recipe.cuisineLocation}
            </div>
          </div>
          <div className="flex flex-row gap-4">
            <div className="text-lg font-semibold min-[500px]:text-xl">
              Type:
            </div>
            <div className="text-lg font-light text-neutral-600 min-[500px]:text-xl">
              {recipe.type}
            </div>
          </div>
        </div>

        <div className="mb-4 h-[1px] w-full bg-neutral-300"></div>
        <div className="flex flex-col gap-8">
          <div className="flex flex-row gap-6">
            <div
              onClick={() => redirectToUser(recipe.user?.id)}
              className="grid place-items-center rounded-full bg-neutral-200 p-8 shadow-md transition-all duration-200 hover:scale-105 hover:cursor-pointer"
            >
              <i className="fa-solid fa-user text-5xl text-neutral-400"></i>
            </div>
            <div className="flex flex-col justify-center gap-4">
              {loadingRecipe ? (
                <Skeleton className={"h-5 w-[100px] bg-neutral-300"} />
              ) : (
                <div
                  onClick={() => redirectToUser(recipe.user?.id)}
                  className="text-xl font-semibold text-neutral-800 transition-all duration-100 hover:cursor-pointer hover:text-[var(--theme2)]"
                >
                  {recipe.user?.full_name}
                </div>
              )}
              {loadingRecipe ? (
                <Skeleton className={"h-5 w-[100px] bg-neutral-300"} />
              ) : (
                <div className={cn("block")}>
                  <div className="font-light text-neutral-500">
                    {recipe.user?.role === "client"
                      ? "Verified by a Specialist"
                      : "A Specialist"}
                  </div>
                </div>
              )}
              {loadingRecipe ? (
                <Skeleton className={"h-5 w-[160px] bg-neutral-300"} />
              ) : (
                <div className="font-light text-neutral-500">
                  {recipe.user?.email}
                </div>
              )}
            </div>
          </div>
          {loadingRecipe ? (
            <div className="flex flex-col gap-2">
              {Array.from({ length: 4 }).map((_, index) => (
                <Skeleton key={index} className={"h-6 w-full bg-neutral-300"} />
              ))}
              <Skeleton className={"h-6 w-[40%] bg-neutral-300"} />
            </div>
          ) : (
            <div className="">{`"${recipe.description}"`}</div>
          )}
        </div>
        <div className="mb-4 mt-4 h-[1px] w-full bg-neutral-300"></div>
        <div className="grid grid-cols-2 gap-y-10 rounded-xl bg-neutral-200 px-4 py-6 min-[500px]:grid-cols-4">
          <div className="flex flex-col items-center justify-center gap-4">
            <div>Difficulty</div>
            {loadingRecipe ? (
              <Skeleton className={"h-12 w-12 bg-neutral-300"} />
            ) : (
              <div className="text-lg font-semibold">{recipe.difficulty}</div>
            )}
          </div>
          <div className="flex flex-col items-center justify-center gap-4">
            <div>Preparation</div>
            {loadingRecipe ? (
              <Skeleton className={"h-12 w-12 bg-neutral-300"} />
            ) : (
              <div className="flex flex-row gap-2">
                <div
                  className={cn(
                    "text-lg font-semibold",
                    parseTime(recipe.prepTime)[0] == 0 && "hidden",
                  )}
                >{`${parseTime(recipe.prepTime)[0]} Hr`}</div>
                <div
                  className={cn(
                    "text-lg font-semibold",
                    parseTime(recipe.prepTime)[1] == 0 && "hidden",
                  )}
                >{`${parseTime(recipe.prepTime)[1]} Min`}</div>
              </div>
            )}
          </div>
          <div className="flex flex-col items-center justify-center gap-4">
            <div>Baking</div>
            {loadingRecipe ? (
              <Skeleton className={"h-12 w-12 bg-neutral-300"} />
            ) : (
              <div className="flex flex-row gap-2">
                <div
                  className={cn(
                    "text-lg font-semibold",
                    parseTime(recipe.bakingTime)[0] == 0 && "hidden",
                  )}
                >{`${parseTime(recipe.bakingTime)[0]} Hr`}</div>
                <div
                  className={cn(
                    "text-lg font-semibold",
                    parseTime(recipe.bakingTime)[1] == 0 && "hidden",
                  )}
                >{`${parseTime(recipe.bakingTime)[1]} Min`}</div>
              </div>
            )}
          </div>
          <div className="flex flex-col items-center justify-center gap-4">
            <div>Resting</div>
            {loadingRecipe ? (
              <Skeleton className={"h-12 w-12 bg-neutral-300"} />
            ) : (
              <div className="flex flex-row gap-2">
                <div
                  className={cn(
                    "text-lg font-semibold",
                    parseTime(recipe.restingTime)[0] == 0 && "hidden",
                  )}
                >{`${parseTime(recipe.restingTime)[0]} Hr`}</div>
                <div
                  className={cn(
                    "text-lg font-semibold",
                    parseTime(recipe.restingTime)[1] == 0 && "hidden",
                  )}
                >{`${parseTime(recipe.restingTime)[1]} Min`}</div>
              </div>
            )}
          </div>
        </div>
        <div className="mb-4 mt-4 h-[1px] w-full bg-neutral-300"></div>
        <div className="flex flex-col gap-2">
          <div className="flex flex-row gap-2">
            <div className="text-lg font-semibold min-[500px]:text-xl">
              Ingredients Location:
            </div>
            <div className="text-lg font-light text-neutral-600 min-[500px]:text-xl">
              {recipe.ingredientsLocation}
            </div>
          </div>
          <div className="text-lg font-semibold min-[500px]:text-2xl">
            Ingredients
          </div>
          <div className="flex flex-col gap-1">
            {recipe.ingredients?.map((ing, index) => (
              <div className="flex flex-row gap-4" key={index}>
                <div className="w-24 text-start">
                  {parseAmount(ing)}{" "}
                  {parseSecondAmount(ing) != "0" && (
                    <>{`, ${parseSecondAmount(ing)}`}</>
                  )}{" "}
                  <font className="font-semibold">{parseUnit(ing)}</font>
                </div>
                <div>{parseIngredient(ing)}</div>
              </div>
            ))}
          </div>
        </div>
        <div className="mb-4 mt-4 h-[1px] w-full bg-neutral-300"></div>
        <div className="flex flex-col gap-4">
          <div className="text-lg font-semibold min-[500px]:text-2xl">
            Utensils
          </div>
          {recipe.utensils && (
            <div className="">
              {recipe.utensils?.map((utensil, index) => (
                <span key={index}>{index == 0 ? utensil : `, ${utensil}`}</span>
              ))}
            </div>
          )}
        </div>
        <div className="mb-4 mt-4 h-[1px] w-full bg-neutral-300"></div>
        <div className="grid grid-cols-1 gap-12 md:grid-cols-2">
          {recipe.steps?.map((step, index) => (
            <div key={index} className="flex flex-col gap-4">
              <div className="text-lg font-semibold min-[500px]:text-xl">{`Step ${index + 1}/${recipe.steps.length}`}</div>
              <div className="font-light text-neutral-600">{step}</div>
            </div>
          ))}
          <div className="flex flex-col gap-4">
            <div className="text-xl font-semibold">Enjoy your meal!</div>
          </div>
        </div>
        <div className="mb-4 mt-4 h-[1px] w-full bg-neutral-300"></div>
        <div className="flex flex-col gap-4">
          <div className="text-lg font-semibold min-[500px]:text-2xl">Tags</div>
          <div className="flex flex-wrap gap-2">
            {recipe.tags?.map((tag, index) => (
              <div
                key={index}
                onClick={() => {
                  startTransitionPage(() => {
                    router.push(`/recipes?search=${tag}`);
                  });
                }}
                className="group grid place-items-center rounded-lg bg-neutral-200 px-3 py-2 transition-all duration-200 hover:cursor-pointer hover:bg-[var(--theme1)]"
              >
                <span className="text-neutral-800 transition-all duration-100 group-hover:text-white group-hover:underline">{`#${tag}`}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
