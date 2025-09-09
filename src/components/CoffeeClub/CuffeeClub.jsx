import React from "react";
import diamond from "../../assets/images/club/diamond.png";

function CoffeeClub() {
  return (
    <section className="container py-8 lg:py-0 mt-8 md:mt-12 flex items-center gap-x-24 xl:gap-x-0 gap-y-9 flex-col xl:flex-row justify-between px-3 lg:px-5 xl:px-11 bg-gradient-to-r from-emerald-500 to-emerald-600 xl:h-36 flex-wrap lg:flex-nowrap rounded-2xl mb-8 md:mb-20">
      <div className="flex shrink-0 gap-x-3 md:gap-x-6 w-full xl:w-auto">
        <img
          src={diamond}
          alt="coffee club"
          className="w-22 lg:w-27.5 lg:h-24"
        />
        <div>
          <h4 className="font-MorabbaBold text-2xl md:text-5xl mb-2 text-white">
            Coffee Club
          </h4>
          <p className="font-MorabbaLight text-white text-lg md:text-2xl">
            Did you know you can redeem your points for coffee?
          </p>
        </div>
      </div>

      <div className="flex flex-col xxs:flex-row w-full xl:w-auto justify-between items-center gap-y-5 gap-x-2.5">
        <div className="flex justify-between items-center gap-x-8 xxs:gap-x-3 md:gap-x-5">
          <div className="text-center w-18 h-18 md:w-24.5 md:h-24.5 text-emerald-600 bg-white rounded-2xl py-1.5 md:pt-5 md:pb-1">
            <svg className="mx-auto w-10 h-10 md:w-12 md:h-12 md:mb-1.5 mb-0">
              <use href="#icon-Activity" />
            </svg>
            <span className="text-xs md:text-sm">Spin & Win</span>
          </div>
          <div className="text-center w-18 h-18 md:w-24.5 md:h-24.5 text-emerald-600 bg-white rounded-2xl py-1.5 md:pt-5 md:pb-1">
            <svg className="mx-auto w-10 h-10 md:w-12 md:h-12 md:mb-1.5 mb-0">
              <use href="#icon-Discovery" />
            </svg>
            <span className="text-xs md:text-sm">Missions</span>
          </div>
          <div className="text-center w-18 h-18 md:w-24.5 md:h-24.5 text-emerald-600 bg-white rounded-2xl py-1.5 md:pt-5 md:pb-1">
            <svg className="mx-auto w-10 h-10 md:w-12 md:h-12 md:mb-1.5 mb-0">
              <use href="#icon-Ticket Star" />
            </svg>
            <span className="text-xs md:text-sm">Rewards</span>
          </div>
        </div>

        <div className="text-white flex items-baseline justify-between gap-x-3 md:gap-x-8 xxs:flex-col xs:flex-row lg:flex-row xl:items-start">
          <span className="text-xs md:text-sm text-center">Your Points</span>
          <span className=" font-DanaDemiBold text-2xl md:text-3xl">
            542
          </span>

          <a
            href="#"
            className=" font-sans font-bold text-xs md:text-sm w-22.5 md:w-27.5 flex items-center justify-between px-2 h-6.5 md:h-8 rounded-full bg-gradient-to-r from-orange-200 to-orange-300"
          >
             Reward
            <svg className="w-5 h-5 md:w-6 md:h-6 transform rotate-180">
              <use href="#icon-chevron" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}

export default CoffeeClub;
