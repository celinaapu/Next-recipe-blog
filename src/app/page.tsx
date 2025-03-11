import { FaSearch } from "react-icons/fa";
import { RandomPost } from "@recipeblog/components/randomPost";
import FeaturedPost from "./featuredPost/page";
import Footer from "@recipeblog/components/Footer";

export default function Home() {
  return (
    <div className=" h-screen ">
      <div className="bg-mainBackground bg-cover flex w-full h-[60%] items-center">
        <div className="pt-36 items-center text-center flex flex-col ">
          <div className="relative rounded-md text-center items-center flex flex-row w-[80%] border border-gray-300">
            <input
              type="text"
              placeholder="Search food type..."
              className="pl-4 w-[95%] h-14 text-white bg-transparent focus:outline-none  "
            />
            <FaSearch className=" text-gray-400" />
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
        <FeaturedPost posts={RandomPost} />
      </div>
      <div>
        <Footer />
      </div>
    </div>
  );
}
