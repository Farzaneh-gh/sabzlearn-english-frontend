import React from 'react'

import Footer from '../../components/Footer/Footer'
import Breadcrumb from '../../components/Breadcrumb/Breadcrumb'
import ProductBox from '../../components/ProductBox/ProductBox'
import Pagination from '../../components/Pagination/Pagination'

function Courses() {
    const [allCorses, setAllCourses] = React.useState([]);
const [items, setItems] = React.useState([]);
    const getAllCourses = async () => {
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/courses`
      );
      const data = await response.json();
      setAllCourses(data);
    };

    React.useEffect(() => {
      getAllCourses();
    }, []);
  return (
    <div className="bg-gray-100 dark:bg-zinc-800 pt-32">

      <div className="container mx-auto px-4">
        <Breadcrumb
          links={[
            { id: 1, title: "خانه", to: "" },

            { id: 2, title: "دوره های آموزشی", to: "courses/1" },
          ]}
        />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-7 mt-5 mb-5 md:mb-12 md:mt-12">
          {items.length > 0 &&
            items.map((course) => (
              <ProductBox key={course.id} course={course} />
            ))}
        </div>
        <div className="flex justify-center">
          <Pagination items={allCorses} setItems={setItems} pageSize={8} path="courses" />
        </div>
        <Footer />
      </div>
    </div>
  );
}

export default Courses