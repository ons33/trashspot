import { useEffect, useState } from "react";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

function Payment(){
    return (
        <>
      <h1>React Stripe and the Payment Element</h1>
      
        <Elements>
          <CheckoutForm />
        </Elements>
      
    </>
    )
}