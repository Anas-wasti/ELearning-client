import { styles } from "@/app/styles/style";
import { useUpdatePasswordMutation } from "@/redux/features/user/userApi";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

const ChangePassword = () => {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [updatePassword, { isSuccess, error }] = useUpdatePasswordMutation();

  const passwordChangeHandler = async (e: any) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      toast.error("Password do not match!");
    } else {
      await updatePassword({ oldPassword, newPassword });
    }
  };

  useEffect(() => {
    if (isSuccess) {
      toast.success("Password changed successfully!");
    } else {
      if (error) {
        if ("data" in error) {
          const errorData = error as any;
          toast.error(errorData.data.message);
        }
      }
    }
  }, [isSuccess, error]);

  const { theme } = useTheme();
  return (
    <div className="w-full pl-7 px-2 md:px-5 md:pl-0">
      <h1
        className={`block text-[25px] md:text-[30px] font-Poppins text-center font-[500] pb-2 ${
          theme === "dark" ? "text-white" : "text-black"
        }`}
      >
        Change Password
      </h1>
      <div className="w-full">
        <form
          aria-required
          onSubmit={passwordChangeHandler}
          className="flex flex-col items-center"
        >
          <div className=" w-[100%] md:w-[60%] mt-5">
            <label
              className={`block md:pb-2 ${
                theme === "dark" ? "text-white" : "text-black"
              }`}
            >
              Enter your old password
            </label>
            <input
              type="password"
              className={`${styles.input} !w-[95%] mb-4 md:mb-0  ${
                theme === "dark" ? "text-white" : "text-black"
              }`}
              required
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
            />
          </div>
          <div className=" w-[100%] md:w-[60%] mt-2">
            <label
              className={`block md:pb-2  ${
                theme === "dark" ? "text-white" : "text-black"
              }`}
            >
              Enter your new password
            </label>
            <input
              type="password"
              className={`${styles.input} !w-[95%] mb-4 md:mb-0  ${
                theme === "dark" ? "text-white" : "text-black"
              }`}
              required
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
          </div>
          <div className=" w-[100%] md:w-[60%] mt-2">
            <label
              className={`block md:pb-2 ${
                theme === "dark" ? "text-white" : "text-black"
              }`}
            >
              Enter your confirm password
            </label>
            <input
              type="password"
              className={`${styles.input} !w-[95%] mb-4 md:mb-0  ${
                theme === "dark" ? "text-white" : "text-black"
              }`}
              required
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            <input
              className={`w-[95%] h-[40px] border border-t-[#37a39a] border-b-[#37a39a] text-center ${
                theme === "dark" ? "text-white" : "text-black"
              } rounded-[3px] mt-6 md:mt-8 cursor-pointer`}
              required
              value="Update"
              type="submit"
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default ChangePassword;
