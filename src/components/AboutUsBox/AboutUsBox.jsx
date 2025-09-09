import React from "react";
export default function AboutUsBox({ title, subtitle, icon }) {

  return (
    <div className="flex bg-white text-zinc-600 dark:text-white dark:bg-zinc-700 rounded-lg shadow-md p-8 gap-4 flex-col md:flex-row  items-center justify-center ">
     
        <div className="w-16 h-14 flex items-center justify-center mb-4">
          <svg className="text-orange-400">
            <use href={`#icon-${icon}`} />
          </svg>
        </div>
        <div className="flex flex-col items-center  md:items-start justify-center text-center">
          <span className="font-bold text-lg">{title}</span>
          <span className="font-Dana text-base md:text-justify mt-2 leading-7">{subtitle}</span>
        </div>
  
    </div>
  );
}
