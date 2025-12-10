import { styles } from "@/app/styles/style";
import CoursePlayer from "@/app/utils/CoursePlayer";
import Ratings from "@/app/utils/Ratings";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { IoCheckmarkDoneOutline, IoCloseOutline } from "react-icons/io5";
import { VscVerifiedFilled } from "react-icons/vsc";
import CourseContentList from "../Course/CourseContentList";
import { Elements } from "@stripe/react-stripe-js";
import CheckOutForm from "../Payment/CheckOutForm";
import { useLoadUserQuery } from "@/redux/features/api/apiSlice";
import { format } from "timeago.js";
import { useTheme } from "next-themes";

type Props = {
  data: any;
  stripePromise: any;
  clientSecret: string;
  setRoute: any;
  setOpen: any;
};

const CourseDetails = ({
  data,
  stripePromise,
  clientSecret,
  setRoute,
  setOpen: openAuthModel,
}: Props) => {
  const { data: userData } = useLoadUserQuery(undefined, {});
  const [user, setUser] = useState<any>();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setUser(userData?.user);
  }, [userData]);

  const dicountPercentenge =
    ((data?.estimatedPrice - data?.price) / data?.estimatedPrice) * 100;

  const discountPercentengePrice = dicountPercentenge.toFixed(0);

  const isPurchased =
    user && user?.courses?.find((item: any) => item._id === data?._id);

  const handleOrder = (e: any) => {
    if (user) {
      setOpen(true);
    } else {
      setRoute("Login");
      openAuthModel(true);
    }
  };

  const { theme } = useTheme();

  console.log('course data',data)

  return (
    <div>
      <div className="w-[90%] md:w-[90%] m-auto py-5">
        <div className="w-full flex flex-col-reverse md:flex-row">
          <div className="w-full md:w-[65%] md:pr-5">
            <h1
              className={`text-[25px] font-Poppins font-[600] ${
                theme === "dark" ? "text-white" : "text-black"
              }`}
            >
              {data?.name}
            </h1>
            <div className="flex items-center justify-between pt-3">
              <div className="flex items-center">
                <Ratings rating={data?.ratings} />
                <h5
                  className={`${
                    theme === "dark" ? "text-white" : "text-black"
                  }`}
                >
                  {data?.reviews?.length} Reviews
                </h5>
              </div>
              <h5
                className={`${theme === "dark" ? "text-white" : "text-black"}`}
              >
                {data?.isPurchased} Students
              </h5>
            </div>
            <br />
            <h1
              className={`text-[25px] font-Poppins font-[600] ${
                theme === "dark" ? "text-white" : "text-black"
              }`}
            >
              What you will learn from this course?
            </h1>
            <div>
              {data?.benefits?.map((item: any, index: number) => (
                <div className="w-full flex md:items-center py-2" key={index}>
                  <div className="w-[15px] mr-1">
                    <IoCheckmarkDoneOutline
                      size={20}
                      className={`${
                        theme === "dark" ? "text-white" : "text-black"
                      }`}
                    />
                  </div>
                  <p
                    className={`pl-2 ${
                      theme === "dark" ? "text-white" : "text-black"
                    }`}
                  >
                    {item.title}
                  </p>
                </div>
              ))}
              <br />
              <br />
            </div>
            <h1
              className={`text-[25px] font-Poppins font-[600] ${
                theme === "dark" ? "text-white" : "text-black"
              }`}
            >
              What are the prerequisites for starting this course?
            </h1>
            {data?.prerequisites?.map((item: any, index: number) => (
              <div className="w-full flex md:items-center py-2" key={index}>
                <div className="w-[15px] mr-1">
                  <IoCheckmarkDoneOutline
                    size={20}
                    className={`${
                      theme === "dark" ? "text-white" : "text-black"
                    }`}
                  />
                </div>
                <p
                  className={`pl-2 ${
                    theme === "dark" ? "text-white" : "text-black"
                  }`}
                >
                  {item.title}
                </p>
              </div>
            ))}
            <br />
            <br />
            <div>
              <h1
                className={`text-[25px] font-Poppins font-[600] ${
                  theme === "dark" ? "text-white" : "text-black"
                }`}
              >
                Course Overview
              </h1>
              <CourseContentList data={data?.courseData} isDemo={true} />
            </div>
            <br />
            <br />
            <div className="w-full">
              <h1
                className={`text-[25px] font-Poppins font-[600] ${
                  theme === "dark" ? "text-white" : "text-black"
                }`}
              >
                Course Details
              </h1>
              <p
                className={`text-[18px] mt-[20px] whitespace-pre-line w-full overflow-hidden ${
                  theme === "dark" ? "text-white" : "text-black"
                }`}
              >
                {data?.description}
              </p>
            </div>
            <br />
            <br />
            <div className="w-full">
              <div className="md:flex items-center">
                <Ratings rating={data?.ratings} />
                <div className="mb-2 md:mb-[unset]" />
                <h5
                  className={`text-[25px] font-Poppins ${
                    theme === "dark" ? "text-white" : "text-black"
                  }`}
                >
                  {Number.isInteger(data?.ratings)
                    ? data?.ratings.toFixed(1)
                    : data?.ratings.toFixed(2)}{" "}
                  Course Rating • {data?.reviews?.length} Reviews
                </h5>
              </div>
              <br />
              {(data?.reviews && [...data?.reviews]?.reverse())?.map(
                (item: any, index: number) => (
                  <div className="w-full pb-4" key={index}>
                    <div className="flex">
                      <div className="w-[50px] h-[50px]">
                        <Image
                          src={
                            item.user?.avatar
                              ? item.user?.avatar.url
                              : "https://media.istockphoto.com/id/1495088043/vector/user-profile-icon-avatar-or-person-icon-profile-picture-portrait-symbol-default-portrait.jpg?s=612x612&w=0&k=20&c=dhV2p1JwmloBTOaGAtaA3AW1KSnjsdMt7-U_3EZElZ0="
                          }
                          width={50}
                          height={50}
                          alt=""
                          className="w-[50px] h-[50px] rounded-full object-cover"
                        />
                      </div>
                      <div className="hidden md:block pl-2">
                        <div className="flex items-center">
                          <h5
                            className={`text-[18px] pr-2 ${
                              theme === "dark" ? "text-white" : "text-black"
                            }`}
                          >
                            {item.user.name}
                          </h5>
                          <Ratings rating={item.rating} />
                        </div>
                        <p
                          className={`${
                            theme === "dark" ? "text-white" : "text-black"
                          }`}
                        >
                          {item.comment}
                        </p>
                        <small
                          className={`${
                            theme === "dark"
                              ? "text-[#ffffff83]"
                              : "text-gray-500"
                          }`}
                        >
                          {format(item.createdAt)} •
                        </small>
                      </div>
                      <div className="pl-2 flex md:hidden items-center">
                        <h5
                          className={`text-[18px] pr-2 ${
                            theme === "dark" ? "text-white" : "text-black"
                          }`}
                        >
                          {item.user.name}
                        </h5>
                        <Ratings rating={item.rating} />
                      </div>
                    </div>
                    {item.commentReplies.map((i: any, index: number) => (
                      <div className="w-full flex md:ml-16 my-5" key={index}>
                        <div className="w-[50px] h-[50px]">
                          <Image
                            src={
                              i.user.avatar
                                ? i.user.avatar.url
                                : "https://res.cloudinary.com/dshp9jnuy/image/upload/v1665822253/avatars/nrxsg8sd9iy10bbsoenn.png"
                            }
                            width={50}
                            height={50}
                            alt=""
                            className="w-[50px] h-[50px] rounded-full object-cover"
                          />
                        </div>
                        <div className="pl-2">
                          <div className="flex items-center">
                            <h5
                              className={`text-[20px] ${
                                theme === "dark" ? "text-white" : "text-black"
                              }`}
                            >
                              {i.user.name}
                            </h5>{" "}
                            <VscVerifiedFilled className="text-[#0095F6] ml-2 text-[20px]" />
                          </div>
                          <p
                            className={`${
                              theme === "dark" ? "text-white" : "text-black"
                            }`}
                          >
                            {i.comment}
                          </p>
                          <small
                            className={`${
                              theme === "dark"
                                ? "text-[#ffffff83]"
                                : "text-gray-500"
                            }`}
                          >
                            {format(i.createdAt)} •
                          </small>
                        </div>
                      </div>
                    ))}
                  </div>
                )
              )}
            </div>
          </div>

          <div className="w-full md:w-[35%] relative">
            <div className="sticky top-[100px] left-0 z-50 w-full">
              <CoursePlayer videoUrl={data?.demoUrl} title={data?.title} />
              <div className="flex items-center">
                <h1
                  className={`pt-5 text-[25px] ${
                    theme === "dark" ? "text-white" : "text-black"
                  }`}
                >
                  {data?.price === 0 ? "Free" : data?.price + "$"}
                </h1>
                <h5
                  className={`pl-3 text-[20px] mt-2 line-through opacity-80 ${
                    theme === "dark" ? "text-white" : "text-black"
                  }`}
                >
                  {data?.estimatedPrice}$
                </h5>

                <h4
                  className={`pl-5 pt-4 text-[22px] ${
                    theme === "dark" ? "text-white" : "text-black"
                  }`}
                >
                  {discountPercentengePrice}% Off
                </h4>
              </div>
              <div className="flex items-center">
                {isPurchased ? (
                  <Link
                    className={`${styles.button} !w-[180px] my-3 font-Poppins cursor-pointer !bg-[crimson]`}
                    href={`/course-access/${data?._id}`}
                  >
                    Enter to Course
                  </Link>
                ) : (
                  <div
                    className={`${styles.button} !w-[180px] my-3 font-Poppins cursor-pointer !bg-[crimson]`}
                    onClick={handleOrder}
                  >
                    Buy Now {data?.price}$
                  </div>
                )}
              </div>
              <br />
              <p
                className={`${
                  theme === "dark" ? "text-white" : "text-black"
                } pb-1`}
              >
                • Source code included
              </p>
              <p
                className={`${
                  theme === "dark" ? "text-white" : "text-black"
                } pb-1`}
              >
                • Full lifetime access
              </p>
              <p
                className={`${
                  theme === "dark" ? "text-white" : "text-black"
                } pb-1`}
              >
                • Certificate of completion
              </p>
              <p
                className={`${
                  theme === "dark" ? "text-white" : "text-black"
                } pb-3 md:pb-1`}
              >
                • Premium Support
              </p>
            </div>
          </div>
        </div>
      </div>

      {open && (
        <div className="w-full h-screen bg-[#00000036] fixed top-0 left-0 z-50 flex items-center justify-center">
          <div
            className={`w-[500px] min-h-[500px] rounded-xl shadow p-3 ${
              theme === "dark" ? "bg-slate-900" : "bg-white"
            }`}
          >
            <div className="w-full flex justify-end">
              <IoCloseOutline
                size={40}
                className={`${
                  theme === "dark" ? "text-white" : "text-black"
                } cursor-pointer`}
                onClick={() => setOpen(false)}
              />
            </div>
            <div className="w-full">
              {stripePromise && clientSecret && (
                <Elements stripe={stripePromise} options={{ clientSecret }}>
                  <CheckOutForm setOpen={setOpen} data={data} user={user} />
                </Elements>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CourseDetails;
