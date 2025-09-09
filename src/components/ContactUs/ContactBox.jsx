import React from "react";

function ContactBox({ iconLight, iconDark, title, subtitle }) {
  return (
    <div className="text-zinc-700 dark:text-white flex flex-col lg:flex-row justify-center items-center gap-y-5 gap-x-4 px-7 py-5 lg:px-0 lg:py-0">
      {/* Light mode icon */}
      <svg className="w-16.5 h-16 text-orange-300 dark:hidden">
        <use href={iconLight} />
      </svg>

      {/* Dark mode icon */}
      <svg className="w-16.5 h-16 text-white hidden dark:block">
        <use href={iconDark} />
      </svg>

      <div className="flex justify-between flex-col text-center lg:text-right">
        <h4 className="font-DanaDemiBold text-sm mb-1 md:text-lg lg:mb-3.5">
          {title}
        </h4>
        <p className="text-xs md:text-sm">{subtitle}</p>
      </div>
    </div>
  );
}

export default ContactBox;
