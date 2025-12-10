"use client";
import React from "react";
import AdminSidebar from "@/app/components/Admin/sidebar/AdminSidebar";
import Heading from "@/app/utils/Heading";
import DashboardHeader from "@/app/components/Admin/DashboardHeader";
import EditCourse from "../../../components/Admin/Course/EditCourse";

const page = ({ params }: any) => {
  const id = params?.id;

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
          <EditCourse id={id} />
        </div>
      </div>
    </div>
  );
};

export default page;
