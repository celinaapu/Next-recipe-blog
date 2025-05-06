"use client";

import { DevTool } from "@hookform/devtools";
import PagePic from "../../../public/assets/images/images.jpeg";
import Image from "next/image";
import { useForm } from "react-hook-form";

type ProfileInfo = {
  name: string;
  email: string;
  bio: string;
  profileImage: string;
  socialhandle: {
    instagram: string;
    facebook: string;
    whatsapp: string;
  };
};

const Profile = () => {
  const form = useForm<ProfileInfo>({
    defaultValues: {
      name: "",
      email: "",
      bio: "",
      profileImage: "",
      socialhandle: {
        instagram: "",
        facebook: "",
        whatsapp: "",
      },
    },
  });
  const { register, handleSubmit, control, formState } = form;
  const { errors } = formState;
  const onSubmit = (data: ProfileInfo) => {
    console.log(" your profile is uploaded:", data);
  };

  return (
    <div className="p-6 bg-slate-300 w-[100%] h-full overflow-y-auto">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full max-w-5xl mx-auto flex flex-row gap-6"
      >
        <div className="w-[30%] md:w-1/3 flex">
          <div className="flex flex-col items-center text-center">
            <Image
              src={PagePic}
              alt="Profile Picture"
              className="w-64 h-64 rounded-full object-cover mt-4"
            />
          </div>
        </div>
        <div className="w-[70%] space-y-6">
          <h2 className="text-2xl font-bold text-center">Edit Your Profile</h2>
          <div>
            <label className=" block font-semibold mb-1">Name</label>
            <input
              id="name"
              type="text"
              {...register("name")}
              placeholder="Enter your name"
              className="w-full border p-2 rounded"
            />
            <p className="text-red-500 text-left align-left text-sm">
              {errors.profileImage?.message}
            </p>
          </div>
          <div>
            <label className="block  font-semibold mb-1">Email</label>
            <input
              id="email"
              type="email"
              {...register("email")}
              placeholder="Enter your email"
              className="w-full border p-2 rounded"
            />
            <p className="text-red-500 text-left align-left text-sm">
              {errors.profileImage?.message}
            </p>
          </div>
          <div>
            <label className="block  font-semibold mb-1">Bio</label>
            <textarea
              id="bio"
              {...register("bio")}
              placeholder="Tell us about yourself"
              className="w-full border p-2 rounded h-24 resize-none"
            />
            <p className="text-red-500 text-left align-left text-sm">
              {errors.profileImage?.message}
            </p>
          </div>
          <div>
            <p className="block">We will like to see you on other platforms!</p>
            <div className="space-y-4">
              <div>
                <label className="block  font-semibold mb-1">Whatsapp</label>
                <input
                  id="whatsapp"
                  type="text"
                  {...register("socialhandle.whatsapp")}
                  placeholder="Your whatsapp link"
                  className="w-full border p-2 rounded"
                />
                <p className="text-red-500 text-left align-left text-sm">
                  {errors.profileImage?.message}
                </p>
              </div>
              <div>
                <label className="block  font-semibold mb-1">Instagram</label>
                <input
                  id="instagram"
                  type="text"
                  {...register("socialhandle.instagram")}
                  placeholder="Your Instagram link"
                  className="w-full border p-2 rounded"
                />
                <p className="text-red-500 text-left align-left text-sm">
                  {errors.profileImage?.message}
                </p>
              </div>
              <div>
                <label className="block  font-semibold mb-1">Facebook</label>
                <input
                  id="facebook"
                  type="text"
                  {...register("socialhandle.facebook")}
                  placeholder="Your Facebook link"
                  className="w-full border p-2 rounded"
                />
                <p className="text-red-500 text-left align-left text-sm">
                  {errors.profileImage?.message}
                </p>
              </div>
            </div>
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 rounded"
          >
            Save Profile
          </button>
        </div>
      </form>
      <DevTool control={control} />
    </div>
  );
};

export default Profile;
