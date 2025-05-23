"use client";

import { FaSearch } from "react-icons/fa";
import Footer from "@recipeblog/components/Footer";
import AllRecipe from "./recipes/page";
import { useState } from "react";
import { api } from "@recipeblog/utils/axios";
import { useQuery } from "@tanstack/react-query";
import { RecipeData } from "./create-recipe/page";

export default function Home() {
  const [searchQuery, setSearchQuery] = useState("");

  const { data, isLoading, refetch } = useQuery<RecipeData[]>({
    queryKey: ["getRecipe"],
    queryFn: async () => {
      const response = await api.get(
        `/api/recipe?searchedText=${searchQuery}`,
        {
          withCredentials: true,
        }
      );
      return response.data;
    },
  });

  return (
    <div className=" h-screen ">
      <div className="bg-mainBackground bg-cover flex w-full h-[60%] items-center">
        <div className="pt-36 items-center text-center flex flex-col ">
          <div className="relative rounded-md text-center items-center flex flex-row w-[80%] border border-gray-300">
            <input
              type="text"
              placeholder="Search food type..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-4 w-[95%] h-14 text-white bg-transparent focus:outline-none  "
            />
            <button onClick={() => refetch()}>
              <FaSearch className=" text-gray-400" />
            </button>
          </div>
          <p className="text-gray-300 text-center sm:text-xl  max-w-auto pt-4 text-lg  w-[80%] items-center flex ">
            Welcome to Salford & Co where delicious meets simple! Explore a wide
            variety of easy-to-follow recipes, cooking tips, and helpful tricks.
            Whether you are a beginner or a pro, we’ve got something to inspire
            your next meal.
          </p>
        </div>
      </div>
      <div>
        <AllRecipe data={data} isLoading={isLoading} />
      </div>
      <div>
        <Footer />
      </div>
    </div>
  );
}
