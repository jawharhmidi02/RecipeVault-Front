import Recipes from "@/components/recipes/recipes";
import { Suspense } from "react";

const page = () => {
  return (
    <Suspense
      fallback={
        <div className="inset-0 flex h-screen w-full items-center justify-center bg-[var(--bg)] backdrop-blur-sm">
          <div className="h-14 w-14 animate-spin rounded-full border-b-4 border-[var(--theme1)]"></div>
        </div>
      }
    >
      <Recipes />
    </Suspense>
  );
};

export default page;
