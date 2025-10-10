import { useState, useEffect } from "react";
// Assuming you have these API functions
import {
  getDashboardStats,
  getRecentUsers,
  getTopCourses,
  getEnrollmentData,
  getCourseCompletionData,
} from "../api/dashboard"; // We'll need to create this api file

export function useDashboardData() {
  const [stats, setStats] = useState({
    totalRevenue: 0,
    activeStudents: 0,
    courseCompletion: 0,
    averageRating: 0,
  });
  const [latestUsers, setLatestUsers] = useState([]);
  const [topCourses, setTopCourses] = useState([]);
  const [enrollmentData, setEnrollmentData] = useState([]);
  const [courseCompletionData, setCourseCompletionData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        // Fetch all data in parallel
        const [statsData, usersData, coursesData, enrollment, completion] =
          await Promise.all([
            getDashboardStats(),
            getRecentUsers(),
            getTopCourses(),
            getEnrollmentData(),
            getCourseCompletionData(),
          ]);

        setStats(statsData);
        setLatestUsers(usersData);
        setTopCourses(coursesData);
        setEnrollmentData(enrollment);
        setCourseCompletionData(completion);
      } catch (err) {
        setError("Failed to fetch dashboard data.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return {
    stats,
    latestUsers,
    topCourses,
    enrollmentData,
    courseCompletionData,
    loading,
    error,
  };
}
