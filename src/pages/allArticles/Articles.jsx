import React, { useState, useEffect } from "react";
import Footer from "../../components/Footer/Footer";
import Breadcrumb from "../../components/Breadcrumb/Breadcrumb";
import Pagination from "../../components/Pagination/Pagination";
import BlogBox from "../../components/Blogs/BlogBox";
import Skeleton from "../../components/ArticleSkeleton/Skeleton";
import { useNavigate } from "react-router-dom";

function Articles() {
  const [allArticles, setAllArticles] = useState([]);
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const pageSize = 4;

  const getAllArticles = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/articles`
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();

      setAllArticles(data);
    } catch (error) {
      navigate("/notfound");
      console.error("Error fetching articles:", error);
    }finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getAllArticles().then(() => setLoading(false));
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="bg-gray-100 dark:bg-zinc-800 pt-32">
      <div className="container mx-auto px-4">
        <Breadcrumb
          links={[
            { id: 1, title: "Home", to: "/" },

            { id: 2, title: "Articles", to: "/articles/1" },
          ]}
        />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-7 mt-5 mb-5 md:mb-12 md:mt-12">
          {loading ? (
            <Skeleton count={pageSize} />
          ) : (
            items.length > 0 &&
            items.map((article, index) => (
              <BlogBox
                key={index}
                article={article}
              />
            ))
          )}
        </div>
        {loading ? null : (
          <div className="flex justify-center">
            <Pagination
              items={allArticles}
              setItems={setItems}
              pageSize={pageSize}
              path="articles"
            />
          </div>
        )}
        <Footer />
      </div>
    </div>
  );
}

export default Articles;
