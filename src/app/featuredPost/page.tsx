import Image from "next/image";
import Link from "next/link";

type Post = {
  _id: string;
  title: string;
  foodImage: string;
  description: string;
  recipe: string[];
  procedures: string;
  profileImage: string;
  name: string;
  servingSuggestions: string;
};

const FeaturedPost: React.FC<{ posts: Post[] }> = ({ posts }) => {
  return (
    <div className=" flex flex-col p-6 ">
      <h4 className="text-2xl text-purple-700 font-semibold mb-2 text-center w-full">
        Our Recipes
      </h4>
      <p className="text-3xl text-black mb-4 text-center w-full">
        List of tasty recipes just for you
      </p>
      <div className="grid grid-cols-3 gap-4">
        {posts.map((post) => (
          <div
            key={post._id}
            className="border border-gray-300 rounded-lg overflow-hidden shadow-md p-4"
          >
            <Link href={`/posts/${post._id}`}>
              <Image
                src={post.foodImage}
                alt="foodImage"
                className="w-[500px] object-cover h-[300px] rounded-md"
                width={800}
                height={600}
              />
              <h2 className="text-xl font-semibold mt-4 text-purple-700">
                {post.title}
              </h2>
              <p className="text-gray-700 mt-2">{post.description}</p>
              <div className="flex flex-rol text-center items-center">
                <Image
                  src={post.profileImage}
                  alt="profile image"
                  className="rounded-full w-[36px] h-[36px] mt-3"
                  width={150}
                  height={100}
                />
                <h5 className="ml-4">{post.name}</h5>
              </div>
            </Link>
          </div>
        ))}
      </div>
      <div className=" w-full text-center ">
        <button className="underline font-bold  mt-4">View more recipes</button>
      </div>
    </div>
  );
};

// export async function getStaticProps({ params }) {
//   const { recipeId } = params;
//   const post = await fetchRecipe(recipeId);

//   return{
//     props{}
//   }
// }
export default FeaturedPost;
