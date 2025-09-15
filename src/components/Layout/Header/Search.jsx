import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useDebounce } from "../../../hooks/useDebounce";
import { search } from "../../../api/search";

const Search = () => {
  const [searchValue, setSearchValue] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [showResults, setShowResults] = useState(false);

  const debouncedSearchTerm = useDebounce(searchValue, 500);

  useEffect(() => {
    const performSearch = async () => {
      if (debouncedSearchTerm.length < 3) {
        setSearchResults([]);
        setShowResults(false);
        return;
      }

      setIsSearching(true);
      setShowResults(true);
      try {
        const data = await search(debouncedSearchTerm);
        setSearchResults([...data.allResultCourses, ...data.allResultArticles]);
      } catch (error) {
        console.error("Search failed:", error);
        setSearchResults([]);
      } finally {
        setIsSearching(false);
      }
    };

    performSearch();
  }, [debouncedSearchTerm]);

  const handleInputChange = (e) => {
    setSearchValue(e.target.value);
    if (!e.target.value) {
      setShowResults(false);
    }
  };

  return (
    <div className="relative w-full md:w-2/3 mx-auto space-y-6 mt-7 sm:mt-12 lg:mt-14 mb-10 lg:mb-14 my-14 z-30">
      <div className="flex items-center justify-between gap-x-5 md:gap-x-8 p-1.5 sm:p-2.5 pl-4 sm:pl-4 bg-white rounded-full border border-transparent focus-within:border-neutral-200 transition-all">
        <input
          autoComplete="off"
          name="s"
          type="text"
          value={searchValue}
          onChange={handleInputChange}
          onFocus={() => searchValue.length > 2 && setShowResults(true)}
          onBlur={() => setTimeout(() => setShowResults(false), 200)} // Delay to allow click on results
          placeholder="Search..."
          className="flex-grow pr-2.5 bg-transparent text-gray-900 font-body text-sm md:text-base border-none focus:outline-none"
        />
        <button
          type="button"
          className="flex-center shrink-0 size-11 md:size-13 text-white rounded-full bg-green-500"
        >
          <svg className="size-5 md:size-6">
            <use href="#icon-magnifying-glass"></use>
          </svg>
        </button>
      </div>

      {showResults && (
        <div className="absolute right-0 left-0 bg-white p-5 border border-neutral-200 text-gray-900 rounded-xl z-20 transition-all text-center">
          {isSearching ? (
            <div className="btn btn-success btn-outline mx-auto">
              <svg className="size-6 animate-spin animate-reverse">
                <use href="#icon-refresh"></use>
              </svg>
            </div>
          ) : (
            <div className="space-y-5 text-left">
              {searchResults.length > 0 ? (
                searchResults.map((item) => (
                  <Link
                    key={item._id}
                    to={
                      item.name
                        ? `/course-info/${item.shortName}`
                        : `/article-info/${item.shortName}`
                    }
                    className="text-xs md:text-base flex items-center justify-between"
                  >
                    {item.name || item.title}
                    <svg className="inline-block size-5 transform rotate-180">
                      <use href="#icon-chevron"></use>
                    </svg>
                  </Link>
                ))
              ) : (
                <div>
                  <p>Sorry, no results matched your search!</p>
                  {searchValue.length < 3 && (
                    <p className="text-sm text-gray-500 mt-1">
                      Please enter at least 3 characters.
                    </p>
                  )}
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Search;
