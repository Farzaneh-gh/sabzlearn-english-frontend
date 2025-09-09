import React from "react";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import Breadcrumb from "../../components/Breadcrumb/Breadcrumb";
import ProductBox from "../../components/ProductBox/ProductBox";
import Pagination from "../../components/Pagination/Pagination";
import BlogBox from "../../components/Blogs/BlogBox";

function Articles() {
  const [allCorses, setAllCourses] = React.useState([]);
  const [items, setItems] = React.useState([]);
  const getAllCourses = async () => {
    const response = await fetch(
      `${import.meta.env.VITE_BACKEND_URL}/articles`
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
            { id: 1, title: "خانه", to: "/" },

            { id: 2, title: "مقالات", to: "/articles/1" },
          ]}
        />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-7 mt-5 mb-5 md:mb-12 md:mt-12">
          {items.length > 0 &&
            items.map((article, index) => (
              <BlogBox
                key={index}
                image={`${
                  import.meta.env.VITE_BACKEND_URL_IMG
                }/courses/covers/${article.cover}`}
                title={article.title}
                description={article.description}
                date={article.createdAt}
                shortName={article.shortName}
              />
            ))}
        </div>
        <div className="flex justify-center">
          <Pagination
            items={allCorses}
            setItems={setItems}
            pageSize={4}
            path="articles"
          />
        </div>
        <Footer />
      </div>
    </div>
  );
}

export default Articles;
