import { Suspense, useState } from 'react';
import { useStripe, useElements, PaymentElement } from '@stripe/react-stripe-js';
import Loading from '../../components/loading';
import Image from 'next/image';

function CheckoutForm({amount}) {
  const stripe = useStripe();
  const elements = useElements();

  const [loading, setLoading] = useState(false);
	const [errormessage, setErrorMessage] = useState()

  const handleSubmit = async (event) => {
    event.preventDefault();
  setLoading(true)
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
    <div className=' flex justify-center'>
   
    <form className='p-3 payform' onSubmit={handleSubmit}>
         <div className='totalpay'><span>اجمالي المبلغ</span>
     <span>{amount}  <span className=' text-xs'>جنيه مصري</span></span>
   
     </div>
     <Image src="/imgs/prologo1.svg" className='h-7 self-center m-5' alt="Logo" width={90} height={100} />

     <div className='  ' >
      <Suspense fallback={<div className=' h-56 flex items-center justify-center'><Loading/></div>} >
      <PaymentElement /> </Suspense>  </div> 
      {errormessage && <div>{errormessage}</div>}
      <button className='paysubmit font-extrabold text-2xl mt-7' type="submit" disabled={!stripe || loading}>
        {loading ? <Loading/> : 'ادفع'}
      </button>
    </form></div>
  );
}

export default CheckoutForm;
