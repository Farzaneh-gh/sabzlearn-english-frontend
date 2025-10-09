import React, { useState } from "react";
import Breadcrumb from "../../components/common/Breadcrumb/Breadcrumb";
import PaymentForm from "./PaymentForm";
import { OrderSummary } from "./OrderSummary";


const Checkout = () => {
  const [loading] = useState(false);

  return (
    <div className="bg-gray-100 dark:bg-zinc-800 pt-32">
      <div className="container mx-auto px-4">
        {loading && (
          <div className="flex flex-col justify-center items-center py-20 gap-y-5">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500"></div>
            <span className="ml-3 text-lg">Loading course details...</span>
          </div>
        )}
        <div>
          <Breadcrumb
            links={[
              { id: 1, title: "Home", to: "/" },
              {
                id: 2,
                title: "Shopping Cart",
                to: "cart",
              },
              {
                id: 3,
                title: "Checkout",
                to: "",
              },
            ]}
          />

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6 mb-20">
            <PaymentForm  />
            <OrderSummary className="lg:col-span-1" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
