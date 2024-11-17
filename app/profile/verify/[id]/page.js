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
  const rejectionInput = useRef(null);

  // const recipe = {
  //   id: "455048ce-38c3-4e0e-b5d0-3f47c54f7e9f",
  //   title: "Grilled Salmon",
  //   steps: [
  //     "Lorem ipsum dolor sit amet consectetur adipisicing elit. Vel esse mollitia praesentium doloribus, repellat, fugit dolores obcaecati facilis accusantium minima saepe voluptatum maxime quas eos explicabo eligendi nam perferendis? Aperiam error perspiciatis ipsa sunt repellendus culpa ullam odit hic magni totam dignissimos ratione quisquam eveniet officia, voluptatem maxime dolore. Fugiat?",
  //     "Lorem ipsum dolor sit amet consectetur adipisicing elit. Vel esse mollitia praesentium doloribus, repellat, fugit dolores obcaecati facilis accusantium minima saepe voluptatum maxime quas eos explicabo eligendi nam perferendis? Aperiam error perspiciatis ipsa sunt repellendus culpa ullam odit hic magni totam dignissimos ratione quisquam eveniet officia, voluptatem maxime dolore. Fugiat?",
  //     "Lorem ipsum dolor sit amet consectetur adipisicing elit. Vel esse mollitia praesentium doloribus, repellat, fugit dolores obcaecati facilis accusantium minima saepe voluptatum maxime quas eos explicabo eligendi nam perferendis? Aperiam error perspiciatis ipsa sunt repellendus culpa ullam odit hic magni totam dignissimos ratione quisquam eveniet officia, voluptatem maxime dolore. Fugiat?",
  //     "Lorem ipsum dolor sit amet consectetur adipisicing elit. Vel esse mollitia praesentium doloribus, repellat, fugit dolores obcaecati facilis accusantium minima saepe voluptatum maxime quas eos explicabo eligendi nam perferendis? Aperiam error perspiciatis ipsa sunt repellendus culpa ullam odit hic magni totam dignissimos ratione quisquam eveniet officia, voluptatem maxime dolore. Fugiat?",
  //   ],
  //   description:
  //     " Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptates voluptatem accusamus aspernatur, dicta voluptas inventore non illo dolorem impedit provident illum cumque fugit nihil accusantium ut sit atque, deleniti minus. Quia minus culpa delectus, cupiditate voluptatem id! Sed repellendus corporis maiores rerum quis? Vero voluptates soluta, ea consectetur eligendi rem! Iusto assumenda quam deleniti unde velit reprehenderit culpa. Saepe reprehenderit eveniet enim minus ducimus, nobis modi nostrum suscipit omnis perspiciatis totam rerum corrupti, est nisi corporis veritatis ut odio. Rerum, enim dolor? Hic excepturi deleniti perferendis sed! Ipsam commodi nobis molestiae dicta harum quam neque nesciunt! Illum, voluptatibus itaque! Porro?",
  //   ingredientsLocation: "Tunis",
  //   cuisineLocation: "Brazil",
  //   ingredients: ["1:1/2:tbsp:salt", "2:1/4:cup:milk"],
  //   is_approved: false,
  //   is_rejected: false,
  //   rejection_reason: null,
  //   approvedAt: null,
  //   user: {
  //     dialogues: [],
  //     email: "lafiraed04@gmail.com",
  //     id: "dee658f7-0f25-4b13-9729-e0b8282a57f3",
  //     full_name: "Lafi Raed",
  //     phone: "+21650974080",
  //     role: "client",
  //     nonce: null,
  //   },
  //   img: "https://www.shutterstock.com/image-photo/fried-salmon-steak-cooked-green-600nw-2489026949.jpg",
  //   tags: [
  //     "tag5",
  //     "tag2",
  //     "Tag4",
  //     "Tag3",
  //     "Tag10",
  //     "Tag11",
  //     "Tag8",
  //     "Tag8",
  //     "Tag8",
  //     "Tag8",
  //     "Tag8",
  //     "Tag8",
  //     "Tag8",
  //     "Tag8",
  //     "Tag8",
  //     "Tag8",
  //     "Tag8",
  //     "Tag8",
  //   ],
  //   type: "Starter",
  //   difficulty: "Easy",
  //   prepTime: 59,
  //   bakingTime: 130,
  //   restingTime: 166,
  //   likes: 0,
  //   utensils: ["pan", "hotpot", "butterknife", "cup", "spoon", "fork"],
  // };

  const acceptRecipe = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/recipes/${id}`,
        {
          method: "PUT",
          headers: {
            access_token: Cookies.get("access_token"),
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            is_approved: true,
            is_rejected: false,
            rejection_reason: null,
          }),
        },
      );
      const data = await response.json();
      if (data.statusCode === 200) {
        toast({
          description: "Recipe has been approved!",
          variant: "default",
          duration: 2000,
        });
        startTransitionPage(() => {
          router.push(`/profile`);
        });
        return;
      }
      console.log(data.message);

      toast({
        description: "Something went wrong!",
        variant: "destructive",
        duration: 2000,
      });
    } catch (error) {
      console.log(error);
      toast({
        description: "Something went wrong!",
        variant: "destructive",
        duration: 2000,
      });
    }
  };

  const rejectRecipe = async () => {
    if (rejectionInput.current.value.trim() == "") {
      toast({
        description: "You need to state a rejection reason!",
        variant: "destructive",
        duration: 2000,
      });
      return false;
    } else {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/recipes/${id}`,
          {
            method: "PUT",
            headers: {
              access_token: Cookies.get("access_token"),
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              is_approved: false,
              is_rejected: true,
              rejection_reason: rejectionInput.current.value.trim(),
            }),
          },
        );
        const data = await response.json();
        if (data.statusCode === 200) {
          toast({
            description: "Recipe has been Rejected!",
            variant: "default",
            duration: 2000,
          });
          startTransitionPage(() => {
            router.push(`/profile`);
          });
          return;
        }
        console.log(data.message);

        toast({
          description: "Something went wrong!",
          variant: "destructive",
          duration: 2000,
        });
      } catch (error) {
        console.log(error);
        toast({
          description: "Something went wrong!",
          variant: "destructive",
          duration: 2000,
        });
      }
    }
  };

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
      setUserLiked(dataLikes.data.some((like) => like.recipe.id === id));
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
              onClick={() => redirectToUser(recipe.user.id)}
              className="grid place-items-center rounded-full bg-neutral-200 p-8 shadow-md transition-all duration-200 hover:scale-105 hover:cursor-pointer"
            >
              <i className="fa-solid fa-user text-5xl text-neutral-400"></i>
            </div>
            <div className="flex flex-col justify-center gap-4">
              {loadingRecipe ? (
                <Skeleton className={"h-5 w-[100px] bg-neutral-300"} />
              ) : (
                <div
                  onClick={() => redirectToUser(recipe.user.id)}
                  className="text-xl font-semibold text-neutral-800 transition-all duration-100 hover:cursor-pointer hover:text-[var(--theme2)]"
                >
                  {recipe.user.full_name}
                </div>
              )}
              {loadingRecipe ? (
                <Skeleton className={"h-5 w-[100px] bg-neutral-300"} />
              ) : (
                <div
                  className={cn(
                    "block",
                    // recipe.user.role == "client" && "block",
                  )}
                >
                  <div className="font-light text-neutral-500">
                    {recipe.user.role === "client"
                      ? "Verified by a Specialist"
                      : "A Specialist"}
                  </div>
                </div>
              )}
              {loadingRecipe ? (
                <Skeleton className={"h-5 w-[160px] bg-neutral-300"} />
              ) : (
                <div className="font-light text-neutral-500">
                  {recipe.user.email}
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
        <div className="mb-4 mt-4 h-[1px] w-full bg-neutral-300"></div>
        <div className="flex flex-col gap-4">
          <span className="text-[14px] tracking-wider text-neutral-600">
            Rejection Reason
          </span>
          <span className="text-light text-[13px] text-neutral-600">
            Tell us why this recipe is ineligible to be accepted.
          </span>
          <textarea
            className="h-[150px] rounded-md border border-neutral-700 bg-[var(--bg)] px-5 py-3 outline-[var(--theme2)]"
            maxLength={500}
            placeholder="E.g not even animals would eat this type of food."
            ref={rejectionInput}
          ></textarea>
          <span className="border-neutral-700 text-end text-[12px] font-light">
            500 Chars max
          </span>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <button
              onClick={() => {
                rejectRecipe();
              }}
              type="button"
              className="rounded-lg border-2 border-transparent bg-rose-600 px-4 py-2 text-xl font-semibold text-[#ffffff] transition-all duration-200 hover:cursor-pointer hover:border-rose-600 hover:bg-rose-100 hover:text-rose-600"
            >
              Reject
            </button>
            <button
              onClick={() => {
                acceptRecipe();
              }}
              type="button"
              className="rounded-lg border-2 border-transparent bg-emerald-500 px-4 py-2 text-xl font-semibold text-[#ffffff] transition-all duration-200 hover:cursor-pointer hover:border-emerald-500 hover:bg-emerald-100 hover:text-emerald-500"
            >
              Accept
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
