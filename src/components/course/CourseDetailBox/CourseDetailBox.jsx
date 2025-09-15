import React from 'react'

const CourseDetailBox = ({ title, text, icon}) => {
  return (
    <div className=" bg-white dark:bg-zinc-700 pt-4 pb-3.5 sm:py-6 px-5 rounded-lg">
      <div className="flex flex-col md:flex-row items-center justify-between md:items-start md:justify-start gap-x-6 ">
        <div className="flex-center">
          <svg className="w-10 sm:w-11 h-10 sm:h-11 text-orange-500 dark:text-orange-400">
            <use href={`#icon-${icon}`} />
          </svg>
        </div>
        <div className="flex flex-col gap-y-2 items-center md:items-start mt-3 md:mt-0">
          <span className="font-bold text-sm md:text-lg text-zinc-700 dark:text-white">
            {title}
          </span>
          <span className="text-sm text-slate-500 dark:text-white/70">
            {text}
          </span>
        </div>
      </div>
    </div>
  );
}

export default CourseDetailBox