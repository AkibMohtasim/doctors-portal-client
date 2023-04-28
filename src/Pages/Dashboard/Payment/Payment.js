import { loadStripe } from '@stripe/stripe-js';
import React from 'react';
import { useLoaderData, useNavigation } from 'react-router-dom';
import CheckoutForm from './CheckoutForm';
import { Elements } from '@stripe/react-stripe-js';
import Loading from '../../Shared/Loading/Loading';


// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.
const stripePromise = loadStripe(process.env.REACT_APP_Stripe_pk);



const Payment = () => {

  const booking = useLoaderData();
  const navigation = useNavigation();

  if (navigation.state === 'loading') {
    return <Loading />
  }

  const { treatment, price, appointmentDate, slot } = booking;
  return (
    <div>
      <h3 className='text-3xl'>Payment for {treatment}</h3>
      <p className="text-xl">Please pay <strong>${price}</strong> for you appointment on {appointmentDate} at {slot}.</p>

      <div className='w-96 my-12'>
        <Elements stripe={stripePromise}>
          <CheckoutForm
            booking={booking}
          />
        </Elements>
      </div>
    </div>
  );
};

export default Payment;