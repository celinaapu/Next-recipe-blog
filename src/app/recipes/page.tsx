"use client";

import Image from "next/image";
import { RecipeData } from "../createPost/page";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Link from "next/link";

const AllRecipe = () => {
  const { data, isLoading } = useQuery<RecipeData[]>({
    queryKey: ["allRecipe"],
    queryFn: async () => {
      const response = await axios.get("/api/recipe", {
        withCredentials: true,
      });
      return response.data;
    },
  });

  if (isLoading) return <p className="text-center">Loading recipes...</p>;
  // if (isError)
  //   return (
  //     <p className="text-center text-red-500">
  //       Error: {(error as Error).message}
  //     </p>
  //   );
  return (
    <div className="w-[100%] h-[100%] flex flex-col p-6">
      <h2 className="w-full text-center"> All Recipes</h2>
      <div className=" grid grid-cols-3 gap-4">
        {data
          ?.filter((recipe) => !recipe.foodImage.includes("example.com"))
          ?.map((recipe) => {
            return (
              <Link key={recipe?._id} href={`/recipes/${recipe?._id}`}>
                <div
                  key={recipe?._id}
                  className="border p-4 rounded shadow hover:shadow-lg transition"
                >
                  <Image
                    src={recipe?.foodImage}
                    alt={recipe?.title}
                    width={800}
                    height={600}
                    className="w-32 h-32 rounded-md object-cover mb-4"
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
