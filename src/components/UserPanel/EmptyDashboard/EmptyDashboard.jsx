import React from "react";
import { Link } from "react-router-dom";
import homeEmpty from "../../../assets/images/homeEmpty.png";
function EmptyDashboard() {
  return (
    <div className="flex flex-col items-center text-center gap-5 sm:gap-7 py-6 sm:py-8 text-zinc-700 dark:text-zinc-300">
      {/* Illustration */}
      <img
        src={homeEmpty}
        alt="No content yet"
        className="size-16 sm:size-25 object-cover"
      />

      {/* Message */}
      <div className="flex flex-col items-center text-center">
        <span className="text-base sm:text-lg font-bold">
          Nothing here yet!
        </span>
        <p className="text-sm sm:text-base font-normal text-gray-500 dark:text-gray-400 mt-2 max-w-xs sm:max-w-md">
          You can take your first step right now! <br />
          If you’re not sure where to start, these links will help you get
          going.
        </p>
      </div>

      {/* Call to Action Buttons */}
      <div className="flex flex-col gap-y-3  mx-auto  ">
        <Link
          to="/courses/1"
          target="_blank"
          rel="noopener noreferrer"
          className=" btn-sm xs:btn-md md:btn-lg  btn-filled-brand w-full btn btn-success dark:text-gray-200 text-white"
        >
          Start Learning now
        </Link>
        <Link
          to=""
          target="_blank"
          rel="noopener noreferrer"
          className="btn-sm xs:btn-md md:btn-lg btn w-full bg-primary-content text-gray-600"
        >
          Get Programming Advice
        </Link>
      </div>
    </div>
  );
}

export default EmptyDashboard;
