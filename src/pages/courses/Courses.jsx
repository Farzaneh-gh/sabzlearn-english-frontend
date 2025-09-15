import React, { useEffect, useState } from "react";
import Footer from "../../components/Layout/Footer/Footer";
import Breadcrumb from "../../components/common/Breadcrumb/Breadcrumb";
import ProductBox from "../../components/course/ProductBox/ProductBox";
import Pagination from "../../components/common/Pagination/Pagination";
import Skeleton from "../../components/skeletons/ProductSkeleton/Skeleton";
import { getAllCourses as fetchAllCourses } from "../../api/courses";
import ErrorFallBack from "../../components/common/ErrorFallBack/ErrorFallBack";

function Courses() {
  const [allCourses, setAllCourses] = useState([]);
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const pageSize = 8;

  const getAllCourses = async () => {
    setLoading(true);
    setError(false);
    try {
      const data = await fetchAllCourses();
      setAllCourses(data);
      setItems(data.slice(0, pageSize));
    } catch (err) {
      console.log(err);
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getAllCourses();
  }, []);

  return (
    <div className="bg-gray-100 dark:bg-zinc-800 pt-32">
      <div className="container mx-auto px-4">
        <Breadcrumb
          links={[
            { id: 1, title: "Home", to: "/" },

            { id: 2, title: "Courses", to: "/courses/1" },
          ]}
        />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-7 mt-5 mb-5 md:mb-12 md:mt-12">
          {loading && <Skeleton count={pageSize} />}
          {!loading && error && (
            <ErrorFallBack onRetry={getAllCourses} message="courses" />
          )}
          {!loading &&
            !error &&
            items.length > 0 &&
            items.map((course) => (
              <ProductBox key={course.id} course={course} />
            ))}
        </div>

        {!loading && !error && allCourses.length > pageSize && (
          <div className="flex justify-center">
            <Pagination
              items={allCourses}
              setItems={setItems}
              pageSize={pageSize}
              path="courses"
            />
          </div>
        )}
        <Footer />
      </div>
    </div>
  );
}

export default Courses;
