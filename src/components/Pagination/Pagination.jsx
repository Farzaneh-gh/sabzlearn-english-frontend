import React, { useEffect } from "react";
import { useParams,useNavigate,Link } from "react-router-dom";

function Pagination({ items, setItems, pageSize, path }) {
  const navigate = useNavigate();
  const { pageNumber } = useParams();
  const currentPage = Number(pageNumber);
  const totalPages = Math.ceil(items.length / pageSize);

  useEffect(() => {
    console.log(items);
      if (!currentPage || currentPage < 1 || currentPage > totalPages) {
        navigate("/notfound", { replace: true });
        return;
      }

    const endIndex = currentPage * pageSize;
    const startIndex = endIndex - pageSize;
    setItems(items.slice(startIndex, endIndex));
  }, [items, setItems, currentPage, pageSize, totalPages, navigate]);

  if (totalPages === 1) return null;

  return (
    <div className="join mb-8">
      {totalPages > 1 &&
        Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index}
            className={`join-item btn ${
              index + 1 === currentPage ? "btn-active" : ""
            }`}
          >
            <Link
              to={`/${path}/${index + 1}`}
              className="courses__pagination-link"
            >
              {index + 1}
            </Link>
          </button>
        ))}
    </div>
  );
}

export default Pagination;
