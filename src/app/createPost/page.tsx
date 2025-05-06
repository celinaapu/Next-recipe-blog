"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { DevTool } from "@hookform/devtools";
import axios from "axios";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

export type RecipeData = {
  _id: string;
  title: string;
  foodImage: string;
  description: string;
  recipe: string[];
  procedure: string;
  profileImage: string;
  name: string;
  servingSuggestion: string;
};

const CreatePost = () => {
  const form = useForm<RecipeData>();
  const router = useRouter();
  const { register, handleSubmit, control, formState } = form;
  const { errors } = formState;

  const { mutate, isPending } = useMutation({
    mutationFn: (newRecipe: RecipeData) => {
      return axios.post("/api/recipe", newRecipe, {
        withCredentials: true,
      });
    },
    mutationKey: ["createRecipe"],
    onSuccess: () => {
      return router.push("/");
    },

    onError: (error) => {
      console.error(" Error creating your Recipe:", error);
    },
  });

  const onSubmit = (data: RecipeData) => {
    console.log("Form data is submitted:", data);
    mutate(data);
  };

  return (
    <div className="w-full h-screen p-6 text-black shadow overflow-y-auto">
      <h2 className="text-center font-extrabold text-2xl mb-6">
        Create a New Recipe
      </h2>
      <form
        onSubmit={handleSubmit(onSubmit)}
        noValidate
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
          <p className="text-red-500 text-left align-left text-sm">
            {errors.title?.message}
          </p>
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
          <p className="text-red-500 text-left align-left text-sm">
            {errors.description?.message}
          </p>
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
          <p className="text-red-500 text-left align-left text-sm">
            {errors.foodImage?.message}{" "}
          </p>
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
          <p className="text-red-500 text-left align-left text-sm">
            {errors.recipe?.message}
          </p>
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
          <p className="text-red-500 text-left align-left text-sm">
            {errors.procedure?.message}
          </p>
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
          <p className="text-red-500 text-left align-left text-sm">
            {errors.servingSuggestion?.message}
          </p>
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
          <p className="text-red-500 text-left align-left text-sm">
            {errors.name?.message}
          </p>
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
          <p className="text-red-500 text-left align-left text-sm">
            {errors.profileImage?.message}
          </p>
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
          <p>Creating...</p>
        </div>
      )}
      <DevTool control={control} />
    </div>
  );
};

export default CreatePost;
