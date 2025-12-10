"use client";
import React from "react";
import AdminSidebar from "@/app/components/Admin/sidebar/AdminSidebar";
import Heading from "../../../app/utils/Heading";
import CreateCourse from "../../components/Admin/Course/CreateCourse";
import DashboardHeader from "../../../app/components/Admin/DashboardHeader";

const page = () => {
  return (
    <div>
      <Heading
        title="profile - Elearning"
        description="Elearning is a platform for students to lear and get help from teachers"
        keywords="Programing, MERN,Redux,Mechine Learning"
      />
      <div className="flex">
        <div className="xl:w-[16%] w-1/5">
          <AdminSidebar />
        </div>
        <div className="w-[85%]">
          <DashboardHeader />
          <CreateCourse />
        </div>
      </div>
    </div>
  );
};

export default page;
