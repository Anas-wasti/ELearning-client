import { useGetUsersAllCoursesQuery } from "@/redux/features/courses/coursesApi";
import { useTheme } from "next-themes";
import React, { useEffect, useState } from "react";
import CourseCard from "../Course/CourseCard";

const Courses = () => {
  const { data, isLoading } = useGetUsersAllCoursesQuery({});
  const [courses, setCourses] = useState<any[]>([]);

  useEffect(() => {
    setCourses(data?.courses);
  }, [data]);

  const { theme } = useTheme();

  return (
    <div>
      <div className={`w-[90%] md:w-[80%] m-auto`}>
        <h1
          className={`text-center font-Poppins text-[25px] leading-[35px] sm:text-3xl lg:text-4xl ${
            theme === "dark" ? "text-white" : "text-black"
          } md:!leading-[60px] font-[700] tracking-tight`}
        >
          Expand Your Career <span className="text-gradient">Opportunity</span>
          <br />
          Opportunity With Our Courses
        </h1>
        <br />
        <br />
      </div>
      <div className="grid grid-cols-1 gap-[20px] md:grid-cols-2 md:gap-[25px] lg:grid-cols-3 lg:gap-[25px] 2xl:grid-cols-4 2xl:gap-[35px] mb-12 border-0">
        {courses &&
          courses.map((item: any, index: number) => (
            <CourseCard item={item} key={index} />
          ))}
      </div>
    </div>
  );
};

export default Courses;
