import React from "react";
import ItemBox from "../../../components/UserPanel/ItemBox/ItemBox";
import questions from "../../../assets/images/questions.png";
import tickets from "../../../assets/images/tickets.png";
import transactions from "../../../assets/images/transactions.png";
import courses from "../../../assets/images/courses.png";
import CourseDetailBox from "../../../components/CourseDetailBox/CourseDetailBox";
import EmptyDashboard from "../../../components/UserPanel/EmptyDashboard/EmptyDashboard";
const boxes = [
  {
    img: courses,
    value: "10 courses",
    label: "My Courses",
  },
  {
    img: questions,
    value: "0 questions",
    label: "Q&A",
  },
  {
    img: tickets,
    value: "1 ticket",
    label: "Tickets",
  },
  {
    img: transactions,
    value: "0 €",
    label: "Wallet",
  },
];

const Index = () => {
  return (
    <div className="mt-10 lg:container lg:p-0 lg:space-y-5">
      {/* <!-- Item Box --> */}
      <div className="grid grid-cols-1 xs:grid-cols-2 items-center px-8 sm:px-4 md:px-8 sm:grid-cols-4 md:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-4 bg-white  dark:bg-zinc-800 lg:rounded-xl p-4 md:shadow-2xl text-zinc-700 dark:text-zinc-300">
        {boxes.map((box, index) => (
          <ItemBox
            key={index}
            imaSrc={box.img}
            title={box.value}
            subtitle={box.label}
          />
        ))}
      </div>

      {/* <!-- Main Content --> */}
      <section className="bg-white dark:bg-transparent  lg:shadow-2xl dark:shadow-none lg:rounded-xl p-4 pt-10">
        <EmptyDashboard />
        <div>

        </div>
      </section>
    </div>
  );
};

export default Index;
