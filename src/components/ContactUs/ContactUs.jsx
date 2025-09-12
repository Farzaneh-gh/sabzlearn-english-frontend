import React from "react";
import contact from "../../assets/images/contact.png";


function ContactUs() {
  return (
    <div className="container mb-16 md:mb-28">
      <div className="flex flex-col md:flex-row justify-center items-center md:items-start gap-y-8 md:gap-x-5 px-4 md:px-0">
        <div className="shrink-0">
          <img src={contact} alt="Contact Us" className="max-w-74" />
        </div>

        <div className="text-zinc-700 dark:text-white font-roboto">
          <h3 className="font-roboto font-bold text-2xl md:text-5xl mb-1">
            Become a Professional Developer with SabzLearn Courses!
          </h3>

          <div className="flex gap-x-2.5 mb-7 md:mb-6">
            <span className="block w-1 h-1 rounded-full bg-zinc-700 dark:bg-white"></span>
            <span className="block w-1 h-1 rounded-full bg-zinc-700 dark:bg-white"></span>
            <span className="block w-1 h-1 rounded-full bg-zinc-700 dark:bg-white"></span>
          </div>

          <p className="text-base leading-7 md:text-2xl md:leading-8 mb-5 md:mb-6 text-justify">
            Whether you are just starting to learn programming or are an
            experienced developer looking to reach new heights, SabzLearn
            courses guide you every step of the way. Our academy provides
            everything you need to learn programming from scratch or enhance
            your skills to become a confident professional. With affordable
            courses, continuous support, and project-based learning, you can
            master programming without additional books or courses. Experienced
            instructors combine standard teaching with real projects, giving
            students motivation and confidence to advance in their career.
            SabzLearn ensures that you learn up-to-date, practical skills while
            preparing you fully for the job market.
          </p>

          <a
            href="#"
            className="text-base md:text-xl text-orange-300 inline-flex items-center gap-x-2 px-6 py-4 rounded-full border border-orange-300"
          >
            <svg className="w-6 md:w-8 h-6 md:h-8">
              <use href="#icon-phoneSimple" />
            </svg>
            About Us
          </a>
        </div>
      </div>
    </div>
  );
}

export default ContactUs;
