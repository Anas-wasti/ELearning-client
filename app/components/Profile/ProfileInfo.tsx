"use client";
import Image from "next/image";
import { styles } from "../../../app/styles/style";
import React, { FC, useEffect, useState } from "react";
import { AiOutlineCamera } from "react-icons/ai";
import avatarIcon from "../../../public/assests/avatar.jpg";
import { useTheme } from "next-themes";
import {
  useEditProfileMutation,
  useUpdateAvatarMutation,
} from "@/redux/features/user/userApi";
import { useLoadUserQuery } from "@/redux/features/api/apiSlice";
import toast from "react-hot-toast";

type Props = {
  avatar: string | null;
  user: any;
};

const ProfileInfo: FC<Props> = ({ avatar, user }) => {
  const [name, setName] = useState(user && user?.name);
  const [updateAvatar, { isSuccess, data, error }] = useUpdateAvatarMutation();
  const [editProfile, { isSuccess: success, error: updateError }] =
    useEditProfileMutation();
  const { refetch } = useLoadUserQuery(undefined);

  const imageHandler = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const fileReader = new FileReader();
    fileReader.onload = () => {
      if (fileReader.readyState === 2) {
        const avatar = fileReader.result as string;
        updateAvatar(avatar);
      }
    };
    fileReader.readAsDataURL(file);
  };

  useEffect(() => {
    if (isSuccess || success) {
      refetch();
    }
    if (error || updateError) {
      console.log(error);
    }
    if (success) {
      toast.success("Profile updated successfully!");
    }
  }, [isSuccess, error, refetch, success, updateError]);

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    if (name !== "") {
      await editProfile({
        name: name,
      });
    }
  };

  const { theme } = useTheme();

  return (
    <div className="w-full flex flex-col justify-center items-center">
      <div className="w-full flex justify-center">
        <div className="relative">
          <Image
            src={
              user?.avatar?.url
                ? user?.avatar?.url
                : avatar
                ? avatar
                : avatarIcon
            }
            alt=""
            width={120}
            height={120}
            className="w-[120px] h-[120px] cursor-pointer border-[3px] border-[#37a39a] rounded-full object-cover"
          />
          <input
            type="file"
            id="avatar"
            className="hidden"
            onChange={imageHandler}
            accept="image/png,image/jpg,image/jpeg,image/webp"
          />
          <label htmlFor="avatar">
            <div className="w-[30px] h-[30px] text-white bg-slate-900 rounded-full absolute bottom-2 right-2 flex items-center justify-center cursor-pointer">
              <AiOutlineCamera size={20} />
            </div>
          </label>
        </div>
      </div>

      <div className="w-full pl-6 md:pl-10 mt-8">
        <form onSubmit={handleSubmit}>
          <div className="md:w-[60%] mx-auto block pb-4">
            <div className="w-full">
              <label className="block md:pb-2">Full Name</label>
              <input
                type="text"
                className={`${styles.input} !w-[95%] mb-4 md:mb-0`}
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="w-full pt-2">
              <label className="block md:pb-2">Email Address</label>
              <input
                type="text"
                readOnly
                className={`${styles.input} !w-[95%] mb-1 md:mb-0`}
                required
                value={user?.email}
              />
            </div>
            <input
              className={`w-full md:w-[250px] h-[40px] border border-t-[#37a39a] border-b-[#37a39a] text-center ${
                theme === "dark" ? "text-white" : "text-black"
              } rounded-[3px] mt-8 cursor-pointer`}
              required
              value="Update"
              type="submit"
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProfileInfo;
