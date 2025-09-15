import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import Navbar from "../../components/Layout/Navbar/Navbar";
import Breadcrumb from "../../components/common/Breadcrumb/Breadcrumb";
import Footer from "../../components/Layout/Footer/Footer";
import { getArticleDetails } from "../../api/articles";
import Html from "../../components/common/Html/Html"; // For rendering HTML safely

function ArticleInfo() {
  const { articleId } = useParams();
  const [article, setArticle] = useState(null);
  const [articleCategory, setArticleCategory] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getArticleDetails(articleId)
      .then((data) => {
        setArticle(data);
        setArticleCategory(data.categoryID?.title || null);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching article data:", error);
        setLoading(false);
      });
  }, [articleId]);

  return (
    <div className="bg-gray-100 dark:bg-zinc-800 pt-32">
      <div className="container mx-auto px-4">
        <Breadcrumb
          links={[
            { id: 1, title: "Home", to: "/" },
            { id: 2, title: "Articles", to: `/articles/1` },
          ]}
        />

        <div className="col-span-full lg:col-span-8 xl:col-span-9 mb-5">
          <div className="bg-white dark:bg-zinc-700 rounded-xl p-4.5 sm:p-5 text-zinc-700 dark:text-white">
            <div>
              {/* Title */}
              <div className="flex items-center gap-x-2 mb-5 sm:mb-6 pb-5 sm:pb-6 border-b border-b-neutral-200/60 dark:border-b-white/10 relative">
                <span className="absolute -right-6 sm:-right-[26px] block w-1.5 h-[34px] md:h-9.5 bg-sky-500 rounded-r-sm"></span>
                <h1 className="font-DanaDemiBold text-xl md:text-[1.625rem]/10">
                  {loading ? "Loading article..." : article?.title}
                </h1>
              </div>
              {/* Category */}
              <div>
                <Link to="#" className="font-DanaMedium text-xl md:text-xl">
                  {loading ? "Loading category..." : articleCategory}
                </Link>
              </div>
              {/* Author, Date, Views */}
              <div className="flex items-center justify-start xxs:gap-x-2 md:gap-x-5 mt-5 text-gray-500 dark:text-gray-400">
                <div className="flex items-center gap-x-2">
                  <svg className="xxs:w-5 xxs:h-5 w-7 h-7 flex-center text-gray-500">
                    <use href="#icon-user" />
                  </svg>
                  <span className="font-DanaDemiBold text-xs md:text-lg">
                    {article?.creator?.username || "Anonymous User"}
                  </span>
                </div>

                <div className="flex items-center gap-x-2">
                  <svg className="xxs:w-5 xxs:h-5 w-7 h-7 flex-center text-gray-500">
                    <use href="#icon-clock" />
                  </svg>
                  <span className="font-DanaDemiBold text-xs md:text-lg">
                    {article?.createdAt
                      ? new Date(article.createdAt).toLocaleDateString("en-US")
                      : "Loading date..."}
                  </span>
                </div>

                <div className="flex items-center gap-x-2">
                  <svg className="xxs:w-5 xxs:h-5 w-7 h-7 flex-center text-gray-500">
                    <use href="#icon-eye" />
                  </svg>
                  <span className="font-DanaDemiBold text-xs md:text-lg">
                    {article?.views || 0} views
                  </span>
                </div>
              </div>
              {/* Cover Image */}{" "}
              {article?.cover && (
                <img
                  src={`${
                    import.meta.env.VITE_BACKEND_URL_IMG
                  }/courses/covers/${article.cover}`}
                  alt="Article Cover"
                  className="w-full h-auto mt-5 rounded-2xl object-cover"
                />
              )}
              {/* Description */}
              <div className="mt-5 px-5 text-zinc-700 dark:text-white">
                {loading ? (
                  <p>Loading description...</p>
                ) : (
                  <Html testHtmlTemplate={article?.description} />
                )}
              </div>
              {/* Table of contents */}
              <div className="bg-gray-500/9 dark:bg-zinc-800 mt-10 mb-10 rounded-4xl p-7">
                <span className="article-read__title">
                  What you will read in this article
                </span>
                <ul className="text-blue-700 pr-4 mt-2">
                  {article?.tableOfContent?.length > 0 ? (
                    article.tableOfContent.map((item, i) => (
                      <li key={i} className="article-read__item">
                        <Link
                          to={`#${item.slug}`}
                          className="article-read__link"
                        >
                          {item.title}
                        </Link>
                      </li>
                    ))
                  ) : (
                    <>
                      <li className="article-read__item">
                        <Link to="#" className="article-read__link">
                          Introduction to the best websites for learning
                          JavaScript
                        </Link>
                      </li>
                      <li className="article-read__item">
                        <Link to="#" className="article-read__link">
                          An easier way: SabzLearn Academy’s JavaScript courses!
                        </Link>
                      </li>
                    </>
                  )}
                </ul>
              </div>
              {/* Body */}
              <div className="mt-4 mb-4">
                <h2 className="font-DanaDemiBold text-xl md:text-2xl">
                  Introduction to the best websites for learning JavaScript:
                </h2>
                {loading ? (
                  <p className="text-gray-500 mt-2">Loading...</p>
                ) : article?.body ? (
                  <Html testHtmlTemplate={article.body} />
                ) : (
                  <p className="text-gray-500 mt-2">
                    Article content not available.
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </div>
  );
}

export default ArticleInfo;
