import { useState } from 'react';
import { useStripe, useElements, PaymentElement } from '@stripe/react-stripe-js';

function CheckoutForm({amount}) {
  const stripe = useStripe();
  const elements = useElements();

  const [loading, setLoading] = useState(false);
	const [errormessage, setErrorMessage] = useState()

  const handleSubmit = async (event) => {
    event.preventDefault();
  
    if (!stripe || !elements) {
      return;
    }
  
    const handleError = (error) => {
			setLoading(false)
			setErrorMessage(error.message)
		}

    const { error: submitError } = await elements.submit();
 if (submitError) {
			handleError(submitError);
			return;
		}
  
    try {
      const res = await fetch('api/create-intent', {
        method: 'POST',
        body: JSON.stringify({
          amount: amount
        })
      })
      const clientSecret = await res.json()
  
      const result = await stripe.confirmPayment({
        elements,
        clientSecret,
        confirmParams: {
          return_url: process.env.NEXT_PUBLIC_PPORT+"/payment-confirmed",
        },
      });
  
      if (result.error) {
        setErrorMessage(result.error.message);
      } else {
        // Redirect will happen automatically
      }
    } catch (error) {
      setErrorMessage(error.message);
    } finally {
      setLoading(false);
    }
  };
  return (
    <form onSubmit={handleSubmit}>
      <PaymentElement />
      {errormessage && <div>{errormessage}</div>}
      <button type="submit" disabled={!stripe || loading}>
        {loading ? 'Processing...' : 'Submit'}
      </button>
    </form>
  );
}

export default CheckoutForm;
