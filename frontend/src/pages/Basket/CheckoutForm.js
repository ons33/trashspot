import { PaymentElement } from '@stripe/react-stripe-js';
import { useState } from 'react';
import { useStripe, useElements } from '@stripe/react-stripe-js';
import { deleteBasket } from '../../redux/actions/basketActions';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Button } from '@material-ui/core';
export default function CheckoutForm() {
  const stripe = useStripe();
  const elements = useElements();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const basket = useSelector((state) => state.basket);
  let userId = useSelector((state) => state.auth.user.id);

  const [message, setMessage] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const handlePayDelivery = () => {
    console.log('pay on delivery ');
    let method = 1;
    fetch(`https://he-bosses-pi-dev-api.onrender.com/delivery/add/${userId}/${method}`, {
      method: 'PUT',
      body: JSON.stringify({}),
    });
  };
  const handleSubmit = async (e) => {
    await handlePayDelivery();

    
    e.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js has not yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      return;
    }

    setIsProcessing(true);

    const { error, paymentIntent } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        // Make sure to change this to your payment completion page
        return_url: `${window.location.origin}/allProducts`,
      },
      //redirect: 'if_required',
    });

    if (error) {
      setMessage(error.message);
    } else if (paymentIntent && paymentIntent.status === 'succeeded') {
      setMessage('Payment status: ' + paymentIntent.status + ' ! ');
      await dispatch(deleteBasket(basket._id));
    } else {
      setMessage('An unexpected error occured.');
    }

    setIsProcessing(false);
  };

  return (
    <form id="payment-form" onSubmit={handleSubmit}>
      <PaymentElement id="payment-element" />
      <button
        style={{ color: 'black' }}
        disabled={isProcessing || !stripe || !elements}
        id="submit"
      >
        <span id="button-text">
          {isProcessing ? 'Processing ... ' : 'Pay now'}
        </span>
      </button>
      {/* Show any error or success messages */}
      {message && <div id="payment-message">{message}</div>}
    </form>
  );
}
