"use client";

import Image from "next/image";
import { RecipeData } from "../../createPost/page";
import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useParams } from "next/navigation";
import { FaRegEdit } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";
import Link from "next/link";
import router from "next/router";

const fetchRecipe = async (_id: string) => {
  const { data } = await axios.get(`/api/recipe/${_id}`, {
    withCredentials: true,
  });
  return data;
};

const SinglePage: React.FC<RecipeData> = () => {
  const params = useParams();
  const recipeId = params.id as string;
  console.log("recipe", recipeId);
  const { data, isLoading, error } = useQuery({
    queryKey: ["singleRecipe", recipeId],
    queryFn: () => fetchRecipe(recipeId),
    enabled: !!recipeId,
  });

  const deleteMutation = useMutation({
    mutationFn: async () => {
      await axios.delete(`/api/recipe/${recipeId}`, {
        withCredentials: true,
      });
    },
    onSuccess: () => {
      alert("Recipe deleted successfully!");
      router.push("/"); // Redirect to homepage or recipe list
    },
    onError: (err) => {
      console.error("Failed to delete recipe:", err);
      alert("Something went wrong while deleting.");
    },
  });

  if (isLoading) return <p className="text-center">Loading...</p>;
  if (error)
    return <p className="text-center text-red-500">Error loading recipe.</p>;

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-4">{data.title}</h1>

      <Image
        src={data.foodImage}
        alt={data.title}
        width={800}
        height={600}
        className="w-full h-64 object-cover rounded-xl shadow mb-6"
      />

      <div className="mb-4 text-gray-700">{data.description}</div>

      <div className="mb-6">
        <h2 className="text-2xl font-semibold mb-2">Ingredients</h2>
        <ul className="list-disc pl-6 space-y-1">
          {data.recipe.map((item: string, index: string) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      </div>

      <div className="mb-6">
        <h2 className="text-2xl font-semibold mb-2">Procedure</h2>
        <p className="text-gray-700 whitespace-pre-line">{data.procedure}</p>
      </div>

      <div className="mb-6">
        <h2 className="text-2xl font-semibold mb-2">Serving Suggestion</h2>
        <p className="text-gray-700">{data.servingSuggestion}</p>
      </div>

      <div className="flex items-center gap-4 mt-8 border-t pt-4">
        <Image
          src={data.profileImage.trim()}
          alt={data.name}
          width={800}
          height={600}
          className="w-12 h-12 rounded-full object-cover"
        />
        <span className="text-gray-800 font-medium">By {data.name}</span>
      </div>
      <div className="w-full flex flex-row text-end ">
        <Link href="/edit-recipe">
          <div role="button" className="">
            <FaRegEdit />
          </div>
        </Link>
        <button
          onClick={() => {
            const confirmDelete = window.confirm(
              "Are you sure you want to delete this recipe?"
            );
            if (confirmDelete) {
              deleteMutation.mutate();
            }
          }}
        >
          <MdDeleteForever className="text-red-600 hover:text-red-800 cursor-pointer" />
        </button>
      </div>
    </div>
  );
};

export default SinglePage;
