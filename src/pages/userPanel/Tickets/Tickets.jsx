import React from 'react'
import EmptyTickets from '../../../components/UserPanel/EmptyTickets/EmptyTickets'
const Tickets = () => {
  return (
    <section className="mt-10 lg:container lg:p-0 lg:space-y-5 ">
      <div className="bg-white dark:bg-transparent  lg:shadow-2xl dark:shadow-none lg:rounded-xl p-4">
        <h2 className="font-bold  text-lg xs:text-2xl leading-8 md:leading-12 text-zinc-700 dark:text-zinc-300 md:pl-8">
          My Tickets
        </h2>
        <EmptyTickets />
      </div>
    </section>
  );
}

export default Tickets