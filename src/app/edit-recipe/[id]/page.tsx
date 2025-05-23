"use client";

import { api } from "@recipeblog/utils/axios";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { MdUpdate } from "react-icons/md";

export type RecipeData = {
  _id: string;
  title: string;
  foodImage: string;
  description: string;
  recipe: string[] | string;
  procedure: string;
  profileImage: string;
  name: string;
  servingSuggestion: string;
};

const EditRecipe = () => {
  const router = useRouter();
  const params = useParams();
  const recipeId = params?.id as string;

  const form = useForm<RecipeData>();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, touchedFields },
  } = form;

  const { data: existingRecipe, isLoading } = useQuery<RecipeData>({
    queryKey: ["recipe", recipeId],
    queryFn: async () => {
      const res = await api.get(`/api/recipe/${recipeId}`);
      return res.data;
    },
    enabled: !!recipeId, // Only run if ID is present
  });

  useEffect(() => {
    if (existingRecipe) {
      reset({
        ...existingRecipe,
        recipe: Array.isArray(existingRecipe.recipe)
          ? existingRecipe.recipe.join(", ")
          : existingRecipe.recipe,
      });
    }
  }, [existingRecipe, reset]);

  const { mutate, isPending } = useMutation({
    mutationFn: (updatedRecipe: RecipeData) =>
      api.put(`/api/recipe/${recipeId}`, updatedRecipe, {
        withCredentials: true,
      }),
    onSuccess: () => router.push("/"),
    onError: (err) => console.error("Error updating recipe:", err),
  });

  const onSubmit = (data: RecipeData) => {
    mutate(data);
  };

  if (isLoading) return <p> Loading....</p>;

  return (
    <div className="w-full h-screen p-6 text-black shadow overflow-y-auto">
      <div className="p-6 flex flex-row font-extrabold gap-2 justify-center text-center w-full">
        <MdUpdate className="text-[28px] mt-1 text-center" />
        <h2 className="text-center text-2xl">Edit your Recipe</h2>
      </div>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-[80%] mx-auto flex flex-col space-y-4"
      >
        <div>
          <label htmlFor="title" className="font-semibold block text-lg">
            Title
          </label>
          <input
            type="text"
            id="title"
            className="w-full h-10 p-2 border border-gray-300 rounded focus:outline-none"
            {...register("title", { required: "title is required" })}
          />
          {touchedFields.title && errors.title && (
            <p className="text-red-500 text-left align-left text-sm">
              {errors.title.message}
            </p>
          )}
        </div>
        <div>
          <label htmlFor="description" className="font-semibold block text-lg">
            Description
          </label>
          <textarea
            id="description"
            {...register("description", {
              required: "Description is required",
            })}
            className="w-full h-16 p-2 border border-gray-300 rounded focus:outline-none"
          />
          {touchedFields.description && errors.description && (
            <p className="text-red-500 text-left align-left text-sm">
              {errors.description.message}
            </p>
          )}
        </div>
        <div>
          <label htmlFor="foodImage" className="font-semibold block text-lg">
            Food Image
          </label>
          <input
            type="text"
            id="foodImage"
            placeholder="Enter Image URL..."
            {...register("foodImage", {
              required: "You no add image of your food ",
            })}
            className="w-full p-2 border border-gray-300 rounded focus:outline-none"
          />
          {touchedFields.foodImage && errors.foodImage && (
            <p className="text-red-500 text-left align-left text-sm">
              {errors.foodImage.message}
            </p>
          )}
        </div>
        <div>
          <label htmlFor="recipe" className="font-semibold block text-lg">
            Recipe
          </label>
          <textarea
            id="recipe"
            {...register("recipe", { required: "Recipe is required" })}
            className="w-full h-36 p-2 border border-gray-300 rounded focus:outline-none"
          />
          {touchedFields.recipe && errors.recipe && (
            <p className="text-red-500 text-left align-left text-sm">
              {errors.recipe.message}
            </p>
          )}
        </div>
        <div>
          <label htmlFor="procedure" className="font-semibold block text-lg">
            Procedure
          </label>
          <textarea
            id="procedure"
            required
            {...register("procedure", {
              required: "Please you step by step procedures",
            })}
            className="w-full h-52 p-2 border border-gray-300 rounded focus:outline-none"
          />
          {touchedFields.procedure && errors.procedure && (
            <p className="text-red-500 text-left align-left text-sm">
              {errors.procedure.message}
            </p>
          )}
        </div>
        <div>
          <label
            htmlFor="servingSuggestion"
            className="font-semibold block text-lg"
          >
            Serving Suggestion
          </label>
          <textarea
            id="servingSuggestion"
            required
            {...register("servingSuggestion", {
              required: "We will like to know what you food can be served with",
            })}
            className="w-full p-2 border border-gray-300 rounded focus:outline-none"
          />
          {touchedFields.servingSuggestion && errors.servingSuggestion && (
            <p className="text-red-500 text-left align-left text-sm">
              {errors.servingSuggestion.message}
            </p>
          )}
        </div>
        <div>
          <label htmlFor="name" className="font-semibold block text-lg">
            Name
          </label>
          <input
            type="text"
            id="name"
            placeholder="Enter your name"
            {...register("name", { required: "please add your name" })}
            className="w-full h-10 p-2 border border-gray-300 rounded focus:outline-none"
          />
          {touchedFields.name && errors.name && (
            <p className="text-red-500 text-left align-left text-sm">
              {errors.name.message}
            </p>
          )}
        </div>
        <div>
          <label htmlFor="profileimage" className="font-semibold block text-lg">
            Profile Picture
          </label>
          <input
            type="text"
            id="profileImage"
            placeholder="Enter Image URL..."
            {...register("profileImage", {
              required: "Please add a picture of yourself",
            })}
            className="w-full p-2 border border-gray-300 rounded focus:outline-none"
          />
          {touchedFields.profileImage && errors.profileImage && (
            <p className="text-red-500 text-left align-left text-sm">
              {errors.profileImage.message}
            </p>
          )}
        </div>
        <div className="pt-6">
          <button
            type="submit"
            value="Custom Reset Field Values & Errors"
            className="w-full h-14 text-lg font-bold text-white bg-purple-500 hover:bg-purple-800 rounded focus:outline-none"
          >
            Upload your recipe
          </button>
        </div>
      </form>
      {isPending && (
        <div className="mt-4 text-center text-green-500">
          <p>Updatind</p>
        </div>
      )}
    </div>
  );
};

export default EditRecipe;
