import React, { useState } from "react";
import { useDispatch } from "react-redux";

import {useStripe, useElements, CardElement} from '@stripe/react-stripe-js';

import { emptyCart, createOrder } from '../../actions/api';

const CheckoutForm = ({ 
  customerDetails, 
  checkout,
  clientSecret,
  setSucceeded,
}) => {
  const stripe = useStripe();
  const elements = useElements();
  const dispatch = useDispatch()

  const [error, setError] = useState(null);
  const [processing, setProcessing] = useState(false);
  const [firstname, setFName] = useState(customerDetails.firstname)
  const [lastname, setLName] = useState(customerDetails.lastname)

  const handleSubmit = async (event) => {
    event.preventDefault();
    setProcessing(true);

    if (!stripe || !elements) return ;

    let result = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: elements.getElement(CardElement),
        billing_details: {
          name: `${firstname} ${lastname}`,
        },
      }
    });
  
    if (result.error) {

      setError(`Payment failed ${result.error.message}`);
      setProcessing(false)

    } else if (result.paymentIntent.status === 'succeeded') {
        dispatch(emptyCart())
        let order = await createOrder(checkout.id, checkout.stripe_pi_id)
        setError(null);
        setProcessing(false)
        setSucceeded(order.data);
    }else{
      setError("Payment not succeeded, retry in a moment");
      setProcessing(false)
    }
  };

  return (
    <>
        <div className="form-container">
            <div className="form-header">
                <h2><span className="form-header-step">2</span>Payment details:</h2>
            </div>

            <form 
              id="checkout-form-stripe"
              className="shipping-form" 
              onSubmit={handleSubmit}
            >
              <div className="horizontal-inputs">
                <div className="input-group">
                  <label htmlFor="firstNameInput" className="input-label">Firstname</label>
                  <input 
                    required
                    type="text" 
                    id="firstNameInput"
                    name="first-name-input"
                    className="input-field" 
                    placeholder="Firstname"
                    value={firstname}
                    onChange={(e) => setFName(e.target.value)}
                  />
                </div>
                <div  className="input-group">
                  <label htmlFor="lastNameInput" className="input-label" >Lastname</label>
                  <input
                    required
                    type="text" 
                    id="lastNameInput" 
                    className="input-field" 
                    placeholder="Lastname"
                    value={lastname}
                    onChange={(e) => setLName(e.target.value)}
                  />
                </div>
              </div>

              <div className="input-group">
                <label htmlFor="firstNameInput" className="input-label">Card details</label>
                <div className="input-field input-stripe">
                  <CardElement className="" options={CardElementOptions} />
                </div>
              </div>

            </form>
        </div>

        <div className="form-underbar">
          { error ? (
            <div className="card-error" role="alert">
              {error}
            </div>
          ) : (<div></div>)}

          <button
            disabled={!stripe || !clientSecret}
            type="submit"
            form="checkout-form-stripe"
            className="checkout-btn"
          >
            <span id="button-text">
              { processing ? (
                  "..."
              ) : (
                  "Pay"
              )}
            </span>
          </button>
        </div>
    </>
  );
}

const CardElementOptions = {
  style: {
    base: {
      padding: '10px',
      color: "#32325d",
      fontFamily: 'inherit',
      fontSmoothing: "antialiased",
      fontSize: "1rem",
      "::placeholder": {
        color: "#686666",
      }
    },
    invalid: {
      color: "#fa755a",
      iconColor: "#fa755a",
    },
  },
  hidePostalCode: true,
};

export default CheckoutForm



