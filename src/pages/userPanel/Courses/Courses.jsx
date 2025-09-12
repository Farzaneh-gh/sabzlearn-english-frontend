import React from "react";
import EmptyCourses from "../../../components/UserPanel/EmptyCourses/EmptyCourses";
const Courses = () => {
  return (
    <section className="mt-10 lg:container lg:p-0 lg:space-y-5 ">
      <div className="bg-white dark:bg-transparent  lg:shadow-2xl dark:shadow-none lg:rounded-xl p-4">
        <h2 className="font-bold  text-lg xs:text-2xl leading-8 md:leading-12 text-zinc-700 dark:text-zinc-300 md:pl-8">My Courses</h2>
        <EmptyCourses />
      </div>
    </section>
  );
};

export default Courses;
