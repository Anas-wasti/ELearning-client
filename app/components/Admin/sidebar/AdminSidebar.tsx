"use client";
import { FC, useEffect, useState } from "react";
import { ProSidebar, Menu, MenuItem } from "react-pro-sidebar";
import { Box, IconButton, Typography } from "@mui/material";
import "react-pro-sidebar/dist/css/styles.css";
import {
  HomeOutlinedIcon,
  ArrowForwardIosIcon,
  ArrowBackIosIcon,
  PeopleOutlinedIcon,
  ReceiptOutlinedIcon,
  BarChartOutlinedIcon,
  MapOutlinedIcon,
  GroupsIcon,
  OndemandVideoIcon,
  VideoCallIcon,
  WebIcon,
  QuizIcon,
  WysiwygIcon,
  ManageHistoryIcon,
  ExitToAppIcon,
} from "./Icon";
import avatarDefault from "../../../../public/assests/avatar.jpg";
import { useSelector } from "react-redux";
import Link from "next/link";
import Image from "next/image";
import { useTheme } from "next-themes";

interface itemProps {
  title: string;
  to: string;
  icon: React.JSX.Element;
  selected: string;
  setSelected: any;
}

const Item: FC<itemProps> = ({ title, to, icon, selected, setSelected }) => {
  const { theme } = useTheme();

  return (
    <MenuItem
      active={selected === title}
      onClick={() => setSelected(title)}
      icon={icon}
      className={`hover:!bg-[unset] ${
        theme === "dark" ? "text-white" : "text-black"
      }`}
    >
      <Link href={to} className="hover:!bg-[unset]">
        <Typography
          className={`!text-[16px] !font-Poppins ${
            theme === "dark" ? "text-white" : "text-black"
          }`}
        >
          {title}
        </Typography>
      </Link>
    </MenuItem>
  );
};

const AdminSidebar = () => {
  const { user } = useSelector((state: any) => state.auth);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [selected, setSelected] = useState("Dashboard");
  const [mounted, setMounted] = useState(false);
  const { theme } = useTheme();

  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  const logoutHandler = () => {
    console.log("logout clicked");
  };

  return (
    <Box
      sx={{
        "& .pro-sidebar-inner": {
          background: `${
            theme === "dark" ? "#111C43 !important" : "#fff !important"
          }`,
        },
        "& .pro-icon-wrapper": {
          backgroundColor: "transparent !important",
        },
        "& .pro-inner-item:hover": {
          color: "#868dfb !important",
        },
        "& .pro-menu-item.active": {
          color: "#6870fa !important",
        },
        "& .pro-inner-item": {
          padding: "5px 20px !important",
          opacity: 1,
        },
        "& .pro-menu-item": {
          color: theme === "dark" ? "#fff" : "#000",
        },
      }}
      className={`!bg-white overflow-y-scroll !rounded-2xl ${
        theme === "dark" ? "bg-[#111C43] text-white" : "bg-white text-black"
      }`}
    >
      <ProSidebar
        collapsed={isCollapsed}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          height: "100vh",
          zIndex: 99999999999999,
          transition: "width 0.3s ease",
          width: isCollapsed ? "60px" : "250px",
        }}
      >
        <Menu iconShape="square">
          {/* LOGO AND TOGGLE BUTTON */}
          <MenuItem
            onClick={() => setIsCollapsed(!isCollapsed)}
            icon={isCollapsed ? <ArrowForwardIosIcon /> : undefined}
            style={{
              margin: "10px 0 20px 0",
            }}
          >
            {!isCollapsed && (
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                ml="15px"
              >
                <Link href="/" className="block">
                  <h3
                    className={`text-[25px] font-Poppins uppercase ${
                      theme === "dark" ? "text-[#ffffffc1]" : "text-black"
                    }`}
                  >
                    ELearning
                  </h3>
                </Link>
                <IconButton
                  onClick={(e) => {
                    e.stopPropagation(); // prevent parent MenuItem click
                    setIsCollapsed(!isCollapsed);
                  }}
                  className="inline-block"
                >
                  <ArrowBackIosIcon
                    className={` ${
                      theme === "dark" ? "text-[#ffffffc1]" : "text-black"
                    }`}
                  />
                </IconButton>
              </Box>
            )}
          </MenuItem>

          {/* USER INFO */}
          {!isCollapsed && (
            <Box mb="25px">
              <Box display="flex" justifyContent="center" alignItems="center">
                <Image
                  alt="profile-user"
                  width={100}
                  height={100}
                  src={user.avatar ? user.avatar.url : avatarDefault}
                  style={{
                    cursor: "pointer",
                    borderRadius: "50%",
                    border: "3px solid #5b6fe6",
                  }}
                />
              </Box>
              <Box textAlign="center">
                <Typography
                  variant="h4"
                  className={`!text-[20px] ${
                    theme === "dark" ? "text-[#ffffffc1]" : "text-black"
                  }`}
                  sx={{ mt: 1 }}
                >
                  {user?.name}
                </Typography>
                <Typography
                  variant="h6"
                  className={`!text-[20px] capitalize ${
                    theme === "dark" ? "text-[#ffffffc1]" : "text-black"
                  }`}
                >
                  - {user?.role}
                </Typography>
              </Box>
            </Box>
          )}

          {/* MENU ITEMS */}
          <Box paddingLeft={isCollapsed ? undefined : "10%"}>
            <Item
              title="Dashboard"
              to="/admin"
              icon={<HomeOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />

            <Typography
              variant="h5"
              sx={{ mt: 2, ml: 3 }}
              className={`${
                theme === "dark" ? "text-white" : "text-black"
              } !text-[18px]`}
            >
              {!isCollapsed && "Data"}
            </Typography>
            <Item
              title="Users"
              to="/admin/users"
              icon={<GroupsIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Invoices"
              to="/admin/invoices"
              icon={<ReceiptOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />

            <Typography
              variant="h5"
              sx={{ mt: 2, ml: 3 }}
              className={`${
                theme === "dark" ? "text-white" : "text-black"
              } !text-[18px]`}
            >
              {!isCollapsed && "Content"}
            </Typography>
            <Item
              title="Create Course"
              to="/admin/create-course"
              icon={<VideoCallIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Live Courses"
              to="/admin/courses"
              icon={<OndemandVideoIcon />}
              selected={selected}
              setSelected={setSelected}
            />

            <Typography
              variant="h5"
              sx={{ mt: 2, ml: 3 }}
              className={`${
                theme === "dark" ? "text-white" : "text-black"
              } !text-[18px]`}
            >
              {!isCollapsed && "Customization"}
            </Typography>
            <Item
              title="Hero"
              to="/admin/hero"
              icon={<WebIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="FAQ"
              to="/admin/faq"
              icon={<QuizIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Categories"
              to="/admin/categories"
              icon={<WysiwygIcon />}
              selected={selected}
              setSelected={setSelected}
            />

            <Typography
              variant="h5"
              sx={{ mt: 2, ml: 3 }}
              className={`${
                theme === "dark" ? "text-white" : "text-black"
              } !text-[18px]`}
            >
              {!isCollapsed && "Controllers"}
            </Typography>
            <Item
              title="Manage Team"
              to="/admin/team"
              icon={<PeopleOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />

            <Typography
              variant="h6"
              sx={{ mt: 2, ml: 3 }}
              className={`${
                theme === "dark" ? "text-white" : "text-black"
              } !text-[18px]`}
            >
              {!isCollapsed && "Analytics"}
            </Typography>
            <Item
              title="Courses Analytics"
              to="/admin/courses-analytics"
              icon={<BarChartOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Orders Analytics"
              to="/admin/orders-analytics"
              icon={<MapOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Users Analytics"
              to="/admin/users-analytics"
              icon={<ManageHistoryIcon />}
              selected={selected}
              setSelected={setSelected}
            />

            <Typography
              variant="h6"
              sx={{ mt: 2, ml: 3 }}
              className={`${
                theme === "dark" ? "text-white" : "text-black"
              } !text-[18px]`}
            >
              {!isCollapsed && "Extras"}
            </Typography>
            <div onClick={logoutHandler} className="pb-10">
              <Item
                title="Logout"
                to="/"
                icon={<ExitToAppIcon />}
                selected={selected}
                setSelected={setSelected}
              />
            </div>
          </Box>
        </Menu>
      </ProSidebar>
    </Box>
  );
};

export default AdminSidebar;
