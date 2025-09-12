import React from 'react'
import courses from '../../../assets/images/courses.png'
import { Link } from 'react-router-dom'
const EmptyCourses = () => {
  return (
    <div className="flex flex-col items-center text-center gap-5 sm:gap-7 py-6 sm:py-8 text-zinc-700 dark:text-zinc-300">
      {/* Illustration */}
      <img
        src={courses}
        alt="No content yet"
        className="size-16 sm:size-25 object-cover"
      />

      {/* Message */}
      <div className="flex flex-col items-center text-center">
        <span className="text-base sm:text-lg font-bold">
          You haven’t joined any courses yet!
        </span>
        <p className="text-sm sm:text-base font-normal text-gray-500 dark:text-gray-400 mt-2 max-w-xs sm:max-w-md">
          Take a look at our courses you might find something that catches your
          eye, maybe even exactly what you’ve been looking for.
        </p>
      </div>
      {/* Call to Action Buttons */}
      <div className="flex flex-col gap-y-3  mx-auto ">
        <Link
          to="/courses/1"
          target="_blank"
          rel="noopener noreferrer"
          className=" btn-sm xs:btn-md md:btn-lg  btn-filled-brand w-full btn btn-success dark:text-gray-200 text-white"
        >
          Start Learning now
        </Link>
      </div>
    </div>
  );
}

export default EmptyCourses