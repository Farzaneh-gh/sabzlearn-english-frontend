import React from "react";

function Footer() {
  return (
    <div className="text-gray-300 bg-zinc-700 md:pt-15.5 px-4 md:px-6 py-8 md:pb-12 font-roboto">
      <div className="flex flex-col md:flex-row justify-between md:w-[98%] xl:w-[90%] mx-auto border-b border-gray-300 pb-10">
        <div className="flex flex-col md:flex-row md:justify-between">
          <div className="lg:w-full">
            <div className="flex gap-x-5 mb-4.5">
              <svg
                className="h-10 sm:h-12 lg:h-13"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 1065.8713 255.5117"
              >
                {/* Keep your SVG shapes here */}
              </svg>
            </div>
            <p className="md:max-w-120 lg:max-w-190 text-lg md:text-xl leading-12 mb-11 text-gray-300">
              Starting anything is hard, but when you choose the right path, you
              can enjoy the journey without stress. At SabzLearn, we are with
              you on your programming journey so we can grow together and enjoy
              the results of our hard work.
            </p>
          </div>
        </div>

        <div className="md:mt-6.5 pr-4">
          <h4 className="font-bold text-2xl text-white mb-6 md:mb-7">
            Get in Touch
          </h4>
          <div className="flex items-start mb-5">
            <svg className="w-5 h-5 md:w-6 md:h-6">
              <use href="#icon-map-pin" />
            </svg>
            <span className="md:text-xl mr-3 leading-7">
              33 Qobadian East Alley, Alborz Street, Mirdamad Blvd, Tehran, Iran
            </span>
          </div>

          <div className="md:text-xl flex flex-col gap-5">
            <div className="text-orange-300 flex">
              <svg className="w-5 h-5 md:w-6 md:h-6">
                <use href="#icon-envelop" />
              </svg>
              <span className="mr-3 font-medium">info@sabzlearn.ir</span>
            </div>

            <div className="flex md:text-xl font-medium">
              <svg className="w-5 h-5 md:w-6 md:h-6">
                <use href="#icon-phoneSimple" />
              </svg>
              <span className="mr-3">+98 902 123 6628</span>
              <span className="mr-6">+98 21 6789012</span>
            </div>
          </div>
        </div>
      </div>

      <div className="flex mt-10 gap-x-2.5 items-center md:w-[98%] xl:w-[90%] mx-auto">
        <div className="shrink-0 w-8 h-8 border border-gray-100 rounded-full flex justify-center items-center">
          <div className="w-5 h-5 border border-gray-100 rounded-full flex justify-center items-center">
            <div className="w-2 h-2 bg-orange-300 rounded-full"></div>
          </div>
        </div>
        <p className="font-medium text-xs">
          All rights to this user interface belong to SabzLearn. Students are
          not permitted to use it for personal or commercial purposes.
        </p>
      </div>
    </div>
  );
}

export default Footer;
