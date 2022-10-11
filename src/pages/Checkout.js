import './checkout.css'
import React, {useEffect, useState} from 'react'

import CostumerInfoForm from '../components/checkout/CostumerInfoForm'
import CheckoutForm from '../components/checkout/CheckoutForm'
import FinalCart from '../components/checkout/FinalCart'
import Success from '../components/checkout/Success';

import { createCartCheckout, createPaymentIntent } from '../actions/api';

const Checkout = () => {
    const [checkout, setCheckout] = useState({ 
        id: "",
        stripe_pi_id: "",
        shipping_methods: []
    })

    const [customerDetails, setCustomerDetails] = useState({
        // customer data
        firstname: "",
        lastname: "",
        email: "",
        phone: "",

        // shipping data
        country: "",
        state: "",
        city: "",
        line1: "",
        line2: "",
        postalCode: "",
    })

    const [shippingMethod, setShippingMethod] = useState(null)

    const [succeeded, setSucceeded] = useState(false)
    const [clientSecret, setClientSecret] = useState(null)
    
    useEffect(async () => {
        if(!checkout.id){
            try {
                const ck = await createCartCheckout(customerDetails)
                setCheckout(ck.data)
            } catch (err) {
                console.log("COULD NOT CREAT CHECKOUT", err)
            }
        }
    }, [])

    useEffect(async () => {
        if(shippingMethod){
            try {
                const ckp = await createPaymentIntent(checkout.id, shippingMethod)
                setCheckout(ckp.data.checkout)
                setClientSecret(ckp.data.clientSecret)   
            } catch (err) {
                console.log("COULD NOT CREATE PAYMENT INTENT")
            }
        }
    }, [shippingMethod])

    return ( succeeded ? (
        <Success success={succeeded} />
    ) : (
        <div className="checkout-container">
            <div className="checkout-forms">
                <CostumerInfoForm 
                    customerDetails={customerDetails}
                    setCustomerDetails={setCustomerDetails}
                    shippingMethods={checkout.shipping_methods}
                    setShippingMethod={setShippingMethod}
                />

                <CheckoutForm
                    customerDetails={customerDetails}
                    checkout={checkout}
                    clientSecret={clientSecret}
                    setSucceeded={setSucceeded}
                />
            </div>
            
            <FinalCart order={checkout} />
        </div>
        )
    )
}

export default Checkout
