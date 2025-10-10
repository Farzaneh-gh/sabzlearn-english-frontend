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

export const getUserCourses = () => {
  return apiClient("orders");
};

/**
 * Fetch user orders from the backend /orders endpoint
 * Requires authentication token (Bearer token) in headers
 * @returns {Promise<Array>} Array of user orders, each containing course information
 */
export const getUserOrders = () => {
  return apiClient("orders");
};

export const getCourseStats = async () => {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 500));
  return {
    totalRevenue: 73245,
    totalCourses: 120,
    totalStudents: 3487,
    courseCompletion: 87.2,
    averageRating: 4.8,
  };
};
