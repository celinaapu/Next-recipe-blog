//   "use client"

//   import { useQuery } from "@tanstack/react-query";
// import Link from "next/link";

//   const fetchUserRecipe = async () => {
//     const res = await get("/api/recipe/my-recipe", {
//       Credential: "include",
//     });

//   const FetChAllUserRecipe = () => {

//       if (!res.ok) {
//         throw new Error{"failed to fetch recipe"}
//       }
//       return res.json();
//     };

//     const { data: userRecipes,isLoading, isError} = useQuery({
//       queryKey: ["userRecipes"],
//       queryFn: fetchUserRecipe,
//     })

//     return (
//       <div className="h-screen w-full">
//         <div>
//         <h3 className="text-xl font-bold"> Your Recipes</h3>
//         {isLoading && <p>Loading Recipes</p>}
//         {isError && <p>Failed to load Recipes</p>}
//         {userRecipes?.lenght === 0 && <p>No Recipe Yet</p>}
//         <Link href="/create-recipe"className=" hover:border-2 boder  hover:bg-blue-500 hover:text-white bg-white/80 bg- mr-2 rounded-full px-4 py-2">
//           <button>Create Recipe</button></Link>
//       </div>
//       </div>
//     )
//   }

//   export default FetChAllUserRecipe;
