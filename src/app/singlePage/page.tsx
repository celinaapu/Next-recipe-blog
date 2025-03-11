// import Image from "next/image";
// import { RandomPost } from "@recipeblog/app/components/randomPost";

// export async function generateStatisticParam() {
//   const recipes = RandomPost;
//   return recipes.map((recipe) => ({
//     recipeId: recipe.id.toString(),
//   }));
// }

// async function fetchRecipes(recipeId) {
//   const recipes = RandomPost;

//   return recipes.find((recipe) => recipe.id === recipeId);
// }

// const SinglePage = ({ post }) => {
//   if (!post) {
//     return <div> Loading....</div>;
//   }

//   return (
//     <div className="h-screen w-full flex flex-col">
//       <h1 className="w-full text-center text-purple-900"> {post.title} </h1>
//       <Image src={post.profileImage} alt={post.description} />
//       <h2>Recipes </h2>
//       <p>{post.recipes}</p>
//       <h2> Procedures</h2>
//       <p>{post.procedures}</p>
//       <h3>serving Suggestions </h3>
//       <p>{post.servingSuggestions}</p>
//       <div className="flex flex-rol text-center items-center">
//         <Image
//           src={post.profileImage}
//           alt="profile image"
//           className="rounded-full w-[36px] h-[36px] mt-3"
//           width={150}
//           height={100}
//         />
//         <h5 className="ml-4">{post.name}</h5>
//       </div>
//     </div>
//   );
// };

// export async function getStaticProps({ params }) {
//   const { recipeId } = params;

//   const Post = await fetchRecipes(recipeId);

//   return {
//     props: {
//       post,
//     },
//   };
// }

// export const async;

// export default SinglePage;
