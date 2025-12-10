import React from "react";
import Image from "next/image";
import { styles } from "@/app/styles/style";
import ReviewCard from "../Review/ReviewCard";
import { useTheme } from "next-themes";

type Props = {};

export const reviews = [
  {
    name: "Gene Bates",
    avatar: "https://randomuser.me/api/portraits/men/1.jpg",
    profession: "Student | Cambridge university",
    comment:
      "I love the dark mode option. It makes late-night work so much easier on the eyes. Overall a very user-friendly experience.",
  },
  {
    name: "Verna Santos",
    avatar: "https://randomuser.me/api/portraits/women/1.jpg",
    profession: "Full stack developer | Quarter ltd.",
    comment:
      "Customer support was excellent! They answered my queries within minutes and guided me through the setup process step by step.",
  },
  {
    name: "Jay Gibbs",
    avatar: "https://randomuser.me/api/portraits/men/2.jpg",
    profession: "computer systems engineering student | Zimbabwe",
    comment:
      "The attention to detail is amazing. Everything feels polished and well thought out. Definitely one of the best tools I’ve used in a while.",
  },
  {
    name: "Mina Davidson",
    avatar: "https://randomuser.me/api/portraits/women/2.jpg",
    profession: "Junior Web Developer | Indonesia",
    comment:
      "At first I was unsure, but after using it for a week I can confidently say it saves me so much time. The features are exactly what I needed.",
  },
  {
    name: "Rosemary Smith",
    avatar: "https://randomuser.me/api/portraits/women/3.jpg",
    profession: "Full stack web developer | Algeria",
    comment:
      "I really enjoyed working with this platform. The interface is clean, responsive, and easy to navigate. It made my workflow much faster and smoother.",
  },
  {
    name: "Laura Mckenzie",
    avatar: "https://randomuser.me/api/portraits/women/4.jpg",
    profession: "Full stack web developer | Canada",
    comment:
      "Overall, a fantastic experience. It’s rare to find a product that combines speed, design, and functionality so well together.",
  },
];

const Reviews = (props: Props) => {
  const { theme } = useTheme();

  return (
    <div className="w-[90%] md:w-[85%] m-auto">
      <div className="w-full md:flex items-center">
        <div className="md:w-[50%] w-full mb-5">
          <Image
            src={require("../../../public/assests/iqryaifqyig1v8glifrj.webp")}
            alt="business"
            width={450}
            height={400}
          />
        </div>
        <div className="md:w-[50%] w-full">
          <h3 className={`${styles.title} md:!text-[40px]`}>
            <span
              className={`${theme === "dark" ? "text-white" : "text-black"}`}
            >
              Our Students Are
            </span>{" "}
            <span className="text-blue-700">Our Strength</span> <br />{" "}
            <span
              className={`${theme === "dark" ? "text-white" : "text-black"}`}
            >
              See What They Say About Us
            </span>
          </h3>
          <br />
          <p
            className={`${styles.label} text-justify ${
              theme === "dark" ? "text-white" : "!text-black"
            }`}
          >
            Our students are the heart of everything we do. Their passion,
            dedication, and hard work inspire us every day to provide the best
            learning environment possible. Through their stories, achievements,
            and feedback, we see the real impact of our programs. Each journey
            is unique, and we take pride in supporting them every step of the
            way.
          </p>
          <br />
        </div>
        <br />
      </div>
      <div className="grid grid-cols-1 gap-[25px] md:grid-cols-2 md:gap-[25px] lg:grid-cols-2 xl:grid-cols-2 xl:gap-[35px] mb-12 border-e md:[&>*:nth-child(3)]:!mt-[-60px] md:[&>*:nth-child(6)]:!mt-[-40px]">
        {reviews &&
          reviews.map((i, index) => <ReviewCard item={i} key={index} />)}
      </div>
    </div>
  );
};

export default Reviews;
