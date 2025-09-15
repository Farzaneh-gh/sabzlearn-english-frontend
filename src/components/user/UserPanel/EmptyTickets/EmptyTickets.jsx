import React from 'react'
import tickets from '../../../../assets/images/tickets.png'
import { Link } from 'react-router-dom'
const EmptyTickets = () => {
  return (
    <div className="flex flex-col items-center text-center gap-5 sm:gap-7 py-6 sm:py-8 text-zinc-700 dark:text-zinc-300">
      {/* Illustration */}
      <img
        src={tickets}
        alt="No content yet"
        className="size-16 sm:size-25 object-cover"
      />

      {/* Message */}
      <div class="flex flex-col items-center text-center">
        <span className="text-base sm:text-lg font-bold">
          You haven’t submitted any tickets yet!
        </span>
        <p className="text-sm sm:text-base font-normal text-gray-500 dark:text-gray-400 mt-2 max-w-xs sm:max-w-md">
          If you ever run into a problem, have a question about payments,
          access, or anything else, you can send us a support ticket anytime.
        </p>
      </div>

      {/* Call to Action Buttons */}
      <div className="flex flex-col gap-y-3  mx-auto ">
        <Link
          to="new-ticket"
          target="_blank"
          rel="noopener noreferrer"
          className=" btn-sm xs:btn-md md:btn-lg  btn-filled-brand w-full btn btn-success dark:text-gray-200 text-white"
        >
          New Ticket
        </Link>
      </div>
    </div>
  );
}

export default EmptyTickets