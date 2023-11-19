import React, { useEffect, useState } from "react";
import {
  PaymentElement,
  // LinkAuthenticationElement,
  useStripe,
  useElements
} from "@stripe/react-stripe-js";
import CheckoutSummary from "../checkoutSummary/CheckoutSummary";
import { toast } from "react-toastify";
import "./CheckoutForm.css";
import { motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { selectEmail, selectUserId } from "../../../redux/slice/authSlice";
import { CALCULATE_SUBTOTAL, CLEAR_CART, selectCartItems, selectCartTotalAmount } from "../../../redux/slice/cartSlice";
import { selectShippingAddress } from "../../../redux/slice/checkoutSlice";
import { Timestamp, addDoc, collection } from "firebase/firestore";
import { db } from "../../../fireBase/config";
import { useNavigate } from "react-router-dom";

export default function CheckoutForm() {
  const stripe = useStripe();
  const elements = useElements();
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);


  const dispatch = useDispatch();
  const navigate = useNavigate()

  const userId = useSelector(selectUserId);
  const userEmail = useSelector(selectEmail);
  const cartItems = useSelector(selectCartItems);
  const shippingAddress = useSelector(selectShippingAddress);
  const cartTotalAmount = useSelector(selectCartTotalAmount);


  useEffect(() => {
    dispatch(CALCULATE_SUBTOTAL())
  },[dispatch, cartItems]);

  useEffect(() => {
    if (!stripe) {
      return;
    }

    const clientSecret = new URLSearchParams(window.location.search).get(
      "payment_intent_client_secret"
    );

    if (!clientSecret) {
      return;
    }

  }, [stripe]);

  const saveOrder = () => {
    // e.preventDefault()
    const today = new Date();
    const date = today.toDateString();
    const time = today.toLocaleTimeString();
    const orderConfig = {
      userId,
      userEmail,
      orderDate : date,
      orderTime : time,
      orderAmount : cartTotalAmount,
      orderStatus : "Order Placed...",
      cartItems,
      shippingAddress,
      createdAt : Timestamp.now().toDate()
    }

    try {
      addDoc(collection(db, "orders"), orderConfig);
      dispatch(CLEAR_CART())
      toast.success("Order Saved")
      navigate("/checkout-success")
    } catch (error) {
      toast.error(error.message)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage(null)

    if (!stripe || !elements) {
      // Stripe.js hasn't yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      return;
    }

    setIsLoading(true);


    const confirmPayment = await stripe
        .confirmPayment({
        elements,
        confirmParams: {
            // Make sure to change this to your payment completion page
            return_url: "http://localhost:3000/checkout-success",
        },
        redirect : "if_required"
        })
        .then((result) => {
            // ok as okayResult - paymentIntent; bad as badResult - error
            if(result.error) {
                toast.error(result.error.message);
                setMessage(result.error.message)
                return;
            }
            if(result.paymentIntent) {
                if(result.paymentIntent.status === "succeeded") {
                    setIsLoading(false)
                    toast.success("Payment Successful")
                    saveOrder()
                }
            }
        });



        setIsLoading(false);
    };



  // const paymentElementOptions = {
  //   layout: "tabs"
  // }

  return (
    <>
            <div className="checkout-form">
                <h2>Checkout</h2>
                {/* <form onSubmit={saveOrder}>
                  <button type="submit">Save</button>
                </form> */}
                <form onSubmit={handleSubmit}>
                    <div className="div1">
                        <div className="cardclassdiv">
                            <CheckoutSummary />
                        </div>
                    </div>
                    <div className="div2">
                        <div className="cardclassdiv1">
                            <h3>Stripe Checkout</h3>
                            
                            <PaymentElement id="payment-element" 
                            />
                            <motion.button 
                                whileTap={{scale : 0.8}}
                                disabled={isLoading || !stripe || !elements} 
                                id="submit"
                                className="buttonss"
                            >
                                <span id="button-text">
                                    {isLoading ? <div className="spinner" id="spinner">Loading...</div> : "Pay now"}
                                </span>
                            </motion.button>
                            {
                                message && 
                                <div className="payment-message">{message}</div>
                            }
                        </div>
                    </div>
                </form>
            </div>
    </>
  );
}