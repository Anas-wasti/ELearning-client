"use client";
import Link from "next/link";
import React, { FC, useEffect, useState } from "react";
import NavItems from "../utils/NavItems";
import { ThemeSwitcher } from "../utils/ThemeSwitcher";
import { useTheme } from "next-themes";
import { HiOutlineMenuAlt3, HiOutlineUserCircle } from "react-icons/hi";
import CustomModel from "../utils/CustomModel";
import Login from "../components/Auth/Login";
import SignUp from "../components/Auth/SignUp";
import Verification from "../components/Auth/Verification";
import { useSelector } from "react-redux";
import avatar from "../../public/assests/avatar.jpg";
import Image from "next/image";
import { useSession } from "next-auth/react";
import {
  useLogOutQuery,
  useSocialAuthMutation,
} from "@/redux/features/auth/authApi";
import toast from "react-hot-toast";
import { useLoadUserQuery } from "@/redux/features/api/apiSlice";
import Loader from "./Loader/Loader";

type Props = {
  open: boolean;
  setOpen: (open: boolean) => void;
  activeItem: number;
  route: string;
  setRoute: (route: string) => void;
};

const Header: FC<Props> = ({ activeItem, setOpen, route, open, setRoute }) => {
  const [active, setActive] = useState(false);
  const [openSidebar, setOpenSidebar] = useState(false);
  const {
    data: userData,
    isLoading,
    refetch,
  } = useLoadUserQuery(undefined, {});
  const { user } = useSelector((state: any) => state.auth);
  const { data } = useSession();
  const [socialAuth, { isSuccess, error }] = useSocialAuthMutation();
  const [logout, setLogout] = useState(false);
  const {} = useLogOutQuery(undefined, {
    skip: !logout ? true : false,
  });

  useEffect(() => {
    if (!isLoading) {
      if (!userData) {
        if (data) {
          socialAuth({
            email: data.user?.email,
            name: data.user?.name,
            avatar: data.user?.image,
          });
          refetch();
        }
      }
    }
    if (data === null) {
      if (isSuccess) {
        toast.success("Login Successfully!");
      }
    }
    if (data === null && isLoading && !userData) {
      setLogout(true);
    }
  }, [data, userData, isLoading]);

  if (typeof window !== "undefined") {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 85) {
        setActive(true);
      } else {
        setActive(false);
      }
    });
  }

  const handleClose = (e: any) => {
    if (e.target.id === "screen") {
      {
        setOpenSidebar(false);
      }
    }
  };

  const { theme } = useTheme();

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div className="w-full relative">
          <div
            className={`${
              active
                ? theme === "dark"
                  ? "bg-black fixed top-0 left-0 w-full h-[80px] z-[80] border-b border-[#ffffff1c] shadow-xl transition duration-500"
                  : "bg-white fixed top-0 left-0 w-full h-[80px] z-[80] border-b border-[#0000001c] shadow-xl transition duration-500"
                : theme === "dark"
                ? "w-full border-b border-[#ffffff1c] h-[80px] z-[80] shadow"
                : "w-full border-b border-[#0000001c] h-[80px] z-[80] shadow"
            }`}
          >
            <div className="w-[95%] md:w-[92%] m-auto py-2 h-full">
              <div className="w-full h-[80px] flex items-center justify-between p-3">
                <div>
                  <Link
                    href={"/"}
                    className={`text-[25px] font-Poppins font-[500] ${
                      theme === "dark" ? "text-white" : "text-black"
                    }`}
                  >
                    Elearning
                  </Link>
                </div>
                <div className="flex items-center">
                  <NavItems activeItem={activeItem} isMobile={false} />
                  <ThemeSwitcher />
                  {/* onlu for mobile */}
                  <div className="md:hidden">
                    <HiOutlineMenuAlt3
                      size={25}
                      className={`cursor-pointer ${
                        theme === "dark" ? "text-white" : "text-black"
                      }`}
                      onClick={() => setOpenSidebar(true)}
                    />
                  </div>
                  {userData ? (
                    <Link href={"/profile"}>
                      <Image
                        src={
                          userData?.user.avatar
                            ? userData.user.avatar.url
                            : avatar
                        }
                        alt=""
                        width={30}
                        height={30}
                        className="h-[30px] w-[30px] rounded-full cursor-pointer"
                        style={{
                          border:
                            activeItem === 5 ? "2px solid #37a39a" : "none",
                        }}
                      />
                    </Link>
                  ) : (
                    <HiOutlineUserCircle
                      size={25}
                      className={`hidden md:block cursor-pointer ${
                        theme === "dark" ? "text-white" : "text-black"
                      }`}
                      onClick={() => setOpen(true)}
                    />
                  )}
                </div>
              </div>
            </div>
            {/* mobile sidebar */}
            {openSidebar && (
              <div
                className={`fixed w-full h-screen md:hidden z-[99999] ${
                  theme === "dark" ? "bg-[uset]" : "bg-[#00000024]"
                } `}
                onClick={handleClose}
                id="screen"
              >
                <div
                  className={`w-[70%] fixed right-0 z-[999999999] h-screen ${
                    theme === "dark" ? "bg-black" : "bg-white"
                  } top-0 ring-0`}
                >
                  <NavItems activeItem={activeItem} isMobile={true} />
                  {userData ? (
                    <Link href={"/profile"}>
                      <Image
                        src={
                          userData?.user.avatar
                            ? userData.user.avatar.url
                            : avatar
                        }
                        alt=""
                        width={30}
                        height={30}
                        className="h-[30px] w-[30px] rounded-full ml-[20px] cursor-pointer"
                        style={{
                          border:
                            activeItem === 5 ? "2px solid #37a39a" : "none",
                        }}
                      />
                    </Link>
                  ) : (
                    <HiOutlineUserCircle
                      size={25}
                      className={`hidden md:block cursor-pointer ${
                        theme === "dark" ? "text-white" : "text-black"
                      }`}
                      onClick={() => setOpen(true)}
                    />
                  )}
                  <br />
                  <br />
                  <p
                    className={`text-[16px] px-2 pl-5 ${
                      theme === "dark" ? "text-white" : "text-black"
                    }`}
                  >
                    Copyright © 2025 Elearning
                  </p>
                </div>
              </div>
            )}
          </div>

          {route === "Login" && (
            <>
              {open && (
                <CustomModel
                  open={open}
                  setOpen={setOpen}
                  setRoute={setRoute}
                  activeItem={activeItem}
                  component={Login}
                  refetch={refetch}
                />
              )}
            </>
          )}

          {route === "Sign-Up" && (
            <>
              {open && (
                <CustomModel
                  open={open}
                  setOpen={setOpen}
                  setRoute={setRoute}
                  activeItem={activeItem}
                  component={SignUp}
                />
              )}
            </>
          )}

          {route === "Verification" && (
            <>
              {open && (
                <CustomModel
                  open={open}
                  setOpen={setOpen}
                  setRoute={setRoute}
                  activeItem={activeItem}
                  component={Verification}
                />
              )}
            </>
          )}
        </div>
      )}
    </>
  );
};

export default Header;
