import Image from "next/image";
import React, { FC } from "react";
import avatarDefault from "../../../public/assests/avatar.jpg";
import { useTheme } from "next-themes";
import { RiLockPasswordLine } from "react-icons/ri";
import { SiCoursera } from "react-icons/si";
import { AiOutlineLogout } from "react-icons/ai";
import { MdOutlineAdminPanelSettings } from "react-icons/md";
import Link from "next/link";

type Props = {
  user: any;
  active: number;
  avatar: string | null;
  setActive: (active: number) => void;
  logOutHandler: any;
};

const SidebarProfile: FC<Props> = ({
  user,
  active,
  avatar,
  setActive,
  logOutHandler,
}) => {
  const { theme } = useTheme();
  return (
    <div className="w-full">
      {/* My Account */}
      <div
        className={`w-full flex items-center px-3 py-4 cursor-pointer ${
          active === 1
            ? theme === "dark"
              ? "bg-slate-800"
              : "bg-white"
            : "bg-transparent"
        }`}
        onClick={() => setActive(1)}
      >
        <Image
          src={
            user.avatar || avatar ? user.avatar.url || avatar : avatarDefault
          }
          alt=""
          width={20}
          height={20}
          className="w-[20px] h-[20px] md:w-[30px] md:h-[30px] cursor-pointer rounded-full"
        />
        <h5
          className={`pl-2 md:block hidden font-Poppins ${
            theme === "dark" ? "text-white" : "text-black"
          }`}
        >
          My Account
        </h5>
      </div>

      {/* Change Password */}
      <div
        className={`w-full flex items-center px-3 py-4 cursor-pointer ${
          active === 2
            ? theme === "dark"
              ? "bg-slate-800"
              : "bg-white"
            : "bg-transparent"
        }`}
        onClick={() => setActive(2)}
      >
        <RiLockPasswordLine
          size={20}
          className={`${theme === "dark" ? "text-white" : "text-black"}`}
        />
        <h5
          className={`pl-2 md:block hidden font-Poppins ${
            theme === "dark" ? "text-white" : "text-black"
          }`}
        >
          Change Password
        </h5>
      </div>

      {/* Enrolled Courses */}
      <div
        className={`w-full flex items-center px-3 py-4 cursor-pointer ${
          active === 3
            ? theme === "dark"
              ? "bg-slate-800"
              : "bg-white"
            : "bg-transparent"
        }`}
        onClick={() => setActive(3)}
      >
        <SiCoursera
          size={20}
          className={`${theme === "dark" ? "text-white" : "text-black"}`}
        />
        <h5
          className={`pl-2 md:block hidden font-Poppins ${
            theme === "dark" ? "text-white" : "text-black"
          }`}
        >
          Enrolled Courses
        </h5>
      </div>

      {user.role === "admin" && (
        <Link
          className={`w-full flex items-center px-3 py-4 cursor-pointer ${
            active === 6
              ? theme === "dark"
                ? "bg-slate-800"
                : "bg-white"
              : "bg-transparent"
          }`}
          href={"/admin"}
        >
          <MdOutlineAdminPanelSettings
            size={20}
            className={`${theme === "dark" ? "text-white" : "text-black"}`}
          />
          <h5
            className={`pl-2 md:block hidden font-Poppins ${
              theme === "dark" ? "text-white" : "text-black"
            }`}
          >
            Admin Dashboard
          </h5>
        </Link>
      )}

      {/*  Log Out */}
      <div
        className={`w-full flex items-center px-3 py-4 cursor-pointer ${
          active === 4
            ? theme === "dark"
              ? "bg-slate-800"
              : "bg-white"
            : "bg-transparent"
        }`}
        onClick={() => logOutHandler()}
      >
        <AiOutlineLogout
          size={20}
          className={`${theme === "dark" ? "text-white" : "text-black"}`}
        />
        <h5
          className={`pl-2 md:block hidden font-Poppins ${
            theme === "dark" ? "text-white" : "text-black"
          }`}
        >
          Log Out
        </h5>
      </div>
    </div>
  );
};

export default SidebarProfile;
