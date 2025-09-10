import React from "react";

function Skeleton({count}) {

 return (
   <>
     {Array(count)
       .fill(count)
       .map((_, idx) => (
         <div
           key={idx}
           className="animate-pulse bg-white dark:bg-zinc-700 rounded-lg p-4 flex flex-col justify-between gap-3 shadow h-90 "
         >
           <div className="h-42 bg-gray-300 dark:bg-zinc-600 rounded-md w-full"></div>
           <div className="h-6 bg-gray-300 dark:bg-zinc-600 rounded w-3/4"></div>
           <div className="h-4 bg-gray-300 dark:bg-zinc-600 rounded w-full"></div>
           <div className="h-4 bg-gray-300 dark:bg-zinc-600 rounded w-5/6"></div>
         </div>
       ))}
   </>
 );
}

export default Skeleton;
