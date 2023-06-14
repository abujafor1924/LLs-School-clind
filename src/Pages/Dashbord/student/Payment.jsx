import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "../../../Components/ChckOutForm/CheckoutForm";
import { loadStripe } from "@stripe/stripe-js";

import useAxiusSecure from "../../../Components/Hook/useAxiusSecure";
import { useQuery } from "@tanstack/react-query";
// import { useState } from "react";

const stripePromise = loadStripe(
  "pk_test_51NIXUYAJxfkqSYwalVggivlOwUf9fJvQE30Ji4Z4vJpj0LwGoSFKABOWUi5BYE1GXnnXZ9MKFxqiaxkkwaZwY25I00CGIbSa8M"
);
const Payment = () => {
  const [axiosSecure] = useAxiusSecure();
  const { data: users = [] } = useQuery({
    queryFn: async () => {
      const res = await axiosSecure("/enroll");
      // console.log("res from axios", res);
      return res.data;
    },
  });

  return (
    <div>
      <h1 className="text-4xl font-bold mb-6">payment Process</h1>

      <Elements stripe={stripePromise}>
        <CheckoutForm price={users.price} />
      </Elements>
    </div>
  );
};

export default Payment;
