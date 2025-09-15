import React, { useEffect, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import SectionHeader from "../SectionHeader/SectionHeader";
import ProductBox from "../ProductBox/ProductBox";

import "swiper/css";
import { getPopularCourses } from "../../api/courses";
import "swiper/css/navigation"; // Required for navigation
import { Navigation, Autoplay } from "swiper/modules";

function PopularProducts() {
  const [courses, setCourses] = React.useState([]);

  const prevRef = useRef(null);
  const nextRef = useRef(null);

  useEffect(() => {
    getPopularCourses()
      .then((data) => {
        setCourses(data);
      })
      .catch((error) => console.error("Error fetching courses:", error));
  }, []);

  return (
    <div className="container pt-8 md:pt-40">
      <SectionHeader
        title={"Top Trending Courses"}
        subtitle="Hands-on, project-focused courses loved by our students"
        btnShow={false}
      />

      {/* Navigation Buttons */}
      <div className="flex justify-end gap-2 mb-4">
        <button
          ref={prevRef}
          className="bg-gray-300 px-3 py-1 rounded-full w-15 h-15 flex items-center justify-center hover:bg-gray-600"
        >
          <svg className="w-6 h-6  text-orange-300 font-DanaDemiBold ">
            <use href="#icon-chevron" />
          </svg>{" "}
        </button>
        <button
          ref={nextRef}
          className="bg-gray-300 px-3 py-1 rounded-full w-15 h-15 flex items-center justify-center hover:bg-gray-600"
        >
          <svg className="w-6 h-6 text-orange-300 font-DanaDemiBold transform rotate-180 ">
            <use href="#icon-chevron" />
          </svg>{" "}
        </button>
      </div>

      <Swiper
        modules={[Navigation, Autoplay]}
        navigation={{
          prevEl: prevRef.current,
          nextEl: nextRef.current,
        }}
        onBeforeInit={(swiper) => {
          swiper.params.navigation.prevEl = prevRef.current;
          swiper.params.navigation.nextEl = nextRef.current;
        }}
        breakpoints={{
          640: {
            slidesPerView: 2,
            spaceBetween: 14,
          },
          768: {
            slidesPerView: 3,
            spaceBetween: 14,
          },
          1024: {
            slidesPerView: 4,
            spaceBetween: 20,
          },
        }}
        className="mySwiper"
        spaceBetween={14}
        slidesPerView={1}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
      >
        {courses.map((course) => (
          <SwiperSlide key={course.id}>
            <ProductBox course={course} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}

export default PopularProducts;
