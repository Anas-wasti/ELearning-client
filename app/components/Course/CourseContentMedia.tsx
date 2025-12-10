import { styles } from "@/app/styles/style";
import CoursePlayer from "@/app/utils/CoursePlayer";
import {
  useAddAnswerInQuestionMutation,
  useAddNewQuestionMutation,
  useAddReplyInReviewMutation,
  useAddReviewInCourseMutation,
  useGeCoursesDetailsQuery,
} from "@/redux/features/courses/coursesApi";
import { useTheme } from "next-themes";
import Image from "next/image";
import { format } from "timeago.js";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { BiMessage } from "react-icons/bi";
import {
  AiFillStar,
  AiOutlineArrowLeft,
  AiOutlineArrowRight,
  AiOutlineStar,
} from "react-icons/ai";
import { VscVerifiedFilled } from "react-icons/vsc";
import Ratings from "@/app/utils/Ratings";
import socketIO from "socket.io-client";
const ENDPOINT = process.env.NEXT_PUBLIC_SOCKET_SERVER_URL || "";
const socketId = socketIO(ENDPOINT, { transports: ["websocket"] });

type Props = {
  data?: any;
  id: string;
  activeVideo: number;
  setActiveVideo: (activeVideo: number) => void;
  user: any;
  refetch: any;
};

const CourseContentMedia = ({
  data,
  id,
  activeVideo,
  setActiveVideo,
  user,
  refetch,
}: Props) => {
  const [activeBar, setActiveBar] = useState(0);
  const [question, setQuestion] = useState("");
  const [review, setReview] = useState("");
  const [rating, setRating] = useState(0);
  const [answer, setAnswer] = useState("");
  const [questionId, setQuestionId] = useState("");
  const [isReviewReply, setIsReviewReply] = useState(false);
  const [reviewId, setReviewId] = useState("");
  const [reply, setReply] = useState("");

  const [
    addNewQuestion,
    { isSuccess, error, isLoading: questionCreationLoading },
  ] = useAddNewQuestionMutation();
  const { data: courseData, refetch: courseRefetch } = useGeCoursesDetailsQuery(
    id,
    {
      refetchOnMountOrArgChange: true,
    }
  );
  const [
    addAnswerInQuestion,
    {
      isSuccess: answerSuccess,
      error: answerError,
      isLoading: answerCreationLoading,
    },
  ] = useAddAnswerInQuestionMutation();

  const course = courseData?.course;

  const [
    addReviewInCourse,
    {
      isSuccess: reviewSuccess,
      error: reviewError,
      isLoading: reviewCreationLoading,
    },
  ] = useAddReviewInCourseMutation();

  const [
    addReplyInReview,
    {
      isSuccess: replySuccess,
      error: replyError,
      isLoading: replyCreationLoading,
    },
  ] = useAddReplyInReviewMutation();

  const isReviewExists = course?.reviews?.find(
    (item: any) => item?.user?._id === user?._id
  );

  const handleQuestion = () => {
    if (question.length === 0) {
      toast.error("Question can't be empty!");
    } else {
      addNewQuestion({
        question,
        courseId: id,
        contentId: data[activeVideo]._id,
      });
    }
  };

  useEffect(() => {
    if (isSuccess) {
      setQuestion("");
      refetch();
      toast.success("Question added successfully!");
      socketId.emit("notification", {
        title: `New Question Received`,
        message: `You have a new question in ${data[activeVideo].title}`,
        userId: user._id,
      });
    }
    if (answerSuccess) {
      setAnswer("");
      refetch();
      toast.success("Answer added successfully!");
      if (user.role !== "admin") {
        socketId.emit("notification", {
          title: `New Question Received`,
          message: `You have a new question reply in ${data[activeVideo].title}`,
          userId: user._id,
        });
      }
    }
    if (error) {
      if ("data" in error) {
        const errorMessage = error as any;
        toast.error(errorMessage?.data?.message);
      }
    }
    if (answerError) {
      if ("data" in answerError) {
        const errorMessage = error as any;
        toast.error(errorMessage?.data?.message);
      }
    }
    if (reviewSuccess) {
      setReview("");
      setRating(1);
      courseRefetch();
      toast.success("Review added successfully!");
      socketId.emit("notification", {
        title: `New Question Received`,
        message: `You have a new question in ${data[activeVideo].title}`,
        userId: user._id,
      });
    }
    if (reviewError) {
      if ("data" in reviewError) {
        const errorMessage = error as any;
        toast.error(errorMessage?.data?.message);
      }
    }
    if (replySuccess) {
      setReply("");
      courseRefetch();
      toast.success("Reply added successfully!");
    }
    if (replyError) {
      if ("data" in replyError) {
        const errorMessage = error as any;
        toast.error(errorMessage?.data?.message);
      }
    }
  }, [
    isSuccess,
    error,
    answerSuccess,
    answerError,
    reviewSuccess,
    reviewError,
    replySuccess,
    replyError,
  ]);

  const handleAnswerSubmit = () => {
    addAnswerInQuestion({
      answer,
      courseId: id,
      contentId: data[activeVideo]._id,
      questionId: questionId,
    });
  };

  const handleReviewSubmit = async () => {
    if (review.length === 0) {
      toast.error("Review cannot be empty!");
    } else {
      addReviewInCourse({ review, rating, courseId: id });
    }
  };

  const handleReviewReplySubmit = () => {
    if (!replyCreationLoading) {
      if (reply === "") {
        toast.error("Reply con't be empty!");
      } else {
        addReplyInReview({
          comment: reply,
          courseId: id,
          reviewId,
        });
      }
    }
  };

  const { theme } = useTheme();

  return (
    <>
      <div className="w-[95%] md:w-[86%] py-4 m-auto">
        <CoursePlayer
          title={data[activeVideo]?.title}
          videoUrl={data[activeVideo]?.videoUrl}
        />
        <div className="w-full flex items-center justify-between my-3">
          <div
            className={`${
              styles.button
            } text-white !w-[unset] !min-h-[40px] !py-[unset] ${
              activeVideo === 0 && "!cursor-no-drop opacity-[.8]"
            }`}
            onClick={() =>
              setActiveVideo(activeVideo === 0 ? 0 : activeVideo - 1)
            }
          >
            <AiOutlineArrowLeft className="mr-2" />
            Prev Lesson
          </div>
          <div
            className={`${
              styles.button
            } text-white !w-[unset]  !min-h-[40px] !py-[unset] ${
              data?.length - 1 === activeVideo && "!cursor-no-drop opacity-[.8]"
            }`}
            onClick={() =>
              setActiveVideo(
                data && data?.length - 1 === activeVideo
                  ? activeVideo
                  : activeVideo + 1
              )
            }
          >
            Next Lesson
            <AiOutlineArrowRight className="ml-2" />
          </div>
        </div>
        <h1
          className={`pt-2 text-[25px] font-[600] ${
            theme === "dark" ? "text-white" : "text-black"
          }`}
        >
          {data[activeVideo]?.title}
        </h1>
        <br />
        <div className="w-full p-4 flex items-center justify-between bg-slate-500 bg-opacity-20 backdrop-blur shadow-[bg-slate-700] rounded">
          {["Overview", "Resources", "Q&A", "Reviews"].map((text, index) => (
            <h5
              key={index}
              className={`md:text-[20px] cursor-pointer ${
                activeBar === index
                  ? "text-red-500"
                  : theme === "dark"
                  ? "text-white"
                  : "text-black"
              }`}
              onClick={() => setActiveBar(index)}
            >
              {text}
            </h5>
          ))}
        </div>
        <br />
        {activeBar === 0 && (
          <p
            className={`text-[18px] whitespace-pre-line mb-3 ${
              theme === "dark" ? "text-white" : "text-black"
            }`}
          >
            {data[activeVideo]?.description}
          </p>
        )}

        {activeBar === 1 && (
          <div>
            {data[activeVideo]?.links.map((item: any, index: number) => (
              <div className="mb-5" key={index}>
                <h2
                  className={`md:text-[20px] md:inline-block ${
                    theme === "dark" ? "text-white" : "text-black"
                  }`}
                >
                  {item.title && item.title + " :"}
                </h2>
                <a
                  className="inline-block text-[#4395c4] md:text-[20px] md:pl-2"
                  href={item.url}
                >
                  {item.url}
                </a>
              </div>
            ))}
          </div>
        )}

        {activeBar === 2 && (
          <>
            <div className="flex max-w-full">
              <Image
                src={
                  user?.avatar
                    ? user?.avatar.url
                    : "https://media.istockphoto.com/id/1495088043/vector/user-profile-icon-avatar-or-person-icon-profile-picture-portrait-symbol-default-portrait.jpg?s=612x612&w=0&k=20&c=dhV2p1JwmloBTOaGAtaA3AW1KSnjsdMt7-U_3EZElZ0="
                }
                width={50}
                height={50}
                alt=""
                className="w-[50px] h-[50px] rounded-full object-cover"
              />
              <textarea
                name=""
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                id=""
                cols={40}
                rows={5}
                placeholder="Write your question..."
                className={`outline-none bg-transparent ml-3 border md:w-full p-2 rounded w-[90%] md:text-[18px] font-Poppins ${
                  theme === "dark"
                    ? "text-white border-[#ffffff57] placeholder-white"
                    : "text-black border-[#00000057] placeholder-black"
                }`}
              ></textarea>
            </div>
            <div className="w-full flex justify-end">
              <div
                className={`${
                  styles.button
                } !w-[120px] !h-[40px] text-[18px] mt-5 ${
                  questionCreationLoading && "cursor-not-allowed"
                }`}
                onClick={questionCreationLoading ? () => {} : handleQuestion}
              >
                Submit
              </div>
            </div>
            <br />
            <br />
            <div className="w-full h-[1px] bg-[#ffffff3d]"></div>
            <div>
              <CommentReply
                data={data}
                activeVideo={activeVideo}
                answer={answer}
                setAnswer={setAnswer}
                handleAnswerSubmit={handleAnswerSubmit}
                user={user}
                setQuestionId={setQuestionId}
                questionId={questionId}
                answerCreationLoading={answerCreationLoading}
              />
            </div>
          </>
        )}

        {activeBar === 3 && (
          <div className="w-full">
            <>
              {!isReviewExists && (
                <>
                  <div className="flex w-full">
                    <Image
                      src={
                        user?.avatar
                          ? user?.avatar.url
                          : "https://media.istockphoto.com/id/1495088043/vector/user-profile-icon-avatar-or-person-icon-profile-picture-portrait-symbol-default-portrait.jpg?s=612x612&w=0&k=20&c=dhV2p1JwmloBTOaGAtaA3AW1KSnjsdMt7-U_3EZElZ0="
                      }
                      width={50}
                      height={50}
                      alt=""
                      className="w-[50px] h-[50px] rounded-full object-cover"
                    />
                    <div className="w-full">
                      <h5
                        className={`pl-3 text-[20px] font-[500] ${
                          theme === "dark" ? "text-white" : "text-black"
                        }`}
                      >
                        Give a Rating <span className="text-red-500">*</span>
                      </h5>
                      <div className="flex w-full ml-2 pb-3">
                        {[1, 2, 3, 4, 5].map((i) =>
                          rating >= i ? (
                            <AiFillStar
                              key={i}
                              className="mr-1 cursor-pointer"
                              color="rgb(246,186,0)"
                              size={25}
                              onClick={() => setRating(i)}
                            />
                          ) : (
                            <AiOutlineStar
                              key={i}
                              className="mr-1 cursor-pointer"
                              color="rgb(246,186,0)"
                              size={25}
                              onClick={() => setRating(i)}
                            />
                          )
                        )}
                      </div>
                      <textarea
                        name=""
                        value={review}
                        onChange={(e) => setReview(e.target.value)}
                        id=""
                        cols={40}
                        rows={5}
                        placeholder="Write your comment..."
                        className={`outline-none bg-transparent md:ml-3 border ${
                          theme === "dark"
                            ? "text-white border-[#ffffff57]"
                            : "text-black border-[#ffffffbe]"
                        } w-[95%] md:w-full p-2 rounded text-[18px] font-Poppins`}
                      ></textarea>
                    </div>
                  </div>
                  <div className="w-full flex justify-end">
                    <div
                      className={`${
                        styles.button
                      } !w-[120px] !h-[40px] text-[18px] mt-5 md:mr-0 mr-2 ${
                        reviewCreationLoading && "cursor-no-drop"
                      }`}
                      onClick={
                        reviewCreationLoading ? () => {} : handleReviewSubmit
                      }
                    >
                      Submit
                    </div>
                  </div>
                </>
              )}
              <br />
              <div className="w-full h-[1px] bg-[#ffffff3d]"></div>
              <div className="w-full">
                {(course?.reviews && [...course.reviews].reverse())?.map(
                  (item: any, index: number) => {
                    return (
                      <div
                        className={`w-full my-5 ${
                          theme === "dark" ? "text-white" : "text-black"
                        }`}
                        key={index}
                      >
                        <div className="w-full flex">
                          <div>
                            <Image
                              src={
                                user?.avatar
                                  ? user?.avatar.url
                                  : "https://media.istockphoto.com/id/1495088043/vector/user-profile-icon-avatar-or-person-icon-profile-picture-portrait-symbol-default-portrait.jpg?s=612x612&w=0&k=20&c=dhV2p1JwmloBTOaGAtaA3AW1KSnjsdMt7-U_3EZElZ0="
                              }
                              width={50}
                              height={50}
                              alt=""
                              className="w-[50px] h-[50px] rounded-full object-cover"
                            />
                          </div>
                          <div className="ml-2">
                            <h1
                              className={`text-[18px] ${
                                theme === "dark" ? "text-white" : "text-black"
                              }`}
                            >
                              {item?.user?.name}
                            </h1>
                            <Ratings rating={item.rating} />
                            <p>{item.comment}</p>
                            <small
                              className={`${
                                theme === "dark"
                                  ? "text-[#ffffff83]"
                                  : "text-[#00000083]"
                              }`}
                            >
                              {format(item.createdAt)} •
                            </small>
                          </div>
                        </div>

                        {user.role === "admin" &&
                          item.commentReplies.length === 0 && (
                            <span
                              className={`${
                                theme === "dark" ? "text-white" : "text-black"
                              } !ml-10 cursor-pointer`}
                              onClick={() => {
                                setIsReviewReply(true);
                                setReviewId(item._id);
                              }}
                            >
                              Add Reply
                            </span>
                          )}
                        {isReviewReply && reviewId === item._id && (
                          <div className="w-full flex relative">
                            <input
                              type="text"
                              placeholder="Enter your reply..."
                              value={reply}
                              onChange={(e: any) => setReply(e.target.value)}
                              className={`block md:ml-12 mt-2 outline-none bg-transparent border-b  ${
                                theme === "dark"
                                  ? "border-[#fff] text-white"
                                  : "border-[#000] text-black "
                              } p-[5px] w-[95%]`}
                            />
                            <button
                              type="submit"
                              className={`${
                                theme === "dark" ? "text-white" : "text-black"
                              } absolute right-0 bottom-1 bg-[#2190ff] cursor-pointer p-2 rounded-3xl px-6 font-semibold`}
                              onClick={handleReviewReplySubmit}
                            >
                              Submit
                            </button>
                          </div>
                        )}

                        {item.commentReplies.map((i: any, index: number) => (
                          <div
                            className="w-full flex md:ml-16 my-5"
                            key={index}
                          >
                            <div className="w-[50px] h-[50px]">
                              <Image
                                src={
                                  i.user?.avatar
                                    ? i.user?.avatar.url
                                    : "https://media.istockphoto.com/id/1495088043/vector/user-profile-icon-avatar-or-person-icon-profile-picture-portrait-symbol-default-portrait.jpg?s=612x612&w=0&k=20&c=dhV2p1JwmloBTOaGAtaA3AW1KSnjsdMt7-U_3EZElZ0="
                                }
                                width={50}
                                height={50}
                                alt=""
                                className="w-[50px] h-[50px] rounded-full object-cover"
                              />
                            </div>
                            <div className="pl-2">
                              <div className="flex items-center">
                                <h5 className="text-[20px]">{i.user.name}</h5>{" "}
                                <VscVerifiedFilled className="text-[#0095F6] ml-2 text-[20px]" />
                              </div>
                              <p>{i.comment}</p>
                              <small className="text-[#ffffff83]">
                                {format(i.createdAt)} •
                              </small>
                            </div>
                          </div>
                        ))}
                      </div>
                    );
                  }
                )}
              </div>
            </>
          </div>
        )}
      </div>
    </>
  );
};

const CommentReply = ({
  data,
  activeVideo,
  answer,
  setAnswer,
  handleAnswerSubmit,
  questionId,
  setQuestionId,
  answerCreationLoading,
}: any) => {
  return (
    <>
      <div className="w-full my-3">
        {data[activeVideo]?.questions?.map((item: any, index: any) => (
          <CommentItem
            key={index}
            data={data}
            activeVideo={activeVideo}
            item={item}
            index={index}
            answer={answer}
            setAnswer={setAnswer}
            setQuestionId={setQuestionId}
            handleAnswerSubmit={handleAnswerSubmit}
            questionId={questionId}
            answerCreationLoading={answerCreationLoading}
          />
        ))}
      </div>
    </>
  );
};

const CommentItem = ({
  questionId,
  setQuestionId,
  item,
  answer,
  setAnswer,
  handleAnswerSubmit,
  answerCreationLoading,
}: any) => {
  const [replyActive, setreplyActive] = useState(false);

  const { theme } = useTheme();

  return (
    <>
      <div className="my-4">
        <div className="flex mb-2">
          <div>
            <Image
              src={
                item?.user?.avatar
                  ? item?.user?.avatar.url
                  : "https://media.istockphoto.com/id/1495088043/vector/user-profile-icon-avatar-or-person-icon-profile-picture-portrait-symbol-default-portrait.jpg?s=612x612&w=0&k=20&c=dhV2p1JwmloBTOaGAtaA3AW1KSnjsdMt7-U_3EZElZ0="
              }
              width={50}
              height={50}
              alt=""
              className="w-[50px] h-[50px] rounded-full object-cover"
            />
          </div>
          <div
            className={`pl-3 ${theme === "dark" ? "text-white" : "text-black"}`}
          >
            <h5 className="text-[20px]">{item?.user?.name}</h5>
            <p>{item?.question}</p>
            <small
              className={`${
                theme === "dark" ? "text-[#ffffff83]" : "text-[#000000b8]"
              }`}
            >
              {!item?.createdAt ? "" : format(item?.createdAt)} •
            </small>
          </div>
        </div>
        <div className="w-full flex">
          <span
            className={`md:pl-16 ${
              theme === "dark" ? "text-[#ffffff83]" : "text-[#000000b8]"
            } cursor-pointer mr-2`}
            onClick={() => {
              setreplyActive(!replyActive);
              setQuestionId(item._id);
            }}
          >
            {!replyActive
              ? item.questionReplies.length !== 0
                ? "All Replies"
                : "Add Reply"
              : "Hide Replies"}
          </span>
          <BiMessage
            size={20}
            className={`cursor-pointer ${
              theme === "dark" ? "text-[#ffffff83]" : "text-[#000000b8]"
            }`}
          />
          <span
            className={`pl-1 mt-[-4px] cursor-pointer ${
              theme === "dark" ? "text-[#ffffff83]" : "text-[#000000b8]"
            }`}
          >
            {item.questionReplies.length}
          </span>
        </div>
        {replyActive && questionId === item._id && (
          <>
            {item.questionReplies.map((item: any) => (
              <div
                className={`w-full flex md:ml-16 my-5 ${
                  theme === "dark" ? "text-white" : "text-black"
                }`}
                key={item.id}
              >
                <div>
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
                <div className="pl-3">
                  <div className="flex items-center">
                    <h5 className="text-[20px]">{item?.user?.name}</h5>{" "}
                    {item?.user?.role === "admin" && (
                      <VscVerifiedFilled className="text-[#50c750] ml-2 text-[20px]" />
                    )}
                  </div>
                  <p>{item.answer}</p>
                  <small className="text-[#ffffff83]">
                    {format(item.createdAt)}
                  </small>
                </div>
              </div>
            ))}
            <div
              className={`!w-full flex relative ${
                theme === "dark" ? "text-white" : "text-black"
              }`}
            >
              <input
                type="text"
                placeholder="Enter your answer..."
                value={answer}
                onChange={(e: any) => setAnswer(e.target.value)}
                className={`block md:ml-12 mt-2 outline-none bg-transparent border-b ${
                  theme === "dark"
                    ? "text-white border-[#fff]"
                    : "text-black border-[#00000027]"
                } p-[5px] w-[95%] ${
                  answer === "" ||
                  (answerCreationLoading && "cursor-not-allowed")
                }`}
              />
              <button
                type="submit"
                className="absolute right-0 bottom-1 cursor-pointer"
                onClick={handleAnswerSubmit}
                disabled={answer === "" || answerCreationLoading}
              >
                Submit
              </button>
            </div>
            <br />
          </>
        )}
      </div>
    </>
  );
};

export default CourseContentMedia;
