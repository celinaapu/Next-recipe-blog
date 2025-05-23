"use client";

import Image from "next/image";
import { RecipeData } from "../create-recipe/page";
import Link from "next/link";

// type Recipe = {
//   _id: string;
//   title: string;
//   description: string;
// };

// interface AllRecipeprops {
//   recipe: Recipe[];
// }

const AllRecipe = ({
  data,
  isLoading,
}: {
  data?: RecipeData[];
  isLoading: boolean;
}) => {
  if (isLoading) return <p className="text-center">Loading recipes...</p>;
  return (
    <div className="w-[100%] h-[100%] flex flex-col p-6">
      <h2 className="w-full text-center"> All Recipes</h2>
      <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-3 gap-6">
        {data
          ?.filter((recipe) => !recipe.foodImage.includes("example.com"))
          ?.map((recipe) => {
            return (
              <Link key={recipe?._id} href={`/recipes/${recipe?._id}`}>
                <div
                  key={recipe?._id}
                  className="border flex flex-col p-4 rounded shadow hover:shadow-lg transition "
                >
                  <Image
                    src={recipe?.foodImage}
                    alt={recipe?.title}
                    width={800}
                    height={600}
                    className="w-full h-32 rounded-md object-cover mb-4"
                  />
                  <h3 className="text-xl font-semibold">{recipe?.title}</h3>
                  <p className="text-gray-600">{recipe?.description}</p>

                  <div className="flex flex-rol text-center items-center">
                    <Image
                      src={recipe.profileImage.trim()}
                      alt={recipe.name}
                      width={150}
                      height={100}
                      className="rounded-full w-[36px] h-[36px] mt-3"
                    />
                    <h5 className="ml-4">{recipe.name}</h5>
                  </div>
                </div>
              </Link>
            );
          })}
      </div>
    </div>
  );
};

export default AllRecipe;
