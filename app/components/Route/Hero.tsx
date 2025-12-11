"use client";
import React, { FC, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { BiSearch } from "react-icons/bi";
import Loader from "../Loader/Loader";
import { useRouter } from "next/navigation";
import { useGetHeroDataQuery } from "@/redux/features/layout/layoutApi";
import { useTheme } from "next-themes";

const Hero: FC = () => {
  const { data, isLoading } = useGetHeroDataQuery("Banner", {});
  const [search, setSearch] = useState("");
  const router = useRouter();
  const { theme } = useTheme();

  const handleSearch = (e: any) => {
    if (search === "") {
      return;
    } else {
      router.push(`/courses?title=${search}`);
    }
  };

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div
          className={`w-full flex flex-col z-10 lg:flex-row items-center justify-between px-4 pb-20 lg:px-16 pt-[100px] gap-10 lg:gap-20 transition duration-300 ${
            theme === "dark"
              ? "bg-[#00000013] text-white"
              : "bg-white text-black"
          }`}
        >
          {/* Left Side - Hero Image in Blue Circle */}
          <div className="relative w-[300px] h-[300px] lg:w-[350px] lg:h-[350px] xl:w-[500px] xl:h-[500px] rounded-full bg-[#39c1f3] flex items-center justify-center z-0">
            <div className="relative w-[250px] h-[250px] lg:w-[450px] lg:h-[450px] xl:w-[500px] xl:h-[500px]">
              {data?.layout?.banner?.image?.url && (
                <Image
                  src={data?.layout?.banner?.image?.url}
                  alt="Hero Banner"
                  fill
                  className="object-contain z-10"
                  sizes="(min-width:1024px) 500px, (min-width:768px) 450px, 250px"
                  priority
                />
              )}
            </div>
          </div>

          {/* Right Side - Text Content */}
          <div className="w-full lg:w-[60%] flex justify-center lg:justify-start">
            <div className="w-full max-w-[500px] flex flex-col items-center lg:items-start text-center lg:text-left">
              <h2
                className={`text-[26px] lg:text-[48px] font-[600] font-Josefin leading-snug lg:leading-[60px] ${
                  theme === "dark" ? "text-white" : "text-black"
                }`}
              >
                {data?.layout?.banner?.title}
              </h2>

              <p
                className={`font-serif font-[500] text-[16px] lg:text-[18px] mt-4 text-opacity-90 ${
                  theme === "dark" ? "text-gray-300" : "text-black"
                }`}
              >
                {data?.layout?.banner?.subTitle}
              </p>

              {/* Search Box */}
              <div className="w-full h-[50px] relative mt-6">
                <input
                  type="search"
                  placeholder="Search Courses..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className={`bg-transparent border px-3 w-full h-full outline-none rounded-[5px] text-base ${
                    theme === "dark"
                      ? "border-white placeholder-white text-white"
                      : "border-black placeholder-black text-black"
                  }`}
                />
                <div
                  className="absolute flex items-center justify-center w-[50px] h-[50px] right-0 top-0 bg-[#39c1f3] rounded-r-[5px] cursor-pointer"
                  onClick={handleSearch}
                >
                  <BiSearch className="text-white" size={26} />
                </div>
              </div>

              <div className="flex items-center mt-6 w-full">
                <Image
                  src="/assests/client-1.webp"
                  alt="client-3"
                  width={40}
                  height={40}
                  className="rounded-full w-10 h-10"
                />

                <Image
                  src="/assests/client-2.webp"
                  alt="client-1"
                  width={40}
                  height={40}
                  className="rounded-full w-10 h-10 ml-[-10px]"
                />

                <Image
                  src="/assests/client-3.webp"
                  alt="client-2"
                  width={40}
                  height={40}
                  className="rounded-full w-10 h-10 ml-[-10px]"
                />
                <p
                  className={`font-Josefin pl-3 text-[16px] font-[500] ${
                    theme === "dark" ? "text-gray-300" : "text-black"
                  }`}
                >
                  500K+ people already trusted us.
                  <Link
                    href="/courses"
                    className={`ml-2 ${
                      theme === "dark" ? "text-[#4cce5b]" : "text-[crimson]"
                    }`}
                  >
                    View Courses
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Hero;
