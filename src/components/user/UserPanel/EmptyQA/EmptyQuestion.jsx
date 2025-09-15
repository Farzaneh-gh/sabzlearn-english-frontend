import React from 'react'
import questions from '../../../../assets/images/questions.png'

const EmptyQuestion = () => {
  return (
    <div className="flex flex-col items-center text-center gap-5 sm:gap-7 py-6 sm:py-8 text-zinc-700 dark:text-zinc-300">
      {/* Illustration */}
      <img
        src={questions}
        alt="No content yet"
        className="size-16 sm:size-25 object-cover"
      />

      {/* Message */}
      <div class="flex flex-col items-center text-center">
        <span className="text-base sm:text-lg font-bold">
          You haven’t asked any questions yet!
        </span>
        <p className="text-sm sm:text-base font-normal text-gray-500 dark:text-gray-400 mt-2 max-w-xs sm:max-w-md">
          Whenever you run into something unclear or challenging in the courses,
          you can ask your question right there.
        </p>
      </div>
     
    </div>
  );
}

export default EmptyQuestion