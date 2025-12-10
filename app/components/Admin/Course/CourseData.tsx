import { styles } from "@/app/styles/style";
import React, { FC } from "react";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import toast from "react-hot-toast";

type Item = { title: string };

type Props = {
  benefits: Item[];
  setBenefits: (benefits: Item[]) => void;
  prerequisites: Item[];
  setPrerequisites: (prerequisites: Item[]) => void;
  active: number;
  setActive: (active: number) => void;
};

const CourseData: FC<Props> = ({
  benefits = [],
  setBenefits,
  prerequisites = [],
  setPrerequisites,
  active,
  setActive,
}) => {
  // Always work with local safe arrays to avoid runtime errors
  const safeBenefits = Array.isArray(benefits) ? benefits : [];
  const safePrereqs = Array.isArray(prerequisites) ? prerequisites : [];

  const handleBenefitsChange = (index: number, value: any) => {
    const updateBenefits = [...safeBenefits];
    updateBenefits[index] = { ...updateBenefits[index], title: value };
    setBenefits(updateBenefits);
  };

  const handleAddBenefit = () => {
    setBenefits([...safeBenefits, { title: "" }]);
  };

  const handlePrerequisitesChange = (index: number, value: any) => {
    const updatePrerequisites = [...safePrereqs];
    updatePrerequisites[index] = {
      ...updatePrerequisites[index],
      title: value,
    };
    setPrerequisites(updatePrerequisites);
  };

  const handleAddPrerequisites = () => {
    setPrerequisites([...safePrereqs, { title: "" }]);
  };

  const prevButton = () => {
    setActive(active - 1);
  };

  const handleOptions = () => {
    // check last items safely
    const lastBenefitTitle = safeBenefits.length
      ? safeBenefits[safeBenefits.length - 1].title
      : "";
    const lastPrereqTitle = safePrereqs.length
      ? safePrereqs[safePrereqs.length - 1].title
      : "";

    if (lastBenefitTitle !== "" && lastPrereqTitle !== "") {
      setActive(active + 1);
    } else {
      toast.error("Please fill the fields for go to next!");
    }
  };

  return (
    <div className="w-[80%] m-auto mt-24 block">
      <div>
        <label className={`${styles.label} text-[20px]`} htmlFor="email">
          What are the benefits for students in this course?
        </label>
        <br />
        {safeBenefits.map((benefit, index) => (
          <input
            type="text"
            key={index}
            name="Benefits"
            placeholder="You will be also to build a full stack LMS platform..."
            required
            className={`${styles.input}`}
            value={benefit.title}
            onChange={(e) => handleBenefitsChange(index, e.target.value)}
          />
        ))}
        <AddCircleIcon
          style={{ margin: "10px 0px", cursor: "pointer", width: "30px" }}
          onClick={handleAddBenefit}
        />
      </div>
      <div>
        <label className={`${styles.label} text-[20px]`} htmlFor="email">
          What are the prerequisites for starting this course?
        </label>
        <br />
        {safePrereqs.map((pr, index) => (
          <input
            type="text"
            key={index}
            name="prerequisites"
            placeholder="You need basic knowledge of MERN stack"
            required
            className={`${styles.input}`}
            value={pr.title}
            onChange={(e) => handlePrerequisitesChange(index, e.target.value)}
          />
        ))}
        <AddCircleIcon
          style={{ margin: "10px 0px", cursor: "pointer", width: "30px" }}
          onClick={handleAddPrerequisites}
        />
      </div>
      <div className="w-full flex items-center justify-between">
        <div
          className="w-full md:w-[180px] flex items-center justify-center h-[40px] bg-[#37a39a] text-center text-[#fff] rounded mt-8 cursor-pointer"
          onClick={() => prevButton()}
        >
          Prev
        </div>
        <div
          className="w-full md:w-[180px] flex items-center justify-center h-[40px] bg-[#37a39a] text-center text-[#fff] rounded mt-8 cursor-pointer"
          onClick={() => handleOptions()}
        >
          Next
        </div>
      </div>
    </div>
  );
};

export default CourseData;
