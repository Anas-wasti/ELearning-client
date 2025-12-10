"use client";
import React from "react";
import DashboardHeader from "@/app/components/Admin/DashboardHeader";
import AdminSidebar from "@/app/components/Admin/sidebar/AdminSidebar";
import Heading from "@/app/utils/Heading";
import OrdersAnalytics from "../../components/Admin/Analytics/OrdersAnalytics";

type Props = {};

const page = (props: Props) => {
  return (
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
          <DashboardHeader />
          <OrdersAnalytics />
        </div>
      </div>
    </div>
  );
};

export default page;
