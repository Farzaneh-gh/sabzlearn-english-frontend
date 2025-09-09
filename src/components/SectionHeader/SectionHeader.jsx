import { Link } from "react-router-dom";
import React from "react";

function SectionHeader({ title, subtitle ,btnShow=true,ref}) {

  return (
    <div className="flex flex-col  justify-between ">
      <div className="flex  flex-col  gap-y-0.5 md:gap-y-1.5 ">
        <h4 className="font-light text-base md:text-xl xl:text-2xl text-zinc-700  leading-8 md:leading-12 dark:text-white">
          {subtitle}
        </h4>
      </div>
      <div className="flex flex-col  items-start mt-2 md:mt-4">
        {subtitle && (
          <p className="font-bold text-lg md:text-3xl leading-8 md:leading-12 text-zinc-700 dark:text-white">
            {title}
          </p>
        )}
        {btnShow && (
          <a
            href="#"
            className=" ml-auto  flex gap-x-0 md:gap-x-1 px-3 py-1 items-center font-Dana text-orange-300 bg-none hover:bg-orange-300/20 rounded-lg text-base md:text-xl tracking-tightest"
          >
            <Link to={ref} className="md:hidden">
              View All
            </Link>
            <Link to={ref} className="hidden md:inline">
              View All Products
            </Link>
            <svg className="w-4 h-4 md:w-5 md:h-5 text-orange-300 transform rotate-180 ml-2">
              <use href="#icon-chevron" />
            </svg>
          </a>
        )}
      </div>
    </div>
  );
}

export default SectionHeader;
