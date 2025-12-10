"use client";
import { useTheme } from "next-themes";
import React, { FC, useEffect, useState } from "react";
import SidebarProfile from "./SidebarProfile";
import { useLogOutQuery } from "../../../redux/features/auth/authApi";
import { signOut } from "next-auth/react";
import ProfileInfo from "./ProfileInfo";
import ChangePassword from "./ChangePassword";
import CourseCard from "../Course/CourseCard";
import { useGetUsersAllCoursesQuery } from "@/redux/features/courses/coursesApi";

type Props = {
  user: any;
};

const Profile: FC<Props> = ({ user }) => {
  const [scroll, setScroll] = useState(false);
  const [avatar, setAvatar] = useState(null);
  const [logout, setLogout] = useState(false);
  const [courses, setCourses] = useState([]);

  const { data } = useGetUsersAllCoursesQuery(undefined, {});
  const {} = useLogOutQuery(undefined, { skip: !logout });

  const [active, setActive] = useState(1);

  const logOutHandler = async () => {
    setLogout(true);
    await signOut();
  };

  // Scroll effect
  useEffect(() => {
    if (typeof window !== "undefined") {
      const handleScroll = () => {
        setScroll(window.scrollY > 85);
      };
      window.addEventListener("scroll", handleScroll);
      return () => window.removeEventListener("scroll", handleScroll);
    }
  }, []);

  // Filter purchased courses
  useEffect(() => {
    if (data) {
      const filteredCourses = user.courses
        .map((userCourse: any) =>
          data.courses.find((course: any) => course._id === userCourse._id)
        )
        .filter((course: any) => course);
      setCourses(filteredCourses);
    }
  }, [data, user]);

  const { theme } = useTheme();

  return (
    <div className="w-[85%] flex mx-auto">
      {/* Sidebar */}
      <div
        className={`w-[60px] md:w-[310px] h-[450px] ${
          theme === "dark"
            ? "bg-slate-900 border-[#ffffff1d] shadow-sm"
            : "bg-white border-[#00000014] shadow-sm"
        } bg-opacity-90 border rounded-[5px] mt-[80px] mb-[80px] sticky ${
          scroll ? "top-[120px]" : "top-[30px]"
        } left-[30px]`}
      >
        <SidebarProfile
          user={user}
          active={active}
          avatar={avatar}
          setActive={setActive}
          logOutHandler={logOutHandler}
        />
      </div>

      {/* Profile Info */}
      {active === 1 && (
        <div className="w-full h-full bg-transparent mt-[80px]">
          <ProfileInfo avatar={avatar} user={user} />
        </div>
      )}

      {/* Change Password */}
      {active === 2 && (
        <div className="w-full h-full bg-transparent mt-[80px]">
          <ChangePassword />
        </div>
      )}

      {/* Courses Section */}
      {active === 3 && (
        <div className="w-[70%] pl-7 px-2 md:px-10 md:pl-8 mt-[80px]">
          <div className="grid grid-cols-1 gap-[20px] md:grid-cols-2 md:gap-[25px] lg:grid-cols-3 lg:gap-[25px] 2xl:grid-cols-4 2xl:gap-[35px] mb-12">
            {courses &&
              courses.map((item: any, index: number) => (
                <CourseCard item={item} key={index} isProfile={true} />
              ))}
          </div>

          {courses.length === 0 && (
            <h1
              className={`text-center text-[18px] font-Poppins ${
                theme === "dark" ? "text-white" : "text-black"
              }`}
            >
              You don&apos;t have any purchased courses!
            </h1>
          )}
        </div>
      )}
    </div>
  );
};

export default Profile;
