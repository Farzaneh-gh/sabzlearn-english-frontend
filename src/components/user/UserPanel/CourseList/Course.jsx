import React from "react";
import { Link } from "react-router-dom";

const Course = ({ course }) => {
  return (
    <div className="flex flex-col bg-white dark:bg-gray-800 rounded-lg shadow-md transform hover:scale-105 transition-transform duration-300 overflow-hidden">
      <Link
        className="block"
        to={`/course-info/${course.shortName}`}
        title={course.name}
      >
        <div className="h-48 w-full">
          <img
            className="w-full h-full object-cover rounded-t-lg"
            loading="lazy"
            src={`${import.meta.env.VITE_BACKEND_URL_IMG}/courses/covers/${
              course?.cover
            }`}
            alt={course.name}
          />
        </div>
        <div className="p-4 text-center flex flex-col items-center justify-between">
          <h3 className ="line-clamp-2 min-h-13 text-sm md:text-lg font-semibold text-zinc-700 dark:text-zinc-300 mb-3">
            {course.name}
          </h3>
          <button className="mt-2 bg-teal-600 dark:bg-emerald-500 text-white py-2 px-4 rounded-lg text-sm md:text-md hover:bg-teal-700 dark:hover:bg-emerald-600 transition-colors">
            Go to Course
          </button>
        </div>
      </Link>
    </div>
  );
};

export default Course;
