import { useState,useEffect } from "react";
import { getCourseStats } from "../api/courses";    

export function useCourseData() {
  const [stats, setStats] = useState({
    totalRevenue: 0,
    totalCourses: 0,
    totalStudents: 0,
    courseCompletion: 0,
    averageRating: 0,
  });

  const fetchCourseStats = async () => {
    const data = await getCourseStats();
    setStats(data);
  };

  useEffect(() => {
    fetchCourseStats();
  }, []);

  return { stats, fetchCourseStats };
}