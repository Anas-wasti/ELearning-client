import Ratings from "@/app/utils/Ratings";
import Image from "next/image";
import Link from "next/link";
import React, { FC } from "react";
import { AiOutlineUnorderedList } from "react-icons/ai";
import { useTheme } from "next-themes";

type Props = {
  item: any;
  isProfile?: boolean;
};

const CourseCard: FC<Props> = ({ item, isProfile }) => {
  const { theme } = useTheme();

  return (
    <Link
      href={!isProfile ? `/course/${item._id}` : `course-access/${item._id}`}
    >
      <div
        className={`w-full min-h-[35vh] rounded-lg p-3 shadow-sm backdrop:blur border
          ${
            theme === "dark"
              ? "bg-slate-500 bg-opacity-20 border-[#ffffff1d] shadow-inner"
              : "bg-white border-[#00000015]"
          }
        `}
      >
        <Image
          src={item.thumbnail.url}
          width={500}
          height={500}
          objectFit="contain"
          className="rounded w-full"
          alt=""
        />

        <br />

        <h1
          className={`font-Poppins text-[16px] ${
            theme === "dark" ? "text-white" : "text-black"
          }`}
        >
          {item.name}
        </h1>

        <div className="w-full flex items-center justify-between pt-2">
          <Ratings rating={item.ratings} />

          <h5
            className={`${theme === "dark" ? "text-white" : "text-black"} ${
              isProfile && "hidden md:inline"
            }`}
          >
            {item.purchased} Students
          </h5>
        </div>

        <div className="w-full flex items-center justify-between pt-3">
          <div className="flex">
            <h3 className={`${theme === "dark" ? "text-white" : "text-black"}`}>
              {item.price === 0 ? "Free" : item.price + "$"}
            </h3>

            <h5
              className={`pl-3 text-[14px] mt-[-5px] line-through opacity-80 ${
                theme === "dark" ? "text-white" : "text-black"
              }`}
            >
              {item.estimatedPrice}$
            </h5>
          </div>

          <div className="flex items-center pb-3">
            <AiOutlineUnorderedList
              size={20}
              fill={theme === "dark" ? "#fff" : "#000"}
            />

            <h5
              className={`pl-2 ${
                theme === "dark" ? "text-white" : "text-black"
              }`}
            >
              {item.courseData?.length} Lectures
            </h5>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default CourseCard;
