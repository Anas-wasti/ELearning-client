"use client";
import React from "react";
import Heading from "../utils/Heading";
import AdminSidebar from "../components/Admin/sidebar/AdminSidebar";
import AdminProtected from "../hooks/adminProtected";
import DashboardHero from "../components/Admin/DashboardHero";

type Props = {};

const page = (props: Props) => {
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
              <DashboardHero isDashboard={true} />
            </div>
          </div>
        </div>
      </AdminProtected>
    </div>
  );
};

export default page;
