import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";
import useAxiusSecure from "../Hook/useAxiusSecure";

const CheckoutForm = ({ price }) => {
  //   console.log(price.price);
  // const { prices } = price;
  const stripe = useStripe();
  const [cardError, setcardError] = useState();
  const elements = useElements();
  const [axiosSecure] = useAxiusSecure();
  const [clindSecret, setClindSecret] = useState("");

  useEffect(() => {
    axiosSecure.post("/create-payment-intent", { price }).then((res) => {
      console.log(res.data.clientSecret);
      setClindSecret(res.data.clientSecret);
    });
  }, [price, axiosSecure]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!stripe || !elements) {
      return;
    }

    const card = elements.getElement(CardElement);

    if (card == null) {
      return;
    }

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });
    if (error) {
      console.log("[error]", error);
      setcardError(error.message);
    } else {
      setcardError("");
      console.log("[PaymentMethod]", paymentMethod);
    }

    const { paymentIntent, error: confirmError } =
      await stripe.confirmCardPayment(clindSecret, {
        payment_method: {
          card: card,
          billing_details: {
            price: price?.name || "anonymous",
          },
        },
      });
    if (confirmError) {
      console.log(confirmError);
    }
    console.log(paymentIntent);
    //     console.log(card);
  };
  return (
    <>
      <form onSubmit={handleSubmit}>
        <CardElement
          options={{
            style: {
              base: {
                fontSize: "16px",
                color: "#424770",
                "::placeholder": {
                  color: "#aab7c4",
                },
              },
              invalid: {
                color: "#9e2146",
              },
            },
          }}
        />
        <button type="submit" disabled={!stripe || !clindSecret}>
          Pay
        </button>
      </form>

      {cardError && <p className="text-red-600">{cardError}</p>}
    </>
  );
};

export default CheckoutForm;
