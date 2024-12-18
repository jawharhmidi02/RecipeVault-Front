"use client";
import React, { useEffect, useRef, useState, useTransition } from "react";
import { cn } from "@/lib/utils";
import ScrollableSelect from "@/components/ScrollableSelect/ScrollableSelect";
import hours from "@/lib/hours";
import minutes from "@/lib/minutes";
import amounts from "@/lib/amounts";
import units from "@/lib/units";
import utensils from "@/lib/utensils";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import countries from "@/lib/countries";

const page = () => {
  const { toast } = useToast();
  const [step, setStep] = useState(1);
  const [radio, setRadio] = useState(1);
  const fileInput = useRef(null);
  const imageInput = useRef(null);
  const [loaded, setLoaded] = useState(false);
  const [prepHour, setPrepHour] = useState(0);
  const [prepMin, setPrepMin] = useState(1);
  const [bakeHour, setBakeHour] = useState(0);
  const [bakeMin, setBakeMin] = useState(0);
  const [restHour, setRestHour] = useState(0);
  const [restMin, setRestMin] = useState(0);
  const nameInput = useRef("");
  const [imageValue, setImageValue] = useState(null);
  const [secondAmount, setSecondAmount] = useState("0");
  const [unit, setUnit] = useState("");
  const [ingredients, setIngredients] = useState([]);
  const amountInput = useRef("");
  const secondAmountInput = useRef("");
  const unitInput = useRef("");
  const ingredientInput = useRef("");
  const [recipeSteps, setRecipeSteps] = useState([]);
  const stepDescriptionInput = useRef("");
  const [utensil, setUtensil] = useState("");
  const [utensilsList, setUtensilsList] = useState([]);
  const recipeDescriptionInput = useRef("");
  const [catRadio, setCatRadio] = useState(2);
  const tagInput = useRef("");
  const [tags, setTags] = useState([]);
  const [cuisine, setCuisine] = useState("");
  const [ingredientsLocation, setIngredientsLocation] = useState("");
  const router = useRouter();
  const [loadingPage, setLoadingPage] = useState(true);
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    setLoadingPage(isPending);
  }, [isPending]);

  const parseIngredients = (items) => {
    let final = [];
    items.map((item) => {
      final.push(
        item.amount +
          ":" +
          item.secondAmount +
          ":" +
          item.unit +
          ":" +
          item.ingredient,
      );
    });
    return final;
  };

  const removeDuplicateTags = (tags) => {
    let arr = [...tags];
    let final = arr.filter((item, index) => arr.indexOf(item) === index);
    return final;
  };

  const removeDuplicateUtensils = (utls) => {
    let arr = [...utls];
    let final = arr.filter((item, index) => arr.indexOf(item) === index);
  };

  const verifyInformation = async () => {
    if (step == 1) {
      if (nameInput.current.value == "") {
        toast({
          description: "Verify the Name!",
          variant: "destructive",
          duration: 2000,
        });
        return false;
      } else if (!fileInput.current.files[0]) {
        toast({
          description: "You need to choose an Image!",
          variant: "destructive",
          duration: 2000,
        });
        return false;
      } else if (cuisine == "") {
        toast({
          description: "You need to choose a cuisine!",
          variant: "destructive",
          duration: 2000,
        });
        return false;
      } else {
        setStep(step + 1);
      }
    } else if (step == 2) {
      if (ingredients.length == 0) {
        toast({
          description: "You need at least one ingredient to continue!",
          variant: "destructive",
          duration: 2000,
        });
        return false;
      } else if (ingredientsLocation == "") {
        toast({
          description: "You need to choose an ingredient location!",
          variant: "destructive",
          duration: 2000,
        });
        return false;
      } else {
        setStep(step + 1);
      }
    } else if (step == 3) {
      if (recipeSteps.length == 0) {
        toast({
          description: "You need at least 1 step to submit your recipe!",
          variant: "destructive",
          duration: 2000,
        });
        return false;
      } else if (utensilsList.length == 0) {
        toast({
          description: "You need at least 1 utensil to submit your recipe!",
          variant: "destructive",
          duration: 2000,
        });
        return false;
      } else {
        setStep(step + 1);
      }
    } else {
      if (recipeDescriptionInput.current.value == "") {
        toast({
          description: "Your meal needs a description!",
          variant: "destructive",
          duration: 2000,
        });
        return false;
      } else {
        toast({
          description: "Your meal has been submitted!",
          variant: "success",
          duration: 2000,
        });

        const difficulty = document.querySelector(
          "input[name='difficulty']:checked",
        );
        const category = document.querySelector(
          "input[name='category']:checked",
        );
        const prepTime = prepHour * 60 + prepMin;
        const bakeTime = bakeHour * 60 + bakeMin;
        const restTime = restHour * 60 + restMin;
        const ings = parseIngredients(ingredients);
        const file = fileInput.current.files[0];
        const formData = new FormData();

        formData.append("file", file);

        toast({
          description: "Uploading Recipe, Please Wait!",
          variant: "default",
          duration: 4000,
        });

        try {
          const response = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/recipes`,
            {
              method: "POST",
              headers: {
                access_token: Cookies.get("access_token"),
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                title: nameInput.current.value.trim(),
                description: recipeDescriptionInput.current.value.trim(),
                prepTime: prepTime,
                bakingTime: bakeTime,
                restingTime: restTime,
                ingredients: ings,
                steps: recipeSteps,
                utensils: removeDuplicateUtensils(utensilsList),
                difficulty: difficulty.value.trim(),
                type: category.value.trim(),
                tags: removeDuplicateTags(tags),
                ingredientsLocation: ingredientsLocation,
                cuisineLocation: cuisine,
              }),
            },
          );

          if (!response.ok) {
            throw new Error("Failed to upload recipe");
          }
          const data = await response.json();
          if (data.statusCode === 201) {
            const responsePhoto = await fetch(
              `${process.env.NEXT_PUBLIC_API_URL}/recipes/uploadphoto/${data.data.id}`,
              {
                method: "POST",
                headers: {
                  access_token: Cookies.get("access_token"),
                },
                body: formData,
              },
            );

            if (!responsePhoto.ok) {
              throw new Error("Failed to upload recipe");
            }
            const dataPhoto = await responsePhoto.json();
            if (dataPhoto.statusCode !== 201) {
              throw new Error(dataPhoto.message);
            }
            toast({
              description: "Recipe Uploaded!",
              variant: "success",
              duration: 4000,
            });
            startTransition(() => {
              router.push("/profile");
            });
          } else {
            toast({
              description: "Something went wrong!",
              variant: "destructive",
              duration: 4000,
            });
            if (data.statusCode === 401) {
              toast({
                description: "Unauthorized!",
                variant: "destructive",
                duration: 4000,
              });
              setLoadingPage(true);
              Cookies.remove("access_token");
              location.href = "/sign-in";
            }
          }
        } catch (error) {
          console.log(error);
          toast({
            title: "Error!",
            description: "Something went wrong!",
            variant: "destructive",
            duration: 6000,
          });
        }
      }
    }
  };

  const addIngredient = () => {
    if (!amountInput.current.value) {
      toast({
        description: "You need to choose an amount..",
        variant: "destructive",
        duration: 2000,
      });
    } else if (unit == "") {
      toast({
        description: "You need to choose a unit!",
        variant: "destructive",
        duration: 2000,
      });
    } else if (ingredientInput.current.value == "") {
      toast({
        description: "You need to choose an ingredient!",
        variant: "destructive",
        duration: 2000,
      });
    } else {
      setIngredients([
        ...ingredients,
        {
          amount: amountInput.current.value,
          secondAmount: secondAmount,
          unit: unit,
          ingredient: ingredientInput.current.value,
        },
      ]);
    }
  };

  const addRecipeStep = () => {
    if (stepDescriptionInput.current.value == "") {
      toast({
        description: "You need to describe your step!",
        variant: "destructive",
        duration: 2000,
      });
    } else {
      setRecipeSteps([...recipeSteps, stepDescriptionInput.current.value]);
    }
  };

  const addUtensil = () => {
    if (utensil == "") {
      toast({
        description: "You need to choose a utensil!",
        variant: "destructive",
        duration: 2000,
      });
    } else {
      setUtensilsList([...utensilsList, utensil]);
    }
  };

  const addTag = () => {
    if (tagInput.current.value == "") {
      toast({
        description: "Tags can't be empty!",
        variant: "destructive",
        duration: 2000,
      });
    } else {
      setTags([...tags, tagInput.current.value]);
    }
  };

  return (
    <div className="flex flex-col gap-4">
      {loadingPage && (
        <div className="fixed inset-0 z-50 flex h-full w-full items-center justify-center bg-white/60 backdrop-blur-sm">
          <div className="h-14 w-14 animate-spin rounded-full border-b-4 border-[var(--theme1)]"></div>
        </div>
      )}
      <div className="sticky top-0 z-20 mb-6 flex items-center justify-center border-b border-b-zinc-100 bg-white pt-3 sm:border-t sm:border-t-zinc-100">
        <div className="flex w-full max-w-[800px] flex-row items-center justify-center gap-2 px-5">
          <div className="flex w-full flex-col items-center justify-between gap-2 pt-8 sm:pt-0">
            <span className="hidden font-light sm:block">1. Basics</span>
            <div
              className={cn(
                "h-1.5 w-full bg-stone-300",
                step >= 1 && "bg-[var(--theme2)]",
              )}
            ></div>
          </div>
          <div className="flex w-full flex-col items-center justify-between gap-2 pt-8 sm:pt-0">
            <span className="hidden font-light sm:block">2. Ingredients</span>
            <div
              className={cn(
                "h-1.5 w-full bg-stone-300",
                step >= 2 && "bg-[var(--theme2)]",
              )}
            ></div>
          </div>
          <div className="flex w-full flex-col items-center justify-between gap-2 pt-8 sm:pt-0">
            <span className="hidden font-light sm:block">3. RecipeSteps</span>
            <div
              className={cn(
                "h-1.5 w-full bg-stone-300",
                step >= 3 && "bg-[var(--theme2)]",
              )}
            ></div>
          </div>
          <div className="flex w-full flex-col items-center justify-between gap-2 pt-8 sm:pt-0">
            <span className="hidden font-light sm:block">4. Extra Details</span>
            <div
              className={cn(
                "h-1.5 w-full bg-stone-300",
                step == 4 && "bg-[var(--theme2)]",
              )}
            ></div>
          </div>
        </div>
      </div>

      {/* STEPPER DONE */}

      {/* STEP 1 PAGE BELOW */}

      <div
        className={cn(
          "mb-40 flex w-full flex-col items-center sm:px-4",
          step != 1 && "hidden",
        )}
      >
        <span className="mb-14 px-4 text-center text-lg sm:px-0 sm:text-start">
          We're excited to see your recipe! Let's start with the basics...
        </span>
        <div className="mx-auto flex w-full max-w-[800px] flex-col gap-4">
          <span className="pl-4 font-roboto text-3xl font-semibold sm:pl-0">
            Basics
          </span>
          <div className="flex w-full flex-col gap-12 rounded-xl bg-white px-6 py-8 shadow-md sm:px-16 sm:py-10">
            <div className="flex w-full flex-col gap-2">
              <span className="text-[14px] tracking-wider text-neutral-600">
                NAME YOUR RECIPE <font className="text-rose-500">*</font>
              </span>
              <input
                type="text"
                required
                className="rounded-md border border-neutral-700 bg-[var(--bg)] p-3 outline-[var(--theme2)]"
                maxLength="60"
                placeholder="E.g Grandma's apple pie"
                ref={nameInput}
              />
              <span className="text-end text-[12px] text-neutral-600">
                60 Chars max
              </span>
            </div>

            {/* Input Done  */}

            <div className="flex w-full flex-col gap-2">
              <span className="text-[14px] tracking-wider text-neutral-600">
                ADD A PHOTO
              </span>
              <div className="flex flex-col gap-4 sm:flex-row sm:gap-8">
                <div
                  onClick={() => {
                    if (!loaded) {
                      fileInput.current.click();
                    }
                  }}
                  className={cn(
                    "relative flex size-[250px] min-w-[250px] flex-col items-center justify-center gap-3 rounded-md border border-neutral-700 bg-[var(--bg)] px-6 hover:cursor-pointer",
                    loaded && "border-transparent hover:cursor-default",
                  )}
                >
                  <img
                    src={imageValue}
                    className={cn(
                      "absolute left-0 top-0 z-10 hidden size-full rounded-md object-cover",
                      loaded && "block",
                    )}
                    alt="Your meals image"
                    ref={imageInput}
                  />
                  <input
                    onChange={() => {
                      const file = fileInput.current.files[0];
                      const reader = new FileReader();
                      reader.onloadend = () => {
                        imageInput.current.src = reader.result;
                        setLoaded(true);
                      };
                      reader.readAsDataURL(file);
                    }}
                    type="file"
                    accept="image/*"
                    className="hidden"
                    ref={fileInput}
                  />
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="70"
                    height="80"
                    fill="#404040"
                    className="bi bi-camera"
                    viewBox="0 0 16 16"
                  >
                    <path d="M15 12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1h1.172a3 3 0 0 0 2.12-.879l.83-.828A1 1 0 0 1 6.827 3h2.344a1 1 0 0 1 .707.293l.828.828A3 3 0 0 0 12.828 5H14a1 1 0 0 1 1 1zM2 4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2h-1.172a2 2 0 0 1-1.414-.586l-.828-.828A2 2 0 0 0 9.172 2H6.828a2 2 0 0 0-1.414.586l-.828.828A2 2 0 0 1 3.172 4z" />
                    <path d="M8 11a2.5 2.5 0 1 1 0-5 2.5 2.5 0 0 1 0 5m0 1a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7M3 6.5a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0" />
                  </svg>
                  <span className="text-center text-neutral-700">
                    Upload a photo of your dish.
                  </span>
                </div>
                <div className="flex flex-col gap-1 sm:self-center">
                  <div
                    onClick={() => {
                      fileInput.current.click();
                    }}
                    className="text-lg font-semibold text-neutral-700 transition-all duration-200 hover:cursor-pointer hover:text-[var(--theme2)]"
                  >
                    Upload a photo
                  </div>
                  <div className="text-neutral-500">
                    Images must be original personal photos with good quality.
                  </div>
                </div>
              </div>
            </div>

            {/* Upload camera done  */}

            <div className="flex flex-col gap-2">
              <span className="text-[14px] tracking-wider text-neutral-600">
                CUISINE
              </span>
              <span className="text-[13px] font-light text-neutral-500">
                Where does this dish originate from?
              </span>
              <ScrollableSelect
                state={cuisine}
                setState={setCuisine}
                label="Country"
                placeHolder="Select a cuisine.."
                items={countries}
              />
            </div>

            {/* Cuisine choice done */}

            <div className="flex flex-col gap-2">
              <span className="text-[14px] tracking-wider text-neutral-600">
                PORTION
              </span>
              <span className="text-[13px] font-light text-neutral-500">
                Put ingredient quantities relevant to a single serving please.
              </span>
              <div className="w-fit rounded-md border border-neutral-700 bg-[var(--bg)] px-6 py-2 text-center text-xl font-semibold hover:cursor-not-allowed">
                1
              </div>
            </div>

            {/* Portion Done */}

            <div className="flex flex-col gap-2">
              <span className="text-[14px] tracking-wider text-neutral-600">
                DIFFICULTY
              </span>
              <span className="text-[13px] font-light text-neutral-500">
                How complicated is your dish?
              </span>
              <div className="flex flex-row gap-2">
                <div>
                  <label htmlFor="Easy">
                    <input
                      type="radio"
                      id="Easy"
                      name="difficulty"
                      value="Easy"
                      className="hidden"
                      defaultChecked
                      onChange={() => {
                        setRadio(1);
                      }}
                    />
                    <div
                      className={cn(
                        "rounded-sm border border-transparent bg-[var(--bg)] px-4 py-3 text-center text-lg font-semibold transition-all duration-100 hover:cursor-pointer",
                        radio == 1 && "border-neutral-700",
                      )}
                    >
                      Easy
                    </div>
                  </label>
                </div>
                <div>
                  <label htmlFor="Medium">
                    <input
                      type="radio"
                      id="Medium"
                      value="Medium"
                      name="difficulty"
                      className="hidden"
                      onChange={() => {
                        setRadio(2);
                      }}
                    />
                    <div
                      className={cn(
                        "rounded-sm border border-transparent bg-[var(--bg)] px-4 py-3 text-center text-lg font-semibold transition-all duration-100 hover:cursor-pointer",
                        radio == 2 && "border-neutral-700",
                      )}
                    >
                      Medium
                    </div>
                  </label>
                </div>
                <div>
                  <label htmlFor="Hard">
                    <input
                      type="radio"
                      id="Hard"
                      value="Hard"
                      name="difficulty"
                      className="hidden"
                      onChange={() => {
                        setRadio(3);
                      }}
                    />
                    <div
                      className={cn(
                        "rounded-sm border border-transparent bg-[var(--bg)] px-4 py-3 text-center text-lg font-semibold transition-all duration-100 hover:cursor-pointer",
                        radio == 3 && "border-neutral-700",
                      )}
                    >
                      Hard
                    </div>
                  </label>
                </div>
              </div>
            </div>

            {/* Difficulty Done  */}

            <div className="flex flex-col gap-2">
              <span className="text-[14px] tracking-wider text-neutral-600">
                PREP TIME<font className="text-rose-500"> *</font>
              </span>
              <span className="text-[13px] font-light text-neutral-500">
                How much time do you actively spend making the dish, including
                cooking time on the stove?
              </span>
              <div className="flex flex-row gap-4">
                <div className="flex flex-row gap-2">
                  <ScrollableSelect
                    state={prepHour}
                    setState={setPrepHour}
                    label="Hour"
                    placeHolder="hour"
                    items={hours}
                  />
                  <span className="self-center">Hours</span>
                </div>
                <div className="flex flex-row gap-2">
                  <ScrollableSelect
                    state={prepMin}
                    setState={setPrepMin}
                    label="Minute"
                    placeHolder="Min"
                    items={minutes}
                  />
                  <span className="self-center">Minutes</span>
                </div>
              </div>
            </div>

            {/* Prep Time Done */}

            <div className="flex flex-col gap-2">
              <span className="text-[14px] tracking-wider text-neutral-600">
                BAKING TIME
              </span>
              <span className="text-[13px] font-light text-neutral-500">
                How long does the dish need to bake for?
              </span>
              <div className="flex flex-row gap-4">
                <div className="flex flex-row gap-2">
                  <ScrollableSelect
                    state={bakeHour}
                    setState={setBakeHour}
                    label="Hour"
                    placeHolder="hour"
                    items={hours}
                  />
                  <span className="self-center">Hours</span>
                </div>
                <div className="flex flex-row gap-2">
                  <ScrollableSelect
                    state={bakeMin}
                    setState={setBakeMin}
                    label="Minute"
                    placeHolder="Min"
                    items={minutes}
                  />
                  <span className="self-center">Minutes</span>
                </div>
              </div>
            </div>

            {/* Bake Time Done */}

            <div className="flex flex-col gap-2">
              <span className="text-[14px] tracking-wider text-neutral-600">
                RESTING TIME
              </span>
              <span className="text-[13px] font-light text-neutral-500">
                Does the dish need to rest at any point? E.g. marinating,
                chilling, rising time...
              </span>
              <div className="flex flex-row gap-4">
                <div className="flex flex-row gap-2">
                  <ScrollableSelect
                    state={restHour}
                    setState={setRestHour}
                    label="Hour"
                    placeHolder="hour"
                    items={hours}
                  />
                  <span className="self-center">Hours</span>
                </div>
                <div className="flex flex-row gap-2">
                  <ScrollableSelect
                    state={restMin}
                    setState={setRestMin}
                    label="Minute"
                    placeHolder="Min"
                    items={minutes}
                  />
                  <span className="self-center">Minutes</span>
                </div>
              </div>
            </div>
          </div>
          <span className="text-lg font-semibold">
            <font className="text-rose-500">* </font> Required
          </span>
        </div>
      </div>

      {/* STEP 1 PAGE DONE */}

      {/* STEP 2 PAGE BELOW */}

      <div
        className={cn(
          "mb-40 flex w-full flex-col items-center gap-14 sm:px-4",
          step != 2 && "hidden",
        )}
      >
        <span className="px-4 text-center text-lg sm:px-0 sm:text-start">
          A recipe is nothing without the ingredients! What's in your recipe?
        </span>
        <div className="mx-auto flex w-full max-w-[800px] flex-col gap-4">
          <span className="pl-4 font-roboto text-3xl font-semibold sm:pl-0">
            Add an Ingredient
          </span>
          <div className="flex w-full flex-col gap-12 rounded-xl bg-white px-6 py-8 shadow-md sm:px-16 sm:py-10">
            <div className="flex flex-col gap-4">
              <span className="text-[14px] tracking-wider text-neutral-600">
                Ingredients Location <font className="text-rose-500"> *</font>
              </span>
              <span className="text-[13px] font-light text-neutral-500">
                Where do the ingredients that you used to create this dish come
                from?
              </span>
              <ScrollableSelect
                state={ingredientsLocation}
                setState={setIngredientsLocation}
                label="Country"
                placeHolder="Select a Country.."
                items={countries}
              />
            </div>
            <div className="flex w-full flex-col gap-4 md:flex-row">
              <div className="flex flex-col gap-4">
                <span className="text-[14px] tracking-wider text-neutral-600">
                  AMOUNT
                </span>
                <div className="flex w-full flex-row gap-2">
                  <input
                    ref={amountInput}
                    type="number"
                    placeholder="0"
                    min={0}
                    className="w-11/12 rounded-md border border-neutral-700 bg-white px-4 py-1.5 outline-[var(--theme2)]"
                  />
                  <ScrollableSelect
                    ref={secondAmountInput}
                    border="border-neutral-700"
                    state={secondAmount}
                    setState={setSecondAmount}
                    label="Specific Amounts"
                    placeHolder={secondAmount}
                    items={amounts}
                  />
                </div>
              </div>
              <div className="flex flex-col gap-4">
                <span className="text-[14px] tracking-wider text-neutral-600">
                  UNIT
                </span>
                <ScrollableSelect
                  ref={unitInput}
                  border="border-neutral-700"
                  state={unit}
                  setState={setUnit}
                  label="Unit"
                  placeHolder="Please choose a unit.."
                  items={units}
                />
              </div>
              <div className="flex flex-col gap-4">
                <span className="text-[14px] tracking-wider text-neutral-600">
                  INGREDIENT<font className="text-rose-500"> *</font>
                </span>
                <input
                  ref={ingredientInput}
                  type="text"
                  className="rounded-md border border-neutral-700 bg-white px-4 py-[7px] outline-[var(--theme2)]"
                  maxLength={60}
                  placeholder="E.g flour"
                />
                <span className="text-end text-[12px] text-neutral-600">
                  60 Chars max
                </span>
              </div>
            </div>
            <button
              onClick={() => addIngredient()}
              type="button"
              className="w-[130px] self-end rounded-md bg-[var(--theme1)] px-3 py-2 font-semibold text-white"
            >
              ADD TO LIST
            </button>
          </div>
          <span className="text-lg font-semibold">
            <font className="text-rose-500">* </font> Required
          </span>
        </div>

        <div className="mx-auto flex w-full max-w-[800px] flex-col gap-4">
          <span className="pl-4 font-roboto text-3xl font-semibold sm:pl-0">
            Ingredient List
          </span>

          {ingredients.length != 0 ? (
            <div className="flex flex-col gap-3">
              {ingredients.map((item, index) => (
                <div
                  key={index}
                  className="flex w-full flex-row items-center justify-between rounded-xl bg-white px-6 py-8 shadow-md sm:px-16 sm:py-10"
                >
                  <div className="flex flex-row gap-12">
                    <div className="flex flex-row gap-1">
                      <div>{item.amount}</div>
                      <div
                        className={cn(
                          "diagonal-fractions",
                          item.secondAmount == 0 && "hidden",
                        )}
                      >
                        {item.secondAmount}
                      </div>
                      <div>{item.unit}</div>
                    </div>
                    <div>{item.ingredient}</div>
                  </div>
                  <div
                    onClick={() => {
                      let arr = [...ingredients];
                      arr.splice(index, 1);
                      setIngredients(arr);
                    }}
                    className="grid place-items-center px-1.5 py-1 hover:cursor-pointer"
                  >
                    <i className="fa-solid fa-x text-rose-500"></i>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex w-full flex-col items-center justify-center gap-12 rounded-xl bg-white px-6 py-8 shadow-md sm:px-16 sm:py-10">
              <div className="flex flex-col items-center justify-center gap-2">
                <div>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="80"
                    height="80"
                    fill="currentColor"
                    className="bi bi-bag-x"
                    viewBox="0 0 16 16"
                  >
                    <path
                      fillRule="evenodd"
                      d="M6.146 8.146a.5.5 0 0 1 .708 0L8 9.293l1.146-1.147a.5.5 0 1 1 .708.708L8.707 10l1.147 1.146a.5.5 0 0 1-.708.708L8 10.707l-1.146 1.147a.5.5 0 0 1-.708-.708L7.293 10 6.146 8.854a.5.5 0 0 1 0-.708"
                    />
                    <path d="M8 1a2.5 2.5 0 0 1 2.5 2.5V4h-5v-.5A2.5 2.5 0 0 1 8 1m3.5 3v-.5a3.5 3.5 0 1 0-7 0V4H1v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V4zM2 5h12v9a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1z" />
                  </svg>
                </div>
                <div className="text-center text-xl font-semibold">
                  You have no ingredients on your list.
                </div>
                <div className="text-center font-light">
                  You need at least one ingredient to submit your recipe.
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* STEP 2 PAGE DONE */}

      {/* STEP 3 PAGE BELOW */}

      <div
        className={cn(
          "mb-40 flex w-full flex-col items-center gap-14 sm:px-4",
          step != 3 && "hidden",
        )}
      >
        <span className="px-4 text-center text-lg sm:px-0 sm:text-start">
          Sounds delicious! Now, it’s time to add the recipe steps and the
          utensils.
        </span>
        <div className="mx-auto flex w-full max-w-[800px] flex-col gap-4">
          <span className="pl-4 font-roboto text-3xl font-semibold sm:pl-0">
            Add a Step
          </span>
          <div className="flex w-full flex-col gap-12 rounded-xl bg-white px-6 py-8 shadow-md sm:px-16 sm:py-10">
            <span className="text-xl font-semibold text-neutral-600">{`Step ${recipeSteps.length + 1}`}</span>
            <div className="flex flex-col gap-3">
              <span className="text-[14px] tracking-wider text-neutral-600">
                STEP DESCRIPTION <font className="text-rose-500"> *</font>
              </span>
              <span className="text-[15px] text-neutral-500">
                Each recipe step should be helpful, Easy to understand, and
                focus on clear actions related to the recipe. As an example,
                here's the final step for our Rigatoni with broccoli and
                sausage: Add broccoli, rigatoni, pasta water, chili flakes,
                lemon zest and juice, and Parmesan cheese. Season with salt and
                pepper. To serve, garnish with basil and more cheese. Enjoy!
              </span>
              <textarea
                className="h-[200px] rounded-md border border-neutral-700 bg-[var(--bg)] px-5 py-3 outline-[var(--theme2)]"
                maxLength={500}
                placeholder="What needs to be done in this step?"
                ref={stepDescriptionInput}
              ></textarea>
              <span className="border-neutral-700 text-end text-[12px] font-light">
                500 Chars max
              </span>
              <button
                onClick={() => addRecipeStep()}
                type="button"
                className="w-[130px] self-end rounded-md bg-[var(--theme1)] px-4 py-2 text-xl font-semibold text-white transition-all duration-200 hover:bg-[var(--theme2)] active:scale-95"
              >
                Add step
              </button>
            </div>
          </div>
        </div>

        <div className="mx-auto flex w-full max-w-[800px] flex-col gap-4">
          <span className="pl-4 font-roboto text-3xl font-semibold sm:pl-0">
            Steps List
          </span>
          {recipeSteps.length != 0 ? (
            <div className="flex flex-col gap-3">
              {recipeSteps.map((recipeStep, index) => (
                <div
                  key={index}
                  className="flex w-full flex-col gap-4 rounded-xl bg-white px-6 py-8 shadow-md sm:px-16 sm:py-10"
                >
                  <div className="font-semibold text-neutral-600">{`Step ${index + 1}`}</div>
                  <div className="flex flex-row items-center justify-between">
                    <div>{recipeStep}</div>
                    <div
                      onClick={() => {
                        let arr = [...recipeSteps];
                        arr.splice(index, 1);
                        setRecipeSteps(arr);
                      }}
                      className="grid place-items-center px-1.5 py-1 hover:cursor-pointer"
                    >
                      <i className="fa-solid fa-x text-rose-500"></i>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex w-full flex-col items-center justify-center gap-12 rounded-xl bg-white px-6 py-8 shadow-md sm:px-16 sm:py-10">
              <div className="flex flex-col items-center justify-center gap-2">
                <div>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="80"
                    height="80"
                    fill="currentColor"
                    className="bi bi-slash-circle"
                    viewBox="0 0 16 16"
                  >
                    <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16" />
                    <path d="M11.354 4.646a.5.5 0 0 0-.708 0l-6 6a.5.5 0 0 0 .708.708l6-6a.5.5 0 0 0 0-.708" />
                  </svg>
                </div>
                <div className="text-center text-xl font-semibold">
                  You have no steps on your list.
                </div>
                <div className="text-center font-light">
                  You need at least one step to submit your recipe.
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="mx-auto flex w-full max-w-[800px] flex-col gap-4">
          <span className="pl-4 font-roboto text-3xl font-semibold sm:pl-0">
            Add a Utensil
          </span>
          <div className="flex w-full flex-col gap-12 rounded-xl bg-white px-6 py-8 shadow-md sm:px-16 sm:py-10">
            <span className="text-xl font-semibold text-neutral-600">{`Utensil ${utensilsList.length + 1}`}</span>
            <div className="flex flex-col gap-3">
              <span className="text-[14px] tracking-wider text-neutral-600">
                Utensil <font className="text-rose-500"> *</font>
              </span>
              <ScrollableSelect
                state={utensil}
                setState={setUtensil}
                label="Utensil"
                placeHolder="Select a utensil.."
                items={utensils}
              />

              <button
                onClick={() => addUtensil()}
                type="button"
                className="w-[150px] self-end rounded-md bg-[var(--theme1)] px-4 py-2 text-xl font-semibold text-white transition-all duration-200 hover:bg-[var(--theme2)] active:scale-95"
              >
                Add utensil
              </button>
            </div>
          </div>
        </div>

        <div className="mx-auto flex w-full max-w-[800px] flex-col gap-4">
          <span className="pl-4 font-roboto text-3xl font-semibold sm:pl-0">
            Utensils List
          </span>
          {utensilsList.length != 0 ? (
            <div className="flex flex-col gap-3">
              {utensilsList.map((utl, index) => (
                <div
                  key={index}
                  className="flex w-full flex-col gap-4 rounded-xl bg-white px-6 py-8 shadow-md sm:px-16 sm:py-10"
                >
                  <div className="font-semibold text-neutral-600">{`Utensil ${index + 1}`}</div>
                  <div className="flex flex-row items-center justify-between">
                    <div>{utl.charAt(0).toUpperCase() + utl.slice(1)}</div>
                    <div
                      onClick={() => {
                        let arr = [...utensilsList];
                        arr.splice(index, 1);
                        setUtensilsList(arr);
                      }}
                      className="grid place-items-center px-1.5 py-1 hover:cursor-pointer"
                    >
                      <i className="fa-solid fa-x text-rose-500"></i>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex w-full flex-col items-center justify-center gap-12 rounded-xl bg-white px-6 py-8 shadow-md sm:px-16 sm:py-10">
              <div className="flex flex-col items-center justify-center gap-2">
                <div>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="80"
                    height="80"
                    fill="currentColor"
                    className="bi bi-slash-circle"
                    viewBox="0 0 16 16"
                  >
                    <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16" />
                    <path d="M11.354 4.646a.5.5 0 0 0-.708 0l-6 6a.5.5 0 0 0 .708.708l6-6a.5.5 0 0 0 0-.708" />
                  </svg>
                </div>
                <div className="text-center text-xl font-semibold">
                  You have no utensils on your list.
                </div>
                <div className="text-center font-light">
                  You need at least one utensil to submit your recipe.
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* STEP 3 PAGE DONE */}

      {/* STEP 4 PAGE BELOW */}

      <div
        className={cn(
          "mb-40 flex w-full flex-col items-center gap-14 sm:px-4",
          step != 4 && "hidden",
        )}
      >
        <span className="px-4 text-center text-lg sm:px-0 sm:text-start">
          Almost done, chef!
        </span>
        <div className="mx-auto flex w-full max-w-[800px] flex-col gap-4">
          <span className="pl-4 font-roboto text-3xl font-semibold sm:pl-0">
            Extra Details
          </span>
          <div className="flex w-full flex-col gap-12 rounded-xl bg-white px-6 py-8 shadow-md sm:px-16 sm:py-10">
            <div className="flex flex-col gap-3">
              <span className="text-[14px] tracking-wider text-neutral-600">
                CHEF'S NOTE
              </span>
              <span className="text-light text-[13px] text-neutral-600">
                Tell us the story behind your dish or share some tips...
              </span>
              <textarea
                className="h-[200px] rounded-md border border-neutral-700 bg-[var(--bg)] px-5 py-3 outline-[var(--theme2)]"
                maxLength={500}
                placeholder="This is my favourite Dessert, exactly how my Grandma used to make it. Try it with whipped cream on top!"
                ref={recipeDescriptionInput}
              ></textarea>
              <span className="border-neutral-700 text-end text-[12px] font-light">
                500 Chars max
              </span>
            </div>
          </div>
        </div>

        <div className="mx-auto flex w-full max-w-[800px] flex-col gap-4">
          <span className="pl-4 font-roboto text-3xl font-semibold sm:pl-0">
            Category
          </span>
          <div className="flex w-full flex-col gap-12 rounded-xl bg-white px-6 py-8 shadow-md sm:px-16 sm:py-10">
            <div className="flex flex-col gap-3">
              <span className="text-[14px] tracking-wider text-neutral-600">
                DISH TYPE
              </span>
              <span className="text-light text-[13px] text-neutral-600">
                Let's add a category to make your recipe easier to find!
              </span>
              <div className="grid grid-cols-1 gap-4 min-[450px]:grid-cols-2 min-[550px]:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
                <div>
                  <label htmlFor="Starter">
                    <input
                      type="radio"
                      id="Starter"
                      name="category"
                      value="Starter"
                      className="hidden"
                      onChange={() => {
                        setCatRadio(1);
                      }}
                    />
                    <div
                      className={cn(
                        "rounded-sm border border-transparent bg-[var(--bg)] px-4 py-3 text-center text-lg font-semibold transition-all duration-100 hover:cursor-pointer",
                        catRadio == 1 && "border-neutral-700",
                      )}
                    >
                      Starter
                    </div>
                  </label>
                </div>
                <div>
                  <label htmlFor="Main">
                    <input
                      type="radio"
                      id="Main"
                      name="category"
                      value="Main"
                      className="hidden"
                      defaultChecked
                      onChange={() => {
                        setCatRadio(2);
                      }}
                    />
                    <div
                      className={cn(
                        "rounded-sm border border-transparent bg-[var(--bg)] px-4 py-3 text-center text-lg font-semibold transition-all duration-100 hover:cursor-pointer",
                        catRadio == 2 && "border-neutral-700",
                      )}
                    >
                      Main
                    </div>
                  </label>
                </div>
                <div>
                  <label htmlFor="Dessert">
                    <input
                      type="radio"
                      id="Dessert"
                      name="category"
                      value="Dessert"
                      className="hidden"
                      onChange={() => {
                        setCatRadio(3);
                      }}
                    />
                    <div
                      className={cn(
                        "rounded-sm border border-transparent bg-[var(--bg)] px-4 py-3 text-center text-lg font-semibold transition-all duration-100 hover:cursor-pointer",
                        catRadio == 3 && "border-neutral-700",
                      )}
                    >
                      Dessert
                    </div>
                  </label>
                </div>
                <div>
                  <label htmlFor="Snack">
                    <input
                      type="radio"
                      id="Snack"
                      name="category"
                      value="Snack"
                      className="hidden"
                      onChange={() => {
                        setCatRadio(4);
                      }}
                    />
                    <div
                      className={cn(
                        "rounded-sm border border-transparent bg-[var(--bg)] px-4 py-3 text-center text-lg font-semibold transition-all duration-100 hover:cursor-pointer",
                        catRadio == 4 && "border-neutral-700",
                      )}
                    >
                      Snack
                    </div>
                  </label>
                </div>
                <div>
                  <label htmlFor="Breakfast">
                    <input
                      type="radio"
                      id="Breakfast"
                      name="category"
                      value="Breakfast"
                      className="hidden"
                      onChange={() => {
                        setCatRadio(5);
                      }}
                    />
                    <div
                      className={cn(
                        "rounded-sm border border-transparent bg-[var(--bg)] px-4 py-3 text-center text-lg font-semibold transition-all duration-100 hover:cursor-pointer",
                        catRadio == 5 && "border-neutral-700",
                      )}
                    >
                      Breakfast
                    </div>
                  </label>
                </div>
                <div>
                  <label htmlFor="Beverage">
                    <input
                      type="radio"
                      id="Beverage"
                      name="category"
                      value="Beverage"
                      className="hidden"
                      onChange={() => {
                        setCatRadio(6);
                      }}
                    />
                    <div
                      className={cn(
                        "rounded-sm border border-transparent bg-[var(--bg)] px-4 py-3 text-center text-lg font-semibold transition-all duration-100 hover:cursor-pointer",
                        catRadio == 6 && "border-neutral-700",
                      )}
                    >
                      Beverage
                    </div>
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mx-auto flex w-full max-w-[800px] flex-col gap-4">
          <span className="pl-4 font-roboto text-3xl font-semibold sm:pl-0">
            Add a Tag
          </span>
          <div className="flex w-full flex-col gap-12 rounded-xl bg-white px-6 py-8 shadow-md sm:px-16 sm:py-10">
            <span className="text-xl font-semibold text-neutral-600">{`Tag ${tags.length + 1}`}</span>
            <div className="flex flex-col gap-3">
              <span className="text-[14px] tracking-wider text-neutral-600">
                Tags
              </span>
              <span className="text-light text-[13px] text-neutral-600">
                You can add some tags to make your recipe easier to find!
              </span>
              <input
                type="text"
                maxLength={20}
                ref={tagInput}
                className="rounded-lg border border-neutral-700 bg-[var(--bg)] px-5 py-3 outline-[var(--theme2)]"
                placeholder="E.g Dairy Free"
              />
              <span className="border-neutral-700 text-end text-[12px] font-light">
                20 Chars max
              </span>
              <button
                onClick={() => addTag()}
                type="button"
                className="w-[130px] self-end rounded-md bg-[var(--theme1)] px-4 py-2 text-xl font-semibold text-white transition-all duration-200 hover:bg-[var(--theme2)] active:scale-95"
              >
                Add tag
              </button>
            </div>
          </div>
        </div>

        <div className="mx-auto flex w-full max-w-[800px] flex-col gap-4">
          <span className="pl-4 font-roboto text-3xl font-semibold sm:pl-0">
            Tags List
          </span>
          {tags.length != 0 ? (
            <div className="flex flex-col gap-3">
              {tags.map((tag, index) => (
                <div
                  key={index}
                  className="flex w-full flex-col gap-4 rounded-xl bg-white px-6 py-8 shadow-md sm:px-16 sm:py-10"
                >
                  <div className="font-semibold text-neutral-600">{`Tag ${index + 1}`}</div>
                  <div className="flex flex-row items-center justify-between">
                    <div>{tag}</div>
                    <div
                      onClick={() => {
                        let arr = [...tags];
                        arr.splice(index, 1);
                        setTags(arr);
                      }}
                      className="grid place-items-center px-1.5 py-1 hover:cursor-pointer"
                    >
                      <i className="fa-solid fa-x text-rose-500"></i>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex w-full flex-col items-center justify-center gap-12 rounded-xl bg-white px-6 py-8 shadow-md sm:px-16 sm:py-10">
              <div className="flex flex-col items-center justify-center gap-2">
                <div>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="80"
                    height="80"
                    fill="currentColor"
                    className="bi bi-slash-circle"
                    viewBox="0 0 16 16"
                  >
                    <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16" />
                    <path d="M11.354 4.646a.5.5 0 0 0-.708 0l-6 6a.5.5 0 0 0 .708.708l6-6a.5.5 0 0 0 0-.708" />
                  </svg>
                </div>
                <div className="text-center text-xl font-semibold">
                  You have no tags on your list.
                </div>
                <div className="text-center font-light">Tags are optional.</div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* STEP 4 PAGE DONE */}

      {/* Footer below */}

      <div className="fixed bottom-0 z-20 flex h-[80px] w-full items-center justify-center border-t border-zinc-100 bg-white">
        <div
          className={cn(
            "mx-auto flex w-full max-w-[800px] flex-row justify-end",
            step > 1 && "justify-between",
          )}
        >
          {step > 1 && (
            <button
              onClick={() => {
                if (step > 1) {
                  setStep(step - 1);
                }
              }}
              type="button"
              className="ml-4 rounded-md bg-[var(--theme1)] px-4 py-2 text-xl font-semibold text-white transition-all duration-200 hover:bg-[var(--theme2)] active:scale-95"
            >
              Previous
            </button>
          )}
          <button
            onClick={() => {
              verifyInformation();
            }}
            type="button"
            className="mr-4 rounded-md bg-[var(--theme1)] px-4 py-2 text-xl font-semibold text-white transition-all duration-200 hover:bg-[var(--theme2)] active:scale-95"
          >
            {step < 4 ? <>Next</> : <>Create</>}
          </button>
        </div>
      </div>
    </div>
  );
};

export default page;
