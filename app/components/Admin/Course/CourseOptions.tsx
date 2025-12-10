import { useTheme } from "next-themes";
import React, { FC } from "react";
import { IoMdCheckmark } from "react-icons/io";

type Props = {
  active: number;
  setActive: (active: number) => void;
};

const CourseOptions: FC<Props> = ({ active, setActive }) => {
  const options = [
    "Course Information",
    "Course Options",
    "Course Content",
    "Course Preview",
  ];

  const { theme } = useTheme();

  return (
    <div>
      {options.map((options: any, index: number) => (
        <div key={index} className={`w-full flex py-5`}>
          <div
            className={`w-[35px] h-[35px] rounded-full flex items-center justify-center ${
              active + 1 > index ? "bg-blue-500" : "bg-[#384766]"
            } relative`}
          >
            <IoMdCheckmark className="text-[25px]" />
            {index !== options.length - 1 && (
              <div
                className={`absolute h-[30px] w-1 ${
                  active + 1 > index ? "bg-blue-500" : "bg-[#384766]"
                } bottom-[-100%]`}
              />
            )}
          </div>
          <h5
            className={`pl-3 text-[20px] ${
              active === index
                ? theme === "dark"
                  ? "text-white"
                  : "text-black"
                : theme === "dark"
                ? "text-gray-400"
                : "text-gray-600"
            }`}
          >
            {options}
          </h5>
        </div>
      ))}
    </div>
  );
};

export default CourseOptions;
