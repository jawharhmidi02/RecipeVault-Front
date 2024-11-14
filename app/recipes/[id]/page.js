"use client";
import { cn } from "@/lib/utils";
import { useParams, useRouter } from "next/navigation";
import React, { Suspense } from "react";

const page = () => {
  const searchParams = useParams();
  const id = searchParams.id;
  const router = useRouter();
  const redirectToUser = (userId) => {
    router.push(`/profile/${userId}`);
  };
  const recipe = {
    id: "455048ce-38c3-4e0e-b5d0-3f47c54f7e9f",
    title: "Grilled Salmon",
    steps: ["3abi", "meow"],
    description:
      " Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptates voluptatem accusamus aspernatur, dicta voluptas inventore non illo dolorem impedit provident illum cumque fugit nihil accusantium ut sit atque, deleniti minus. Quia minus culpa delectus, cupiditate voluptatem id! Sed repellendus corporis maiores rerum quis? Vero voluptates soluta, ea consectetur eligendi rem! Iusto assumenda quam deleniti unde velit reprehenderit culpa. Saepe reprehenderit eveniet enim minus ducimus, nobis modi nostrum suscipit omnis perspiciatis totam rerum corrupti, est nisi corporis veritatis ut odio. Rerum, enim dolor? Hic excepturi deleniti perferendis sed! Ipsam commodi nobis molestiae dicta harum quam neque nesciunt! Illum, voluptatibus itaque! Porro?",
    ingredientsLocation: "Tunis",
    cuisineLocation: "Brazil",
    ingredients: ["Tomato"],
    is_approved: false,
    is_rejected: false,
    rejection_reason: null,
    approvedAt: null,
    user: {
      dialogues: [],
      email: "lafiraed04@gmail.com",
      id: "dee658f7-0f25-4b13-9729-e0b8282a57f3",
      full_name: "Lafi Raed",
      phone: "+21650974080",
      role: "client",
      nonce: null,
    },
    img: "https://www.shutterstock.com/image-photo/fried-salmon-steak-cooked-green-600nw-2489026949.jpg",
    tags: ["tag5", "tag2"],
    type: "Starter",
    difficulty: "Easy",
    prepTime: 2,
    bakingTime: 10,
    restingTime: 0,
    likes: 0,
  };
  return (
    <div className="mx-auto flex w-full items-center justify-center">
      <div className="flex w-full max-w-[800px] flex-col gap-4 mx-5">
        <div className="flex flex-row items-center gap-2">
          <div
            onClick={() => {
              router.push("/recipes");
            }}
            className="font-light text-neutral-500 transition-all duration-100 hover:cursor-pointer hover:text-neutral-800"
          >
            Recipes
          </div>
          <div className="flex items-end justify-end">
            <i className="fa-solid fa-chevron-right text-[12px] font-thin text-neutral-400"></i>
          </div>
          <div className="text-neutral-900">{recipe.title}</div>
        </div>
        <img
          src={recipe.img}
          alt="meal"
          className="rounded-xl object-cover"
        ></img>
        <div className="flex flex-row items-center gap-8">
          <div className="text-3xl font-bold text-neutral-800">
            {recipe.title}
          </div>
          <div className="flex w-fit flex-row items-center gap-2">
            <div className="relative">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="peer z-10 size-10 opacity-100 transition-all peer-hover:opacity-0"
                viewBox="0 0 512 512"
              >
                <path
                  fill="#737373"
                  d="M225.8 468.2l-2.5-2.3L48.1 303.2C17.4 274.7 0 234.7 0 192.8l0-3.3c0-70.4 50-130.8 119.2-144C158.6 37.9 198.9 47 231 69.6c9 6.4 17.4 13.8 25 22.3c4.2-4.8 8.7-9.2 13.5-13.3c3.7-3.2 7.5-6.2 11.5-9c0 0 0 0 0 0C313.1 47 353.4 37.9 392.8 45.4C462 58.6 512 119.1 512 189.5l0 3.3c0 41.9-17.4 81.9-48.1 110.4L288.7 465.9l-2.5 2.3c-8.2 7.6-19 11.9-30.2 11.9s-22-4.2-30.2-11.9zM239.1 145c-.4-.3-.7-.7-1-1.1l-17.8-20-.1-.1s0 0 0 0c-23.1-25.9-58-37.7-92-31.2C81.6 101.5 48 142.1 48 189.5l0 3.3c0 28.5 11.9 55.8 32.8 75.2L256 430.7 431.2 268c20.9-19.4 32.8-46.7 32.8-75.2l0-3.3c0-47.3-33.6-88-80.1-96.9c-34-6.5-69 5.4-92 31.2c0 0 0 0-.1 .1s0 0-.1 .1l-17.8 20c-.3 .4-.7 .7-1 1.1c-4.5 4.5-10.6 7-16.9 7s-12.4-2.5-16.9-7z"
                />
              </svg>
              <svg
                onClick={() => {
                  // code when like button pressed
                }}
                xmlns="http://www.w3.org/2000/svg"
                className="duration-50 peer absolute -left-[1px] -top-[1px] size-[42px] opacity-0 transition-all hover:cursor-pointer hover:opacity-100"
                viewBox="0 0 512 512"
              >
                <path
                  fill="#ff8787"
                  d="M47.6 300.4L228.3 469.1c7.5 7 17.4 10.9 27.7 10.9s20.2-3.9 27.7-10.9L464.4 300.4c30.4-28.3 47.6-68 47.6-109.5v-5.8c0-69.9-50.5-129.5-119.4-141C347 36.5 300.6 51.4 268 84L256 96 244 84c-32.6-32.6-79-47.5-124.6-39.9C50.5 55.6 0 115.2 0 185.1v5.8c0 41.5 17.2 81.2 47.6 109.5z"
                />
              </svg>
            </div>
            <div className="text-lg font-bold text-neutral-500">
              {recipe.likes}
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
            <div className="flex flex-col items-center justify-center gap-4">
              <div
                onClick={() => redirectToUser(recipe.user.id)}
                className="text-xl font-semibold text-neutral-800 transition-all duration-100 hover:cursor-pointer hover:text-[var(--theme2)]"
              >
                {recipe.user.full_name}
              </div>
              <div
                className={cn(
                  "hidden",
                  recipe.user.role == "client" && "block",
                )}
              >
                <div className="font-light text-neutral-500">Normal User</div>
              </div>
              <div className="font-light text-neutral-500">
                {recipe.user.email}
              </div>
            </div>
          </div>

          <div className="">{`"${recipe.description}"`}</div>
        </div>
        <div className="mb-4 mt-4 h-[1px] w-full bg-neutral-300"></div>
        <div className="grid grid-cols-2 min-[500px]:grid-cols-4 gap-y-10 bg-neutral-200 rounded-xl py-6 px-4">
          <div className="flex flex-col items-center justify-center gap-4">
            <div>
              Difficulty
            </div>
            <div className="font-semibold text-lg">
              { recipe.difficulty }
            </div>

          </div>
          <div className="flex flex-col items-center justify-center gap-4">
            <div>
              Preparation
            </div>
            <div className="font-semibold text-lg">
              40 Min
            </div>

          </div>
          <div className="flex flex-col items-center justify-center gap-4">
            <div>
              Baking
            </div>
            <div className="font-semibold text-lg">
              20 Min
            </div>

          </div>
          <div className="flex flex-col items-center justify-center gap-4">
            <div>
              Resting
            </div>
            <div className="font-semibold text-lg">
              10 Min
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
