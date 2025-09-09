import React from "react";
import AboutUsBox from "../AboutUsBox/AboutUsBox";
import SectionHeader from "../SectionHeader/SectionHeader";

export default function AboutUs() {
  return (
    <div className="container pt-10 md:pt-40">
      <SectionHeader
        title="How Can We Help You?"
        subtitle="We’ll be by your side from the start, supporting you every step of the way."
        btnShow={false}
      />
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-7 mt-8">
        <AboutUsBox
          title="Exclusive Courses"
          subtitle="Rest assured, our courses cover every detail. After completing them, you won’t need any other training."
          icon="book"
        />
        <AboutUsBox
          title="Personalized Support"
          subtitle="Whenever you have questions or face issues, our team is ready to help. We ensure you complete the course without worries."
          icon="comment"
        />
        <AboutUsBox
          title="Project-Oriented for the Job Market"
          subtitle="Our focus is that after finishing the course, you can confidently work on real projects and take steps toward earning."
          icon="chart"
        />
        <AboutUsBox
          title="We Work with Professionals"
          subtitle="We have the strictest standards for hiring instructors to ensure the content is presented clearly and smoothly, so you won’t face any learning obstacles."
          icon="list"
        />
      </div>
    </div>
  );
}
