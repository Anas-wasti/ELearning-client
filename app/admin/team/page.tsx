"use client";
import DashboardHero from "@/app/components/Admin/DashboardHero";
import AdminSidebar from "@/app/components/Admin/sidebar/AdminSidebar";
import AdminProtected from "@/app/hooks/adminProtected";
import Heading from "@/app/utils/Heading";
import React from "react";
import AllUsers from "../../components/Admin/Users/AllUsers";

const page = () => {
  return (
    <div>
      <AdminProtected>
        <div>
          <Heading
            title="profile - Elearning"
            description="Elearning is a platform for students to lear and get help from teachers"
            keywords="Programing, MERN,Redux,Mechine Learning"
          />
          <div className="flex h-screen">
            <div className="xl:w-[16%] w-1/5">
              <AdminSidebar />
            </div>
            <div className="w-[85%]">
              <DashboardHero />
              <AllUsers isTeam={true} />
            </div>
          </div>
        </div>
      </AdminProtected>
    </div>
  );
};

export default page;
