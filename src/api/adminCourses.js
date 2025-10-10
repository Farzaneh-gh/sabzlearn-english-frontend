
import { mockCoursesData } from "../data/mockCourses";
export const getCourses = async () => {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 500));
  return mockCoursesData;
};

export const getCourseById = async (courseId) => {
  await new Promise((resolve) => setTimeout(resolve, 500));
  return mockCoursesData.find((course) => course.id === Number(courseId));
  
};

export const createCourse = async (courseData) => {
  await new Promise((resolve) => setTimeout(resolve, 500));
  const newCourse = {
    id: Date.now(),
    ...courseData,
  };
  mockCoursesData.push(newCourse);
  return newCourse;
};



export const updateCourse = async (courseId, courseData) => {
  await new Promise((resolve) => setTimeout(resolve, 500));
  const index = mockCoursesData.findIndex((course) => course.id === courseId);
  if (index !== -1) {
   mockCoursesData[index] = {
      ...mockCoursesData[index],
      ...courseData,
    };
    return mockCoursesData[index];
  }
  throw new Error("Course not found");
};

export const deleteCourse = async (courseId) => {
  await new Promise((resolve) => setTimeout(resolve, 500));
  const index = mockCoursesData.findIndex((course) => course.id === courseId);
  if (index !== -1) {
    mockCoursesData.splice(index, 1);
    return true;
  }
  throw new Error("Course not found");
};