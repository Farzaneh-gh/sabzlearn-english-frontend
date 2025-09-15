import React from "react";
import styles from "./Breadcrumb.module.css";
import { Link } from "react-router-dom";
function Breadcrumb({ links = ["دوره ها", "ارتقای مهارت ها","آموزش جامع زبان انگلیسی"] }) {
  return (
    <div className=" container mb-10">
      <div
        className={`bg-gray-50 dark:bg-zinc-600 flex items-center p-4  shadow-md dark:text-white rounded-lg overflow-x-auto ${styles.breadcrumb}`}
      >
        <div
          className={`${styles.breadcrumb__home} bg-gray-200 dark:bg-zinc-700 p-2 rounded-md mr-3`}
        >
          <svg className="w-5 h-5 md:w-6 md:h-6 ">
            <use href="#icon-home" />
          </svg>
        </div>
        <ul className={`${styles.breadcrumbList}`}>
          {links.map((link, index) => (
            <li key={index} className="flex shrink-0 items-center">
              <Link
                to={link.to}
                className=" text-base md:text-lg text-gray-700 dark:text-white hover:text-orange-300 transition-colors"
              >
                {link.title}
              </Link>
              {index !== links.length - 1 && (
                <svg
                  className={`w-5 h-5 md:w-6 md:h-6 transform rotate-180 ${styles.breadcrumb__icon}`}
                >
                  <use href="#icon-chevron" />
                </svg>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Breadcrumb;
