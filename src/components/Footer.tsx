import Image from "next/image";
import Link from "next/link";
import PageLogo from "../../public/assets/images/blogLogo.jpeg";

const Footer = () => {
  return (
    <div className="w-[100%] gap-10 pt-8 pb-6 text-white bg-purple-900 flex flex-row">
      <div className="flex w-[35%] flex-col text-center items-center text-[12px]">
        <Image src={PageLogo} alt="blogLogo" className="w-36 h-auto pt-4" />
        <p className="mt-2">
          Our Address is at Street No.<span>City,State</span> Country
        </p>
      </div>
      <div className="flex pt-4 flex-col w-[20%] gap-4">
        <h2 className="font-bold">Quick Links</h2>
        <Link href="/"> Home</Link>
        <Link href="/all-recipes "> Recipes</Link>
        <Link href="/ Contact"> Contact</Link>
      </div>
      <div className="text-[14px] pt-4 w-[30%] ">
        <h2 className="font-bold pb-2">About Us</h2>
        <p className="text-[12px]">
          Salford & Co. Trusted Recipes began with a passion for food and a love
          for cooking.Welcome to Salford & Co. Trusted Recipes, where cooking
          becomes simple and fun. We share reliable, easy-to-follow recipes that
          anyone can make in their kitchen.
        </p>
      </div>
    </div>
  );
};
export default Footer;
