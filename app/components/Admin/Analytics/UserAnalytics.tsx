import React from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { styles } from "@/app/styles/style";

import Loader from "@/app/components/Loader/Loader";
import { useGetUsersAnalyticsQuery } from "@/redux/features/analytics/analyticsApi";
import { useTheme } from "next-themes";

type Props = {
  isDashboard?: boolean;
};

const UserAnalytics = ({ isDashboard }) => {
  const { data, isLoading } = useGetUsersAnalyticsQuery({});
  const { theme } = useTheme();

  const analyticsData: any = [];
  data &&
    data.users.last12Months.forEach((item: any) => {
      analyticsData.push({ name: item.month, count: item.count });
    });

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div
          className={`${
            !isDashboard
              ? "mt-[50px]"
              : `mt-[50px] shadow-sm pb-5 rounded-sm ${
                  theme === "dark" ? "bg-[#111C43]" : "bg-white"
                }`
          }`}
        >
          <div className={`${isDashboard ? "!ml-8 mb-5" : ""}`}>
            <h1
              className={`${styles.title} ${
                isDashboard && "!text-[20px]"
              } px-5 !text-start ${
                theme === "dark" ? "text-white" : "text-black"
              }`}
            >
              Users Analytics
            </h1>

            {!isDashboard && (
              <p
                className={`${styles.label} px-5 ${
                  theme === "dark" ? "text-white" : "text-black"
                }`}
              >
                Last 12 months analytics data{" "}
              </p>
            )}
          </div>

          <div
            className={`w-full ${
              isDashboard ? "h-[30vh]" : "h-screen"
            } flex items-center justify-center`}
          >
            <ResponsiveContainer
              width={isDashboard ? "100%" : "90%"}
              height={!isDashboard ? "50%" : "100%"}
            >
              <AreaChart
                data={analyticsData}
                margin={{
                  top: 20,
                  right: 30,
                  left: 0,
                  bottom: 0,
                }}
              >
                <XAxis
                  dataKey="name"
                  stroke={theme === "dark" ? "#fff" : "#000"} // <-- DARK MODE
                />
                <YAxis stroke={theme === "dark" ? "#fff" : "#000"} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: theme === "dark" ? "#1f2a40" : "#fff",
                    borderColor: theme === "dark" ? "#333" : "#ccc",
                  }}
                  labelStyle={{
                    color: theme === "dark" ? "#fff" : "#000",
                  }}
                  itemStyle={{
                    color: theme === "dark" ? "#fff" : "#000",
                  }}
                />

                <Area
                  type="monotone"
                  dataKey="count"
                  stroke={theme === "dark" ? "#4d62d9" : "#4d62d9"}
                  fill={theme === "dark" ? "#293b7a" : "#4d62d9"}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}
    </>
  );
};

export default UserAnalytics;
