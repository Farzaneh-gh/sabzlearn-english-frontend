import React, { useEffect, useState, useCallback } from "react";
import SectionHeader from "../SectionHeader/SectionHeader";
import Skeleton from "../ArticleSkeleton/Skeleton";
import ErrorFallback from "../ErrorFallBack/ErrorFallBack";
import BlogBox from "./BlogBox";

const MAX_ARTICLES = 4;

function Blogs() {
  const [allArticles, setAllArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const getArticles = useCallback(async () => {
    setLoading(true);
    setError(false);
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/articles`
      );
      if (!response.ok) throw new Error("Error fetching articles");

      const data = await response.json();
      setAllArticles(data.slice(0, MAX_ARTICLES));
    } catch (err) {
      console.error(err);
      setError(true);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    getArticles();
  }, [getArticles]);


  return (
    <div className="container mt-10 md:mt-40 ">
      <SectionHeader
        title="Latest Articles"
        subtitle="Up-to-date articles on programming and technology"
        link={"articles/1"}
      />

      <div className="grid grid-cols-1 sm:grid-cols-2  lg:grid-cols-4  gap-3.5 md:gap-5 mt-12 mb-8 md:mb-28">
        {loading && <Skeleton count={MAX_ARTICLES} />}
        {!loading && error && (
          <ErrorFallback onRetry={getArticles} message="latest articles" />
        )}
        {!loading && !error && allArticles.length === 0 && (
          <p className="col-span-full text-center text-gray-500">
            No articles available.
          </p>
        )}
        {!loading &&
          !error &&
          allArticles.map((article) => (
            <BlogBox key={article._id} article={article} />
          ))}
      </div>
    </div>
  );
}

export default Blogs;
