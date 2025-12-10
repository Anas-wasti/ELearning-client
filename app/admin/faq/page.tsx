"use client";
import React from "react";
import DashboardHero from "@/app/components/Admin/DashboardHero";
import AdminSidebar from "@/app/components/Admin/sidebar/AdminSidebar";
import AdminProtected from "@/app/hooks/adminProtected";
import Heading from "@/app/utils/Heading";
import EditFaq from "../../components/Admin/Customization/EditFaq";

const Page = () => {
  return (
    <div>
      <AdminProtected>
        <div>
          <Heading
            title="profile - Elearning"
            description="Elearning is a platform for students to lear and get help from teachers"
            keywords="Programing, MERN,Redux,Mechine Learning"
          />
          <div className="flex h-[200vh]">
            <div className="xl:w-[16%] w-1/5">
              <AdminSidebar />
            </div>
            <div className="w-[85%]">
              <DashboardHero />
              <EditFaq />
            </div>
          </div>
        </div>
      </AdminProtected>
    </div>
  );
};

export default Page;
