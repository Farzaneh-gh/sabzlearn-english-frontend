import React , {useEffect} from 'react'
import { useParams } from 'react-router-dom'
import { Link } from "react-router-dom"; 
function Pagination({ items, setItems, pageSize, path }) {
    const { pageNumber } = useParams();
      const totalPages = Math.ceil(items.length / pageSize);

       useEffect(() => {
         const endIndex = pageNumber * pageSize;
         const startIndex = endIndex - pageSize;
         setItems(items.slice(startIndex, endIndex));
       }, [items, setItems, pageNumber, pageSize]);

  return (
    <div className="join mb-8">
      {totalPages > 1 &&
        Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index}
            className={`join-item btn ${
              index + 1 === Number(pageNumber) ? "btn-active" : ""
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

export default Pagination