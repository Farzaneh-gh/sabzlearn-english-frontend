import React ,{useEffect,useState} from "react";
import SectionHeader from "../SectionHeader/SectionHeader";
import ProductBox from "../ProductBox/ProductBox";



function Lastproducts() {
  const [courses, setCourses] =useState([]);
  useEffect(() => {
    const fetchCourses = async () => {
     try{
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/courses`
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
   
       const lastData = data.length > 6 ? data.slice(0, 8) : data;
      setCourses(lastData);
     }catch(err){
      console.log(err);
     }
    };
    fetchCourses();
  }, []);
  return (
    <div className="product pt-8 lg:pt-48">
      <div className="container">
        <SectionHeader
          title="Your Launchpad to Success"
          subtitle="Our Latest Courses"
          ref={"courses/1"}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-7 mt-5 md:mt-12">
          {courses.length > 0 &&
            courses.map((course) => (
              <ProductBox key={course.id} course={course} />
            ))}
        </div>
      </div>
    </div>
  );
}

export default Lastproducts;
