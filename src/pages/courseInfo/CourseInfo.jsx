import React, { useEffect, useRef } from "react";
import Footer from "../../components/Layout/Footer/Footer";
import Breadcrumb from "../../components/common/Breadcrumb/Breadcrumb";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import CourseDetailBox from "../../components/course/CourseDetailBox/CourseDetailBox";
import CommentsTextArea from "../../components/common/CommentsTextArea/CommentsTextArea";
import { fetchAddToCart, addToGuestCart } from "../../redux/slices/cartSlice";
import { useDispatch } from "react-redux";
import swal from "sweetalert";
import Cookies from "js-cookie";
import Plyr from "plyr";
import {
  getCourseDetails,
  registerFreeCourse as registerCourse,
} from "../../api/courses";
import "plyr/dist/plyr.css";

const CourseInfo = () => {
  const videoRef = useRef(null);
  const dispatch = useDispatch();
  const { courseName } = useParams();
  const [courseInfo, setCourseInfo] = React.useState({});
  const [comments, setComments] = React.useState([]);
  const [sessions, setSessions] = React.useState([]);
  const [posterError, setPosterError] = React.useState(false);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(null);

  function formatPersianDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  }
  useEffect(() => {
    const player = new Plyr(videoRef.current, {
      controls: [
        "play-large",
        "play",
        "rewind",
        "fast-forward",
        "progress",
        "current-time",
        "mute",
        "volume",
        "captions",
        "settings",
        "fullscreen",
      ],
    });

    return () => player.destroy(); // cleanup
  }, []);

  useEffect(() => {
    setLoading(true);
    setError(null);
    getCourseDetails(courseName)
      .then((data) => {
        setCourseInfo(data);
        setComments(data.comments);
        setSessions(data.sessions);
        // Reset poster error when new course data loads
        setPosterError(false);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message || "Failed to load course details");
        setLoading(false);
      });
  }, [courseName]);

  // Test if the poster image loads
  useEffect(() => {
    if (courseInfo?.cover) {
      const img = new Image();
      img.onload = () => {
        setPosterError(false);
      };
      img.onerror = () => {
        setPosterError(true);
      };
      img.src = `${import.meta.env.VITE_BACKEND_URL_IMG}/courses/covers/${
        courseInfo.cover
      }`;
    }
  }, [courseInfo?.cover]);

  // Helper function to get poster URL
  const getPosterUrl = () => {
    if (posterError || !courseInfo?.cover) {
      return "/images/courses/js_project.png";
    }
    return `${import.meta.env.VITE_BACKEND_URL_IMG}/courses/covers/${
      courseInfo.cover
    }`;
  };

  const registerFreeCourse = async (courseInfo) => {
    try {
      await registerCourse(courseInfo._id);
      await swal({
        title: "Successfully registered!",
        icon: "success",
        button: "OK",
      });
    } catch (err) {
      await swal({
        title: err.message || "Registration failed.",
        icon: "error",
        button: "OK",
      });
    }
  };

  const registerHandler = async () => {
    const confirmed = await swal({
      title: "Are you sure you want to register for this course?",
      icon: "warning",
      buttons: ["No", "Yes"],
    });

    if (!confirmed) return;

    const token = Cookies.get("user");
    // Free course
    if (courseInfo.discount === 100) {
      // Not logged in for free course
      if (!token) {
        await swal({
          title: "Please log in first to register for free courses.",
          icon: "warning",
          button: "OK",
        });
        return;
      }
      // Logged-in user for free course
      await registerFreeCourse(courseInfo, token);
      return;
    }

    // Paid course
    if (!token) {
      // Not logged in for paid course
      dispatch(addToGuestCart(courseInfo));
      await swal({
        title: "Course added to your shopping cart!",
        icon: "success",
        button: "OK",
      });
      return;
    }

    // Logged-in user for paid course
    dispatch(fetchAddToCart(courseInfo));
  };

  return (
    <div className="bg-gray-100 dark:bg-zinc-800 pt-32">
      <div className="container mx-auto px-4">
        {loading && (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500"></div>
            <span className="ml-3 text-lg">Loading course details...</span>
          </div>
        )}

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            <p>
              <strong>Error:</strong> {error}
            </p>
            <p>
              Please check if the backend server is running on{" "}
              {import.meta.env.VITE_BACKEND_URL}
            </p>
          </div>
        )}

        {!loading && !error && (
          <>
            <Breadcrumb
              links={[
                { id: 1, title: "Home", to: "/" },
                {
                  id: 2,
                  title: courseInfo.categoryID?.title || "Back-end Development",
                  to: "",
                },
                {
                  id: 3,
                  title: courseInfo.name || "JavaScript Expert",
                  to: "",
                },
              ]}
            />

            <div className="mb-4">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-y-6 gap-x-6 sm:gap-x-7 lg:items-center xl:items-stretch mt-8 sm:mt-10 rounded-xl p-4.5 lg:p-0 bg-white dark:bg-zinc-700 lg:!bg-transparent">
                <div className="flex flex-col justify-between order-2 lg:order-1 bg-white dark:bg-zinc-700 text-zinc-700 dark:text-white p-2 md:p-6 md:pl-8 rounde-2xl">
                  <div>
                    <h1 className="font-DanaLight text-base md:text-lg mt-2 text-white mb-4.5 bg-orange-400 w-fit px-4 py-2 rounded-2xl hover:bg-orange-500 transition-colors">
                      {courseInfo.categoryID?.title
                        ? courseInfo.categoryID.title
                        : "Back-end Development"}
                    </h1>
                    <h1 className="font-DanaDemiBold text-lg md:text-2xl my-4 text-zinc-700 ">
                      {courseInfo.name}
                    </h1>
                    <p className="sm:text-lg line-clamp-4 sm:line-clamp-5 text-justify">
                      {courseInfo.description}
                    </p>
                  </div>
                  <div className="space-y-4 lg:space-y-8 mt-4 lg:mt-4">
                    <div className="flex justify-center xl:items-center lg:justify-between flex-wrap-reverse gap-y-4 gap-x-6 pb-3">
                      <button
                        id="register-in-course"
                        className="bg-orange-400 hover:bg-orange-500 text-white font-DanaMedium px-4 py-2 rounded-lg flex items-center gap-x-2 transition-colors"
                        onClick={registerHandler}
                        disabled={courseInfo.isUserRegisteredToThisCourse}
                      >
                        <svg className="w-6 h-6">
                          <use href="#icon-academic" />
                        </svg>
                        {courseInfo.isUserRegisteredToThisCourse
                          ? "You are already enrolled"
                          : "Register"}
                      </button>
                      <div className="flex items-end gap-x-2.5">
                        <span className="font-medium text-zinc-600 dark:text-white">
                          {" "}
                          Price:{" "}
                        </span>
                        <span className="text-slate-500 dark:text-white/70 text-xl line-through">
                          {courseInfo.price
                            ? courseInfo.price.toLocaleString("en-US") + " €"
                            : ""}
                        </span>

                        <span className="font-DanaDemiBold text-2xl text-zinc-800 dark:text-white">
                          {courseInfo.price && courseInfo.discount
                            ? Number(courseInfo.price) -
                                (Number(courseInfo.price) *
                                  Number(courseInfo.discount)) /
                                  100 ===
                              0
                              ? "Free"
                              : (
                                  Number(courseInfo.price) -
                                  (Number(courseInfo.price) *
                                    Number(courseInfo.discount)) /
                                    100
                                ).toLocaleString("en-US") + " €"
                            : ""}
                          <span className="font-danaMedium text-lg"> </span>
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="course_intro_wrap order-1 w-full  rounded-xl overflow-hidden">
                  <video
                    ref={videoRef}
                    className="w-full rounded-xl"
                    poster={getPosterUrl()}
                    controls
                  >
                    <source
                      src={`${
                        import.meta.env.VITE_BACKEND_URL_IMG
                      }/courses/covers/9d6675e7c1c15fb1b935ebff2626178d49c0d1b63d66cdc9fa0fdcf18166d608.mp4
                  `}
                      type="video/mp4"
                    />
                  </video>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-12 gap-6 sm:gap-7 mt-7 lg:mt-20">
              <div className="col-span-12">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                  <CourseDetailBox
                    icon="academic"
                    title="Course Status"
                    text={courseInfo.isComplete === 1 ? "Completed" : "Ongoing"}
                  />
                  <CourseDetailBox
                    icon="clock"
                    title="Start Date"
                    text={
                      courseInfo.createdAt
                        ? formatPersianDate(courseInfo.createdAt)
                        : "Loading..."
                    }
                  />
                  <CourseDetailBox
                    icon="calender"
                    title="Last Update"
                    text={
                      courseInfo.updatedAt
                        ? formatPersianDate(courseInfo.updatedAt)
                        : "Loading..."
                    }
                  />
                  <CourseDetailBox
                    icon="users"
                    title="Course Support"
                    text={courseInfo.support}
                  />
                  <CourseDetailBox
                    icon="briefcase"
                    title="Instructor"
                    text={courseInfo.creator?.name}
                  />
                  <CourseDetailBox
                    icon="video"
                    title="Price"
                    text={courseInfo.price}
                  />
                </div>
                <div className="join join-vertical w-full text-zinc-700 dark:text-white mt-8 bg-white dark:bg-zinc-700 rounded-md mb-3">
                  <div className="collapse collapse-arrow join-item border border-base-300">
                    <input type="checkbox" defaultChecked />
                    <div className="collapse-title font-semibold text-lg flex items-center justify-between">
                      <span>Course Introduction</span>
                      {sessions.length > 0 && (
                        <div className="flex items-center gap-3 text-sm font-normal">
                          <span className="flex items-center gap-1">
                            <svg
                              className="w-4 h-4 text-green-500"
                              fill="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6h1.9c0-1.71 1.39-3.1 3.1-3.1s3.1 1.39 3.1 3.1v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm0 12H6V10h12v10z" />
                            </svg>
                            {courseInfo.isUserRegisteredToThisCourse ||
                            courseInfo.free === 1
                              ? sessions.length
                              : 0}
                          </span>
                          <span className="flex items-center gap-1">
                            <svg
                              className="w-4 h-4 text-gray-400"
                              fill="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zM12 17c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm3.1-9H8.9V6c0-1.71 1.39-3.1 3.1-3.1s3.1 1.39 3.1 3.1v2z" />
                            </svg>
                            {courseInfo.isUserRegisteredToThisCourse ||
                            courseInfo.free === 1
                              ? 0
                              : sessions.length}
                          </span>
                        </div>
                      )}
                    </div>

                    <div className="collapse-content flex flex-col gap-4">
                      {sessions.length > 0 ? (
                        sessions.map((session, index) => {
                          const isAccessible =
                            courseInfo.isUserRegisteredToThisCourse ||
                            courseInfo.free === 1;
                          return (
                            <div
                              key={session._id || index}
                              className={`flex flex-col md:flex-row justify-between items-center p-4 rounded-lg transition-all duration-200 ${
                                isAccessible
                                  ? "bg-gray-100 dark:bg-zinc-700 hover:bg-gray-200 dark:hover:bg-zinc-600"
                                  : "bg-gray-50 dark:bg-zinc-800"
                              }`}
                            >
                              {/* Left: Count + Icon + Title */}
                              <div className="flex self-start items-center gap-3">
                                <span
                                  className={`w-7 h-7 flex items-center justify-center rounded-full text-white text-sm font-bold ${
                                    isAccessible
                                      ? "bg-orange-400"
                                      : "bg-gray-400"
                                  }`}
                                >
                                  {index + 1}
                                </span>

                                {/* Video/Play Icon */}
                                <svg
                                  className={`w-5 h-5 ${
                                    isAccessible
                                      ? "text-red-500"
                                      : "text-gray-400"
                                  }`}
                                  fill="currentColor"
                                  viewBox="0 0 24 24"
                                >
                                  <path d="M8 5v14l11-7z" />
                                </svg>

                                {isAccessible ? (
                                  <Link
                                    to={`/${courseName}/${session._id}`}
                                    className="text-blue-600 hover:text-blue-800 hover:underline font-medium transition-colors duration-200"
                                    title="Click to watch this session"
                                  >
                                    {session.title}
                                  </Link>
                                ) : (
                                  <span className="text-gray-500 font-medium">
                                    {session.title}
                                  </span>
                                )}
                              </div>

                              {/* Right: Time + Lock/Unlock Icon */}
                              <div className="flex self-end items-center gap-3 mt-2 md:mt-0">
                                <span className="text-sm text-gray-500 font-medium">
                                  {session.time}
                                </span>

                                {isAccessible ? (
                                  // Unlocked icon with tooltip
                                  <div className="relative group">
                                    <svg
                                      className="w-5 h-5 text-green-500 cursor-help"
                                      fill="currentColor"
                                      viewBox="0 0 24 24"
                                      title="Session unlocked - You can watch this"
                                    >
                                      <path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6h1.9c0-1.71 1.39-3.1 3.1-3.1s3.1 1.39 3.1 3.1v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm0 12H6V10h12v10z" />
                                    </svg>
                                    <div className="absolute bottom-full right-0 mb-2 px-2 py-1 text-xs text-white bg-gray-800 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap">
                                      Session unlocked
                                    </div>
                                  </div>
                                ) : (
                                  // Locked icon with tooltip
                                  <div className="relative group">
                                    <svg
                                      className="w-5 h-5 text-gray-400 cursor-help"
                                      fill="currentColor"
                                      viewBox="0 0 24 24"
                                      title="Session locked - Enroll to access"
                                    >
                                      <path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zM12 17c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm3.1-9H8.9V6c0-1.71 1.39-3.1 3.1-3.1s3.1 1.39 3.1 3.1v2z" />
                                    </svg>
                                    <div className="absolute bottom-full right-0 mb-2 px-2 py-1 text-xs text-white bg-gray-800 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap">
                                      Enroll to unlock
                                    </div>
                                  </div>
                                )}
                              </div>
                            </div>
                          );
                        })
                      ) : (
                        <div className="text-sm text-gray-500">
                          No sessions available.
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                <CommentsTextArea
                  comments={comments}
                  courseShortName={courseName}
                />
              </div>
              <div className="col-span-12 lg:col-span-4"></div>
            </div>
            <Footer />
          </>
        )}
      </div>
    </div>
  );
};

export default CourseInfo;
