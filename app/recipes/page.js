import Recipes from "@/components/recipes/recipes";
import { Suspense } from "react";

const page = () => {
  return (
    <Suspense>
      <Recipes />
    </Suspense>
  );
};

export default page;
