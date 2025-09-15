import React from "react";


function CartItem({
  titleClassNames,
  course,
  imageSize = "w-30 h-30",
  deleteItem,
}) {

  return (
    <div className="flex pt-5 pb-6 gap-x-2.5 border-b border-gray-300 dark:border-white/50 font-DanaMedium">
      <div className="shrink-0">
        <img
          src={`${import.meta.env.VITE_BACKEND_URL_IMG}/courses/covers/${
            course?.cover
          }`}
          alt="product"
          className={imageSize}
        />
      </div>

      <div className="flex justify-between flex-col w-full">
        <h4
          className={`text-zinc-700 dark:text-white text-base mb-1.5 line-clamp-2 ${titleClassNames}`}
        >
          {course.name}
        </h4>
        <div className="flex items-center justify-between">
          <div className="flex flex-col coursor-pointer">
            <span className="text-teal-600 dark:text-emerald-500 text-xs">
              {course.discount}%
            </span>
            <span className="text-zinc-700 dark:text-white font-semibold text-base">
              {course.price} <span className="text-sm">€</span>
            </span>
          </div>
          <button
            className="flex items-center cursor-pointer hover:text-red-500"
            onClick={() => deleteItem(course)}
          >
            <svg className="w-5 h-5 text-gray-400 hover:text-red-500">
              <use href="#icon-trash" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}

export default CartItem;
