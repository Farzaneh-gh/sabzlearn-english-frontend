import React from "react";
import { Link } from "react-router-dom";

function BlogBox({ article }) {
  
  return (
    <div className="blog flex flex-col bg-white dark:bg-zinc-700 overflow-hidden rounded-xl text-zinc-700 dark:text-white">
      <Link to={`/article-info/${article.shortName}`} className="block h-45">
        <img
          src={`${import.meta.env.VITE_BACKEND_URL_IMG}/courses/covers/${
            article.cover
          }`}
          className="block size-full rounded-xl object-cover"
          alt={article.title}
          loading="lazy"
        />
      </Link>

      <div className="flex-grow px-5 pt-5">
        <h3 className="font-danaDemiBold text-base md:text-lg line-clamp-1 mb-4">
          <Link to={`/article-info/${article.shortName}`}>{article.title}</Link>
        </h3>

        <p className="text-sm line-clamp-2  max-h-14 text-gray-700 dark:text-gray-200 mb-4">
          {article.description}
        </p>

        <div className=" ">
          <div className="flex justify-between items-center text-slate-500 dark:text-white/70 text-sm pb-4 border-b border-b-neutral-200/70 dark:border-b-white/10">
            <span>Date</span>
            <span>
              {new Date(article.createdAt).toLocaleDateString("en-US")}
            </span>
          </div>

          <div className="flex justify-center mt-4">
            <Link
              to={`/article-info/${article.shortName}`}
              className="hover:text-green-500 font-danaMedium transition-colors"
            >
              Read Article
              <svg className="w-5 h-5">
                <use href="#arrow-left-circle-mini"></use>
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BlogBox;
