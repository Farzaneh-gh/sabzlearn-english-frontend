import React from "react";

function Skeleton({ count = 1 }) {
  return (
    <>
      {Array(count)
        .fill(0)
        .map((_, idx) => (
          <div
            className="animate-pulse course flex flex-col bg-white dark:bg-zinc-700 rounded-xl p-4 gap-4"
            key={idx}
          >
            <div className="h-42 bg-gray-300 dark:bg-zinc-600 rounded-md w-full"></div>
            <div className=" bg-gray-300 dark:bg-zinc-600 rounded w-3/4  min-h-10 max-h-10 md:min-h-12 md:max-h-12">
            </div>
            <div className="h-4 bg-gray-300 dark:bg-zinc-600 rounded w-full"></div>
            <div className="h-px w-full bg-gray-300 dark:bg-zinc-600 my-7"></div>
            <div className="h-4 bg-gray-300 dark:bg-zinc-600 rounded w-5/6"></div>
          </div>
        ))}
    </>
  );
}

export default Skeleton;
