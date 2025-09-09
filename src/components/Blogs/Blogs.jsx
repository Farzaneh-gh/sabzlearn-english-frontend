import React, { useEffect } from "react";
import SectionHeader from "../SectionHeader/SectionHeader";
import BlogBox from "./BlogBox";

function Blogs() {
  const [allArticles, setAllArticles] = React.useState([]);
  useEffect(() => {
    fetch(`${import.meta.env.VITE_BACKEND_URL}/articles`).then((response) =>
      response
        .json()
        .then((data) => {
          const lastData = data.length > 3 ? data.slice(0, 4) : data;
          setAllArticles(lastData);
        })
        .catch((error) => console.error("Error fetching articles:", error))
    );
  }, []);
  return (
    <div className="container mt-10 md:mt-40 ">
      <SectionHeader
        title="Latest Articles"
        subtitle="Up-to-date articles on programming and technology"
        ref={"articles/1"}
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4  gap-3.5 md:gap-5 mt-12 mb-8 md:mb-28">
        {allArticles.map((article, index) => (
          <BlogBox
            key={index}
            image={`${import.meta.env.VITE_BACKEND_URL_IMG}/courses/covers/${
              article.cover
            }`}
            title={article.title}
            description={article.description}
            date={article.createdAt}
            shortName={article.shortName}
          />
        ))}
      </div>
    </div>
  );
}

export default Blogs;
