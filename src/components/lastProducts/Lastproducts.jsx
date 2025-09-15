import React, { useEffect, useState, useCallback } from "react";
import SectionHeader from "../SectionHeader/SectionHeader";
import ProductBox from "../ProductBox/ProductBox";
import Skleton from "../skeletons/ProductSkeleton/Skeleton";
import { getAllCourses } from "../../api/courses";
import ErrorFallBack from "../ErrorFallBack/ErrorFallBack";

const pageSize = 8;

function Lastproducts() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const fetchCourses = useCallback(async () => {
    setLoading(true);
    setError(false);
    try {
      const data = await getAllCourses();
      setCourses(data.slice(0, pageSize));
    } catch (err) {
      console.log(err);
      setError(true);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchCourses();
  }, [fetchCourses]);
  return (
    <div className="product pt-8 lg:pt-48">
      <div className="container">
        <SectionHeader
          title="Your Launchpad to Success"
          subtitle="Our Latest Courses"
          link={"courses/1"}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-7 mt-5 md:mt-12">
          {!loading && error && (
            <ErrorFallBack onRetry={fetchCourses} message={"courses"} />
          )}
          {loading && <Skleton count={pageSize} />}
          {!loading &&
            !error &&
            courses.length > 0 &&
            courses.map((course) => (
              <ProductBox key={course.id} course={course} />
            ))}
        </div>
      </div>
    </div>
  );
}

export default Lastproducts;
