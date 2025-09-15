import apiClient from "./api";

export const getCourseDetails = (courseName) => {
  return apiClient(`courses/${courseName}`);
};

export const getRelatedCourses = (courseName) => {
  return apiClient(`courses/related/${courseName}`);
};

export const getAllCourses = () => {
  return apiClient("courses");
};

export const getPopularCourses = () => {
  return apiClient("courses/popular");
};

export const getPresellCourses = () => {
  return apiClient("courses/presell");
};

export const registerFreeCourse = (courseId) => {
  return apiClient(`courses/${courseId}/register`, {
    method: "POST",
    body: { price: 0 },
  });
};
