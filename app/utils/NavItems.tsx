import Link from "next/link";
import React from "react";
import { useTheme } from "next-themes";

export const navItemsData = [
  {
    name: "Home",
    url: "/",
  },
  {
    name: "Courses",
    url: "/courses",
  },
  {
    name: "About",
    url: "/about",
  },
  {
    name: "Policy",
    url: "/policy",
  },
  {
    name: "Faq",
    url: "/faq",
  },
];

type Props = {
  activeItem: number;
  isMobile: boolean;
};

const NavItems: React.FC<Props> = ({ activeItem, isMobile }) => {
  const { theme } = useTheme();

  console.log("active item", activeItem);
  return (
    <>
      <div className="hidden md:flex">
        {navItemsData &&
          navItemsData.map((item, index) => (
            <Link href={`${item.url}`} key={index} passHref>
              <span
                className={`${
                  activeItem === index
                    ? theme === "dark"
                      ? "text-[#37a39a]"
                      : "text-[crimson]"
                    : theme === "dark"
                    ? "text-white"
                    : "text-black"
                } block py-5 text-[18px] px-6 font-Poppins font-[400]`}
              >
                {item.name}
              </span>
            </Link>
          ))}
      </div>
      {isMobile && (
        <div
          className={`md:hidden mt-5  ${
            theme === "dark" ? "bg-black" : "bg-white"
          } `}
        >
          <div className="w-full text-center py-6">
            <Link href={"/"} passHref>
              <span
                className={`text-[25px] font-sans font-[500] ${
                  theme === "dark" ? "text-white" : "text-black"
                }`}
              >
                Elearning
              </span>
            </Link>
          </div>
          {navItemsData &&
            navItemsData.map((item, index) => (
              <Link href="/" passHref key={index}>
                <span
                  className={`${
                    activeItem === index
                      ? theme === "dark"
                        ? "text-[#37a39a]"
                        : "text-[crimson]"
                      : theme === "dark"
                      ? "text-white"
                      : "text-black"
                  } block py-5 text-[18px] px-6 font-Poppins font-[400]`}
                >
                  {item.name}
                </span>
              </Link>
            ))}
        </div>
      )}
    </>
  );
};

export default NavItems;
