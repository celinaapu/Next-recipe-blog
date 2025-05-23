import PageLogo from "../../../public/assets/images/blogLogo.jpeg";
import Link from "next/link";
import Image from "next/image";

export const Logo = () => {
  return (
    <Link href="/" className=" flex items-center">
      <div className="w-16 mr-3 rounded-full overflow-hidden border border-solid border-blue-900">
        <Image
          src={PageLogo}
          alt="blogLogo"
          className="w-full h-auto rounded-full"
        />
      </div>
      <span className="font-bold text-xl text-black">Trusted Recipes</span>
    </Link>
  );
};
