import Ratings from "@/app/utils/Ratings";
import { useTheme } from "next-themes";
import Image from "next/image";
import React from "react";

type Props = {
  item: any;
};

const ReviewCard = (props: Props) => {
  const { theme } = useTheme();

  return (
    <>
      <div
        className={`w-full h-max pb-4 border backdrop-blur-2xl shadow-[bg-slate-700] rounded-lg shadow-inner ${
          theme === "dark"
            ? "bg-slate-500 bg-opacity-[0.20] border-[#ffffff1d]"
            : "bg-white border-[#00000028]"
        }`}
      >
        <div className="flex w-full">
          <Image
            src={props.item.avatar}
            alt=""
            width={50}
            height={50}
            className="w-[50px] h-[50px] rounded-full object-cover"
          />
          <div className="md:flex justify-between w-full hidden">
            <div className="pl-4">
              <h5
                className={`text-[20px] ${
                  theme === "dark" ? "text-white" : "text-black"
                }`}
              >
                {props.item.name}
              </h5>
              <h6
                className={`text-[16px] ${
                  theme === "dark" ? "text-[#ffffffab]" : "text-gray-600"
                }`}
              >
                {props.item.profession}
              </h6>
            </div>
            <Ratings rating={5} />
          </div>
          <div className="md:hidden justify-between w-full flex flex-col">
            <div className="pl-4">
              <h5
                className={`text-[20px] ${
                  theme === "dark" ? "text-white" : "text-black"
                }`}
              >
                {props.item.name}
              </h5>
              <h6
                className={`text-[16px] ${
                  theme === "dark" ? "text-[#ffffffab]" : "text-gray-600"
                }`}
              >
                {props.item.profession}
              </h6>
            </div>
            <Ratings rating={5} />
          </div>
        </div>
        <p
          className={`pt-2 px-2 font-Poppins ${
            theme === "dark" ? "text-white" : "text-black"
          }`}
        >
          {props.item.comment}
        </p>
      </div>
    </>
  );
};

export default ReviewCard;
