import React from "react";
import Link from "next/link";
import { useTheme } from "next-themes";

const Footer = () => {
  const { theme } = useTheme();

  return (
    <footer>
      {/* Border */}
      <div
        className={`border ${
          theme === "dark" ? "border-[#ffffff1e]" : "border-gray-300"
        }`}
      />
      <br />

      <div className="w-[95%] md:w-full md:max-w-[85%] mx-auto px-2 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-4">

          {/* About */}
          <div className="space-y-3">
            <h3
              className={`text-[20px] font-[600] ${
                theme === "dark" ? "text-white" : "text-black"
              }`}
            >
              About
            </h3>

            <ul className="space-y-4">
              <li>
                <Link
                  href="/about"
                  className={`text-base ${
                    theme === "dark"
                      ? "text-gray-300 hover:text-white"
                      : "text-black hover:text-gray-600"
                  }`}
                >
                  Our Story
                </Link>
              </li>

              <li>
                <Link
                  href="/privacy-policy"
                  className={`text-base ${
                    theme === "dark"
                      ? "text-gray-300 hover:text-white"
                      : "text-black hover:text-gray-600"
                  }`}
                >
                  Privacy Policy
                </Link>
              </li>

              <li>
                <Link
                  href="/faq"
                  className={`text-base ${
                    theme === "dark"
                      ? "text-gray-300 hover:text-white"
                      : "text-black hover:text-gray-600"
                  }`}
                >
                  FAQ
                </Link>
              </li>
            </ul>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h3
              className={`text-[20px] font-[600] ${
                theme === "dark" ? "text-white" : "text-black"
              }`}
            >
              Quick Links
            </h3>

            <ul className="space-y-4">
              <li>
                <Link
                  href="/courses"
                  className={`text-base ${
                    theme === "dark"
                      ? "text-gray-300 hover:text-white"
                      : "text-black hover:text-gray-600"
                  }`}
                >
                  Courses
                </Link>
              </li>

              <li>
                <Link
                  href="/profile"
                  className={`text-base ${
                    theme === "dark"
                      ? "text-gray-300 hover:text-white"
                      : "text-black hover:text-gray-600"
                  }`}
                >
                  My Account
                </Link>
              </li>

              <li>
                <Link
                  href="/course-dashboard"
                  className={`text-base ${
                    theme === "dark"
                      ? "text-gray-300 hover:text-white"
                      : "text-black hover:text-gray-600"
                  }`}
                >
                  Course Dashboard
                </Link>
              </li>
            </ul>
          </div>

          {/* Social Links */}
          <div className="space-y-3">
            <h3
              className={`text-[20px] font-[600] ${
                theme === "dark" ? "text-white" : "text-black"
              }`}
            >
              Social Links
            </h3>

            <ul className="space-y-4">
              <li>
                <Link
                  href="https://www.youtube.com/"
                  className={`text-base ${
                    theme === "dark"
                      ? "text-gray-300 hover:text-white"
                      : "text-black hover:text-gray-600"
                  }`}
                >
                  Youtube
                </Link>
              </li>

              <li>
                <Link
                  href="https://www.instagram.com/"
                  className={`text-base ${
                    theme === "dark"
                      ? "text-gray-300 hover:text-white"
                      : "text-black hover:text-gray-600"
                  }`}
                >
                  Instagram
                </Link>
              </li>

              <li>
                <Link
                  href="https://www.github.com/"
                  className={`text-base ${
                    theme === "dark"
                      ? "text-gray-300 hover:text-white"
                      : "text-black hover:text-gray-600"
                  }`}
                >
                  Github
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3
              className={`text-[20px] font-[600] pb-3 ${
                theme === "dark" ? "text-white" : "text-black"
              }`}
            >
              Contact Info
            </h3>

            <p
              className={`text-base pb-2 ${
                theme === "dark"
                  ? "text-gray-300 hover:text-white"
                  : "text-black hover:text-gray-600"
              }`}
            >
              Call Us: 1-885-665-2022
            </p>

            <p
              className={`text-base pb-2 ${
                theme === "dark"
                  ? "text-gray-300 hover:text-white"
                  : "text-black hover:text-gray-600"
              }`}
            >
              Address: +7011 Vermont Ave, Los Angeles, CA 90044
            </p>

            <p
              className={`text-base pb-2 ${
                theme === "dark"
                  ? "text-gray-300 hover:text-white"
                  : "text-black hover:text-gray-600"
              }`}
            >
              Mail Us: hello@elearning.com
            </p>
          </div>
        </div>

        <br />
        <p
          className={`text-center ${
            theme === "dark" ? "text-white" : "text-black"
          }`}
        >
          Copyright © 2024 Elearning | All Rights Reserved
        </p>
      </div>

      <br />
    </footer>
  );
};

export default Footer;
