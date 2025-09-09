import React from "react";
import { Link } from "react-router-dom";
function ProductBox({ course=[] }) {

  return (
    <div className="course flex flex-col bg-white dark:bg-zinc-700 rounded-xl">
      <Link
        className="block h-42"
        to={`/course-info/${course.shortName}`}
        title="آموزش جامع توسعه وردپرس"
      >
        <img
          className="size-full object-cover rounded-xl"
          loading="lazy"
          src={`${import.meta.env.VITE_BACKEND_URL_IMG}/courses/covers/${
            course?.cover
          }`}
          alt="آموزش جامع توسعه وردپرس"
        />
      </Link>

      <div className="flex-grow px-4.5 pt-4 pb-3">
        <h3 className="font-medium text-lg md:text-xl min-h-14 line-clamp-2 mb-2 text-zinc-700 dark:text-white">
          <a href="#">{course.name} </a>
        </h3>

        <p className="text-sm md:text-base line-clamp-2 min-h-10 max-h-10 md:min-h-12 md:max-h-12 text-gray-700 pb-3 dark:text-gray-200">
          {course.description}{" "}
        </p>
      </div>

      <div className="px-4.5 pb-3">
        <div className="flex justify-between gap-2.5 text-slate-500 dark:text-white/70 text-sm pb-3 border-b border-b-neutral-200/70 dark:border-b-white/10">
          <div className="flex items-center gap-x-0.5 hover:text-green-500 transition-colors">
            <svg className="w-5 h-5">
              <use href="#icon-user" />
            </svg>
            <a href="https://sabzlearn.ir/teacher/amirtaher69">
              {course.creator}
            </a>
          </div>

          <div className="flex items-center gap-x-0.5 text-amber-500">
            <span className="font-DanaMedium">5.0</span>
            <svg className="w-5 h-5">
              <use href="#star-mini"></use>
            </svg>
          </div>
        </div>
        <div className="flex items-end justify-between mt-4">
          <span className="flex items-center gap-x-0.5 text-slate-500 dark:text-white/70 text-sm">
            <svg className="size-5">
              <use href="#icon-users" />
            </svg>
            {course.registers}{" "}
          </span>

          <div className="flex items-center gap-x-2.5">
            <div className="text-sm font-DanaMedium p-1 rounded bg-green-500 text-white">
              {course.discount}{" "}
              <span className="font-DanaMedium text-base">%</span>
            </div>
            <div className="flex flex-col">
              <span className="text-xs md:text-base text-slate-500 dark:text-white/70 -mb-1.5 line-through">
                {course.price}{" "}
              </span>
              <span className="text-green-500 font-PoppinsSemiBold text-base md:text-lg">
                {(course.price * (100 - course.discount)) / 100}{" "}
                <span className="font-PoppinsMedium text-base">€</span>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductBox;
