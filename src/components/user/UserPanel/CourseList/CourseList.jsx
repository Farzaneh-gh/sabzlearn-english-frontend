import React from "react";
import Course from "./Course";

const CourseList = ({ courses }) => {
  return (
    <div className="container grid grid-cols-1 sm:grid-cols-2   xl:grid-cols-4 gap-4 mt-8">
      {courses.map((order) => (
        <Course key={order._id} course={order.course} />
      ))}
    </div>
  );
};

export default CourseList;
