import React, { useEffect, useState } from "react";
import Typewriter from "typewriter-effect";
import LandingCounter from "./LandingCounter";
import Search from "./Search";
import { getIndexInfos } from "../../../api/infos";
import { UsersIcon } from "./UsersIcon";
import { CoursesIcon } from "./CoursesIcon";
import { TrainingIcon } from "./TrainingIcon";

function Header() {
  const [infoIndex, setInfoIndex] = useState({});

  useEffect(() => {
    const fetchInfos = async () => {
      try {
        const data = await getIndexInfos();
        setInfoIndex(data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchInfos();
  }, []);

  return (
    <section className="relative h-auto md:min-h-auto mt-16 bg-home-desktop no-repeat bg-cover bg-[center_top]">
      <div className="container h-full md:min-h-screen flex flex-col justify-center items-center pt-8 xs:pt-10">
        <h1 className="text-white text-xl md:text-4xl font-popins font-bold text-center">
          <Typewriter
            onInit={(typewriter) => {
              typewriter
                .typeString("We don’t produce courses at any cost!")
                .start()
                .pauseFor(2500)
                .deleteAll()
                .typeString(
                  "SabzLearn, your first step to becoming a programmer"
                )
                .start();
            }}
            options={{
              autoStart: true,
              loop: true,
            }}
          />
        </h1>
        <h2 className="text-gray-200 text-base md:text-xl pt-8 mb-2 leading-7.5 font-popins text-center">
          Learn programming safely and progress with SabzLearn Academy
        </h2>

        <Search />

        <div className="flex w-full justify-evenly mb-8">
          {/* Status Item 1 */}
          <div className="flex flex-col gap-y-2 items-center">
            <UsersIcon />
            <span className="text-white text-base md:text-lg font-MorabbaBold block">
              <LandingCounter count={infoIndex.usersCount} />
            </span>
            <span className="text-white text-xs md:text-lg font-roboto font-bold text-center">
              Users
            </span>
          </div>

          {/* Status Item 2 */}
          <div className="flex flex-col gap-y-2 items-center">
            <CoursesIcon />
            <span className="text-white text-base md:text-lg font-MorabbaBold block">
              <LandingCounter count={infoIndex.coursesCount} />
            </span>
            <span className="text-white text-xs md:text-lg font-roboto font-bold text-center">
              Courses
            </span>
          </div>

          {/* Status Item 3 */}
          <div className="flex flex-col gap-y-2 items-center">
            <TrainingIcon />
            <span className="text-white text-base md:text-lg font-MorabbaBold block">
              <LandingCounter count={infoIndex.totalTime} />
            </span>
            <span className="text-white text-xs md:text-lg font-roboto font-bold text-center">
              Training Hours
            </span>
          </div>
        </div>
      </div>
      <div className="hidden md:block">
        <svg className="absolute bottom-0 right-0 left-0 mx-auto w-25 h-5.5 text-gray-100 dark:text-white">
          <use href="#icon-curve" />
        </svg>
      </div>

      <div className="hidden md:flex translate-y-1/2 absolute left-0 right-0 mx-auto bottom-0 items-center justify-center w-50.5 h-50.5 rounded-full border-t-2 border-white/25">
        <div className="flex items-center justify-center w-36 h-36 rounded-full border-t-2 border-white/50">
          <div className="flex items-center justify-center w-24 h-24 rounded-full border-t-2 border-white/80"></div>
        </div>
      </div>

      <div className="hidden md:flex absolute -bottom-4 right-0 left-0 mx-auto w-7 h-7 items-center justify-center rounded-full border-2 border-orange-300">
        <svg className="w-4 h-4 text-zinc-700 dark:text-orange-300">
          <use href="#icon-chevron-down" />
        </svg>
      </div>
    </section>
  );
}

export default Header;
