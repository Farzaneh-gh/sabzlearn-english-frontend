import React, { useEffect, useState } from "react";
import { getUserCourses } from "../../../api/courses";
import EmptyCourses from "../../../components/user/UserPanel/EmptyCourses/EmptyCourses";
import CourseList from "../../../components/user/UserPanel/CourseList/CourseList";

const Courses = () => {
  const [userCourses, setUserCourses] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchUserCourses = async () => {
      try {
        const courses = await getUserCourses();
        setUserCourses(courses);
      } catch (error) {
        console.error("Failed to fetch user courses:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchUserCourses();
  }, []);

  return (
    <section className="mt-10 lg:container lg:p-0 lg:space-y-5 ">
      <div className="bg-white dark:bg-transparent lg:shadow-2xl dark:shadow-none lg:rounded-xl p-4">
        <h2 className="font-bold text-lg xs:text-2xl leading-8 md:leading-12 text-zinc-700 dark:text-zinc-300 md:pl-8">
          My Courses
        </h2>
        {isLoading ? (
          <p className="text-center mt-8">Loading...</p>
        ) : userCourses.length === 0 ? (
          <EmptyCourses />
        ) : (
          <CourseList courses={userCourses} />
        )}
      </div>
    </section>
  );
};

export default Courses;
