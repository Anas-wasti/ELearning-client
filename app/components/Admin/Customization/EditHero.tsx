import { styles } from "@/app/styles/style";
import {
  useEditLayoutMutation,
  useGetHeroDataQuery,
} from "@/redux/features/layout/layoutApi";
import { useTheme } from "next-themes";
import React, { FC, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { AiOutlineCamera } from "react-icons/ai";

type Props = {};

const EditHero: FC<Props> = () => {
  const [image, setImage] = useState("");
  const [title, setTitle] = useState("");
  const [subTitle, setSubTitle] = useState("");

  const { data, refetch } = useGetHeroDataQuery("Banner", {
    refetchOnMountOrArgChange: true,
  });

  const [editLayout, { isLoading, isSuccess, error }] = useEditLayoutMutation();

  useEffect(() => {
    if (data) {
      setTitle(data?.layout?.banner.title);
      setSubTitle(data?.layout?.banner.subTitle);
      setImage(data?.layout?.banner?.image?.url);
    }
    if (isSuccess) {
      refetch();
      toast.success("Hero updated successfully!");
    }
    if (error) {
      if ("data" in error) {
        const errorData = error as any;
        toast.error(errorData?.data?.message);
      }
    }
  }, [data, isSuccess, error]);

  const handleUpdate = (e: any) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        if (reader.readyState === 2) {
          setImage(e.target.result as string);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleEdit = async () => {
    await editLayout({
      type: "Banner",
      image,
      title,
      subTitle,
    });
  };

  console.log("data", data);

  const { theme } = useTheme();

  return (
    <>
      <div className="w-full h-screen flex flex-col z-10 lg:flex-row items-center justify-between px-4 pb-20 lg:px-16 pt-[100px] gap-10 lg:gap-20 transition duration-300">
        {/* Left Side - Hero Image in Blue Circle */}
        <div className="relative w-[300px] h-[300px] lg:w-[350px] lg:h-[350px] xl:w-[850px] xl:h-[430px] rounded-full bg-[#17173f] flex items-center justify-center z-0">
          <div className="absolute lg:w-[50px] lg:h-[450px] xl:w-[400px] xl:h-[400px]">
            <img
              src={
                data?.layout?.banner?.image?.url || "/default-placeholder.png"
              }
              alt=""
              className="w-full h-full object-cover rounded-full"
            />
            <label htmlFor="image">
              <AiOutlineCamera className="absolute right-10 bottom-16 cursor-pointer" />
            </label>
            <input type="file" id="image" hidden onChange={handleUpdate} />
          </div>
        </div>

        {/* Right Side - Text Content */}
        <div className="lg:w-[60%] xl:w-[90%] flex flex-col items-center lg:mt-[0px] text-center lg:text-left mt-[150px]">
          <textarea
            className={`${
              theme === "dark" ? "text-white" : "text-black"
            } resize-none text-[20px] px-3 w-full lg:text-[40px] 2xl:text-[70px] font-[600] font-Josefin lg:leading-[75px] 2xl:w-[60%] xl:w-[108%] outline-none bg-transparent block`}
            placeholder="Improve Your Online Learning Experience Better Instantly"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            rows={3}
          />
          <br />
          <textarea
            value={subTitle}
            onChange={(e) => setSubTitle(e.target.value)}
            placeholder="We have 40k+ Online courses & 500K+ Online registered student. Find your desired Courses from them."
            className={`${
              theme === "dark" ? "text-white" : "text-black"
            } h-[130px] font-Josefin font-[500] text-[17px]  2xl:!h-[55%] xl:!w-[94%] bg-transparent  outline-none resize-none`}
          ></textarea>

          <br />
          <br />
          <br />
          <div
            className={`${styles.button} !w-[100px] a !min-h-[40px] !h-[40px] ${
              theme === "dark" ? "text-white" : "text-black"
            }
          ${
            data?.layout?.banner?.title !== title ||
            data?.layout?.banner?.subTitle !== subTitle ||
            data?.layout?.banner?.image?.url !== image
              ? "!cursor-pointer !bg-[#42d383]"
              : "!cursor-not-allowed"
          }
          !rounded absolute bottom-12 right-12`}
            onClick={
              data?.layout?.banner?.title !== title ||
              data?.layout?.banner?.subTitle !== subTitle ||
              data?.layout?.banner?.image?.url !== image
                ? handleEdit
                : () => null
            }
          >
            Save
          </div>
        </div>
      </div>
    </>
  );
};

export default EditHero;
