"use client";

import Image from "next/image";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { FaFacebook } from "react-icons/fa";
import { FaWhatsappSquare } from "react-icons/fa";
import { FaInstagramSquare } from "react-icons/fa";
import { FaRegEdit } from "react-icons/fa";
import { FaUserCircle } from "react-icons/fa";
import { FaPlusCircle } from "react-icons/fa";
import { FaUtensils } from "react-icons/fa";
import { useQuery } from "@tanstack/react-query";
import { api } from "@recipeblog/utils/axios";

type ProfileInfo = {
  name: string;
  email: string;
  bio: string;
  profileImage: string | null;
  socialhandle: {
    instagram: string;
    facebook: string;
    whatsapp: string;
  };
};

const Profile = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [isEditing, setIsEditing] = useState(false);

  const form = useForm<ProfileInfo>({
    defaultValues: {
      name: "",
      email: "",
      bio: "",
      profileImage: null,
      socialhandle: {
        instagram: "",
        facebook: "",
        whatsapp: "",
      },
    },
  });

  const { register, handleSubmit, formState, watch, setValue } = form;
  const { errors } = formState;

  const userProfileImage = watch("profileImage");

  // Fetch user profile data
  useEffect(() => {
    console.log(" about to slp");
    const fetchUser = async () => {
      setLoading(true);
      try {
        const res = await api.get("/api/users/my-profile", {
          withCredentials: true,
        });

        if (res.data) {
          const userData = {
            ...res.data,
            socialhandle: res.data.socialhandle || {
              instagram: "",
              facebook: "",
              whatsapp: "",
            },
          };

          form.reset(userData);
        }
      } catch (error) {
        console.error("Failed to load user data:", error);
        setError("Failed to load profile data. Please try again later.");
      } finally {
        setLoading(false);
      }
    };
    console.log("sleeping");

    fetchUser();
  }, [form]);

  // Fetch user recipes
  const fetchUserRecipes = async () => {
    try {
      const res = await api.get("/api/recipe/user/my-recipes", {
        withCredentials: true,
      });

      if (!res.data) {
        throw new Error("Failed to fetch recipes");
      }

      return res.data;
    } catch (error) {
      console.error("Error fetching recipes:", error);
      throw new Error("Failed to fetch recipes");
    }
  };

  const {
    data: userRecipes,
    isLoading: recipesLoading,
    isError: recipesError,
  } = useQuery({
    queryKey: ["userRecipes"],
    queryFn: fetchUserRecipes,
  });

  const onSubmit = async (data: ProfileInfo) => {
    try {
      await api.put("/api/users/edit-my-profile", data, {
        withCredentials: true,
      });
      setIsEditing(false);
    } catch (err) {
      console.error("Failed to update profile", err);
      setError("Failed to update profile. Please try again.");
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setValue("profileImage", reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-slate-100">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="mt-4 text-gray-700">Loading your profile...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 bg-slate-100 min-h-screen">
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      <div className="max-w-5xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="bg-gradient-to-r from-purple-500 to-blue-500 h-32"></div>

        <form onSubmit={handleSubmit(onSubmit)} className="px-6 py-8">
          <div className="flex flex-col md:flex-row gap-8">
            <div className="w-full md:w-1/3 flex flex-col items-center text-center -mt-20">
              <div className="relative">
                {userProfileImage ? (
                  <Image
                    src={userProfileImage}
                    alt="Profile Picture"
                    width={160}
                    height={160}
                    className="w-40 h-40 rounded-full object-cover border-4 border-white shadow-lg"
                  />
                ) : (
                  <FaUserCircle className="w-40 h-40 text-gray-400 rounded-full bg-white" />
                )}

                {isEditing && (
                  <div className="absolute bottom-0 right-0">
                    <label
                      htmlFor="profileImage"
                      className=" text-[12] text-black p-2 rounded-full cursor-pointer shadow"
                    >
                      <FaRegEdit className="text-lg" />
                      <input
                        type="file"
                        id="profileImage"
                        className="hidden"
                        accept="image/*"
                        onChange={handleImageUpload}
                      />
                    </label>
                  </div>
                )}
              </div>

              <div className="mt-6">
                <h3 className="text-lg font-semibold mb-3">Connect with me</h3>
                <div className="flex justify-center gap-4 text-3xl">
                  <a
                    href={watch("socialhandle.facebook")}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <FaFacebook className="text-blue-600 hover:text-blue-700 transition-colors" />
                  </a>
                  <a
                    href={watch("socialhandle.instagram")}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <FaInstagramSquare className="text-pink-600 hover:text-pink-700 transition-colors" />
                  </a>
                  <a
                    href={`https://wa.me/${watch("socialhandle.whatsapp")}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <FaWhatsappSquare className="text-green-600 hover:text-green-700 transition-colors" />
                  </a>
                </div>

                {/* Social Handles Form */}
                {isEditing && (
                  <div className="mt-4 space-y-3">
                    <div>
                      <label
                        htmlFor="facebook"
                        className="block text-sm font-medium text-gray-700 mb-1"
                      >
                        Facebook URL
                      </label>
                      <input
                        id="facebook"
                        type="text"
                        {...register("socialhandle.facebook")}
                        placeholder="https://facebook.com/username"
                        className="w-full border border-gray-300 p-2 rounded-md text-sm"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="instagram"
                        className="block text-sm font-medium text-gray-700 mb-1"
                      >
                        Instagram URL
                      </label>
                      <input
                        id="instagram"
                        type="text"
                        {...register("socialhandle.instagram")}
                        placeholder="https://instagram.com/username"
                        className="w-full border border-gray-300 p-2 rounded-md text-sm"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="whatsapp"
                        className="block text-sm font-medium text-gray-700 mb-1"
                      >
                        WhatsApp Number
                      </label>
                      <input
                        id="whatsapp"
                        type="text"
                        {...register("socialhandle.whatsapp")}
                        placeholder="Your WhatsApp number"
                        className="w-full border border-gray-300 p-2 rounded-md text-sm"
                      />
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div className="w-full md:w-2/3 space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold text-gray-800">
                  Profile Information
                </h2>
                {!isEditing ? (
                  <button
                    type="button"
                    className="bg-purple-500 hover:bg-purple-600 text-white px-4 py-2 rounded-md flex items-center gap-2 transition-colors"
                    onClick={() => setIsEditing(true)}
                  >
                    <FaRegEdit />
                    Edit Profile
                  </button>
                ) : (
                  <button
                    type="button"
                    className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-md transition-colors"
                    onClick={() => setIsEditing(false)}
                  >
                    Cancel
                  </button>
                )}
              </div>

              <div className="grid gap-6">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Name
                  </label>
                  <input
                    id="name"
                    type="text"
                    disabled={!isEditing}
                    {...register("name", { required: "Name is required" })}
                    placeholder="Enter your name"
                    className={`w-full p-3 rounded-md ${
                      isEditing
                        ? "border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        : "bg-gray-100 text-gray-800"
                    }`}
                  />
                  {errors.name && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.name.message}
                    </p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Email
                  </label>
                  <input
                    id="email"
                    type="email"
                    disabled={!isEditing}
                    {...register("email", {
                      required: "Email is required",
                      pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                        message: "Invalid email address",
                      },
                    })}
                    placeholder="Enter your email"
                    className={`w-full p-3 rounded-md ${
                      isEditing
                        ? "border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        : "bg-gray-100 text-gray-800"
                    }`}
                  />
                  {errors.email && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.email.message}
                    </p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="bio"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Bio
                  </label>
                  <textarea
                    id="bio"
                    disabled={!isEditing}
                    {...register("bio")}
                    placeholder="Tell us about yourself"
                    rows={4}
                    className={`w-full p-3 rounded-md ${
                      isEditing
                        ? "border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        : "bg-gray-100 text-gray-800"
                    } resize-none`}
                  />
                </div>
              </div>

              {isEditing && (
                <div className="pt-4">
                  <button
                    type="submit"
                    className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 rounded-md transition-colors"
                  >
                    Save Profile
                  </button>
                </div>
              )}
            </div>
          </div>
        </form>
      </div>

      <div className="max-w-5xl mx-auto mt-8 bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-800">
              <FaUtensils className="inline-block mr-2 text-purple-500" />
              Your Recipes
            </h2>
            <Link
              href="/create-recipe"
              className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md flex items-center gap-2 transition-colors"
            >
              <FaPlusCircle />
              Create Recipe
            </Link>
          </div>

          {recipesLoading && (
            <div className="text-center py-8">
              <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
              <p className="mt-4 text-gray-700">Loading recipes...</p>
            </div>
          )}

          {recipesError && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
              Failed to load recipes. Please try again.
            </div>
          )}

          {!recipesLoading && !recipesError && userRecipes?.length === 0 && (
            <div className="text-center py-8 bg-gray-50 rounded-lg">
              <div className="text-gray-500 mb-4">
                <FaUtensils className="text-5xl mx-auto opacity-30" />
              </div>
              <p className="text-gray-600 mb-4">
                You have not created any recipes yet.
              </p>
              <Link
                href="/create-recipe"
                className="text-blue-500 hover:text-blue-700 font-medium"
              >
                Create your first recipe →
              </Link>
            </div>
          )}

          {!recipesLoading && !recipesError && userRecipes?.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {userRecipes.map((recipe) => (
                <Link href={`/recipe/${recipe.id}`} key={recipe.id}>
                  <div className="border rounded-lg overflow-hidden hover:shadow-md transition-shadow">
                    {recipe.image ? (
                      <Image
                        src={recipe.image}
                        alt={recipe.title}
                        width={400}
                        height={200}
                        className="w-full h-40 object-cover"
                      />
                    ) : (
                      <div className="w-full h-40 bg-gray-200 flex items-center justify-center">
                        <FaUtensils className="text-3xl text-gray-400" />
                      </div>
                    )}
                    <div className="p-4">
                      <h3 className="font-semibold text-lg mb-1 truncate">
                        {recipe.title}
                      </h3>
                      <p className="text-sm text-gray-600 line-clamp-2">
                        {recipe.description}
                      </p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;

// "use client";

// import { DevTool } from "@hookform/devtools";
// import PagePic from "../../../public/assets/images/images.jpeg";
// import Image from "next/image";
// import { useForm } from "react-hook-form";
// import { useEffect, useState } from "react";
// import { FaFacebook } from "react-icons/fa";
// import { FaWhatsappSquare } from "react-icons/fa";
// import { FaInstagramSquare } from "react-icons/fa";
// import { FaRegEdit } from "react-icons/fa";
// import axios from "axios";

// type ProfileInfo = {
//   name: string;
//   email: string;
//   bio: string;
//   profileImage: string;
//   socialhandle: {
//     instagram: string;
//     facebook: string;
//     whatsapp: string;
//   };
// };

// const Profile = () => {
//   const form = useForm<ProfileInfo>({
//     defaultValues: {
//       name: "",
//       email: "",
//       bio: "",
//       profileImage: "",
//       socialhandle: {
//         instagram: "",
//         facebook: "",
//         whatsapp: "",
//       },
//     },
//   });

//   useEffect(() => {
//     const fetchUser = async () => {
//       try {
//         const res = await axios.get("/api/user", {
//           withCredentials: true,
//         });
//         form.reset(res.data); // 🔥 Prefill the form with user data
//       } catch (error) {
//         console.error("Failed to load user data:", error);
//       }
//     };

//     fetchUser();
//   }, [form]);

//   const [isEditing, setIsEditing] = useState(false);
//   const { register, handleSubmit, control, formState } = form;
//   const { errors } = formState;

//   const onSubmit = async (data: ProfileInfo) => {
//     try {
//       await axios.put("/api/user", data, { withCredentials: true });
//       setIsEditing(false);
//     } catch (err) {
//       console.error("Failed to update profile", err);
//     }
//   };

//   return (
//     <div className="p-6 bg-slate-300 w-[100%] h-full overflow-y-auto">
//       <form
//         onSubmit={handleSubmit(onSubmit)}
//         className="w-full max-w-5xl mx-auto flex flex-row gap-6"
//       >
//         <div className="w-[30%] md:w-1/3 flex">
//           <div className="flex flex-col items-center text-center">
//             <Image
//               src={PagePic}
//               alt="Profile Picture"
//               className="w-64 h-64 rounded-full object-cover mt-4"
//             />
//           </div>
//         </div>
//         <div className="w-[70%] space-y-6">
//           <div>
//             {isEditing && (
//               <label htmlFor="name" className="block font-semibold mb-1">
//                 Name
//               </label>
//             )}
//             <input
//               id="name"
//               type="text"
//               disabled={!isEditing}
//               {...register("name")}
//               placeholder="Enter your name"
//               className="w-full border p-2 rounded"
//             />
//             <p className="text-red-500 text-left align-left text-sm">
//               {errors.profileImage?.message}
//             </p>
//           </div>
//           <div>
//             {isEditing && (
//               <label htmlFor="email" className="block font-semibold mb-1">
//                 Email
//               </label>
//             )}
//             <input
//               id="email"
//               type="email"
//               disabled={!isEditing}
//               {...register("email")}
//               placeholder="Enter your email"
//               className="w-full border p-2 rounded"
//             />
//             <p className="text-red-500 text-left align-left text-sm">
//               {errors.profileImage?.message}
//             </p>
//           </div>
//           <div>
//             {isEditing && (
//               <label htmlFor="Bio" className="block font-semibold mb-1">
//                 Bio
//               </label>
//             )}
//             <textarea
//               id="bio"
//               disabled={!isEditing}
//               {...register("bio")}
//               placeholder="Tell us about yourself"
//               className="w-full border p-2 rounded h-24 resize-none"
//             />
//             <p className="text-red-500 text-left align-left text-sm">
//               {errors.profileImage?.message}
//             </p>
//           </div>
//           {!isEditing && (
//             <button
//               type="button"
//               className="bg-purple-300 gap-2 flex flex-row text-black px-4 py-2 rounded"
//               onClick={() => setIsEditing(true)}
//             >
//               Edit Profile
//               <FaRegEdit className="items-center text-center mt-1 text-[16px] " />
//             </button>
//           )}
//           <div className="mt-8 flex flex-col items-start gap-4">
//             <h3 className="text-xl font-semibold">Connect with me:</h3>
//             <div className="flex gap-4 text-3xl">
//               <FaFacebook className="text-blue-700 font-bold" />
//               <FaInstagramSquare className="text-pink-600" />
//               <FaWhatsappSquare className="text-green-600" />
//             </div>
//           </div>

//           {isEditing && (
//             <button
//               type="submit"
//               className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 rounded"
//             >
//               Save Profile
//             </button>
//           )}
//         </div>
//       </form>
//       <DevTool control={control} />
//     </div>
//   );
// };

// export default Profile;

// {
//   /* <div className="space-y-4">
//               <div>
//                 <label className="block  font-semibold mb-1">Whatsapp</label>
//                 <input
//                   id="whatsapp"
//                   type="text"
//                   disabled={!isEditing}
//                   {...register("socialhandle.whatsapp")}
//                   placeholder="Your whatsapp link"
//                   className="w-full border p-2 rounded"
//                 />
//                 <p className="text-red-500 text-left align-left text-sm">
//                   {errors.profileImage?.message}
//                 </p>
//               </div>
//               <div>
//                 <label className="block  font-semibold mb-1">Instagram</label>
//                 <input
//                   id="instagram"
//                   type="text"
//                   disabled={!isEditing}
//                   {...register("socialhandle.instagram")}
//                   placeholder="Your Instagram link"
//                   className="w-full border p-2 rounded"
//                 />
//                 <p className="text-red-500 text-left align-left text-sm">
//                   {errors.profileImage?.message}
//                 </p>
//               </div>
//               <div>
//                 <label className="block  font-semibold mb-1">Facebook</label>
//                 <input
//                   id="facebook"
//                   type="text"
//                   disabled={!isEditing}
//                   {...register("socialhandle.facebook")}
//                   placeholder="Your Facebook link"
//                   className="w-full border p-2 rounded"
//                 />
//                 <p className="text-red-500 text-left align-left text-sm">
//                   {errors.profileImage?.message}
//                 </p>
//               </div>
//             </div>*/
// }
