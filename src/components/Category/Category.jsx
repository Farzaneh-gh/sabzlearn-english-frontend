import React from "react";
import category1 from "../../assets/images/categories/category1.png";
import category2 from "../../assets/images/categories/category2.png";
import category3 from "../../assets/images/categories/category3.png";
import category4 from "../../assets/images/categories/category4.png";
import category5 from "../../assets/images/categories/category5.png";

function Category() {
  return (
    <section className="container mt-8 md:mt-20">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <a
          href="#"
          className="category-bg__item1 h-36 md:h-62 rounded-2xl flex flex-col justify-center gap-y-4 md:gap-y-7 items-start pr-6 md:pr-12"
          aria-label="Coffee Types"
        >
          <h5 className="font-semibold text-2xl md:text-4xl leading-6 text-white">
            Coffee Types
          </h5>
          <p className="text-base md:text-xl leading-6 text-white font-medium">
            Blends & Single Origins
          </p>
        </a>
        <a
          href="#"
          className="category-bg__item2 h-36 md:h-62 rounded-2xl flex flex-col justify-center gap-y-4 md:gap-y-7 items-start pr-6 md:pr-12"
          aria-label="Instant Powders"
        >
          <h5 className="font-semibold text-2xl md:text-4xl leading-6 text-white">
            Instant Powders
          </h5>
          <p className="text-base md:text-xl leading-6 text-white font-medium">
            Nescafe, Hot Chocolate, Masala
          </p>
        </a>
      </div>

      <div className="flex flex-wrap justify-center items-center gap-x-7 md:gap-x-16 gap-y-8 mt-10 md:mt-20 mb-10 md:mb-20">
        {[category1, category2, category3, category4, category5].map(
          (img, idx) => {
            const labels = [
              "Pour Over & Espresso Coffee",
              "Accessories & Equipment",
              "Espresso Machines",
              "Coffee Taster Packs",
              "Turkish Coffee",
            ];
            return (
              <a
                key={idx}
                href="#"
                className="flex flex-col items-center gap-y-2.5"
                aria-label={labels[idx]}
              >
                <img
                  src={img}
                  alt={labels[idx]}
                  className="w-25 md:w-50 h-25 md:h-50"
                />
                <span className="font-semibold text-sm md:text-xl leading-7 text-zinc-700 dark:text-white">
                  {labels[idx]}
                </span>
              </a>
            );
          }
        )}
      </div>
    </section>
  );
}

export default Category;
