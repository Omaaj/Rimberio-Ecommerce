import React, { useEffect, useState } from 'react'
import { selectEmail, selectUserId } from '../../redux/slice/authSlice';
import { CALCULATE_SUBTOTAL, CLEAR_CART, selectCartItems, selectCartTotalAmount } from '../../redux/slice/cartSlice';
import { selectShippingAddress } from '../../redux/slice/checkoutSlice';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Timestamp, addDoc, collection } from 'firebase/firestore';
import { toast } from 'react-toastify';
import CheckoutSummary from '../components/checkoutSummary/CheckoutSummary';
import { db } from '../../fireBase/config';
import NavBar from '../components/navBar/NavBar';
import Footer from '../components/footer/Footer';
import { motion } from 'framer-motion';
import "./Payments.css";
import { IoTimerOutline } from "react-icons/io5";
import { IoMdLock } from "react-icons/io";
import Helment from '../components/helment/Helment';

export default function Payments() {
  const [selectPayment, setSelectPayment] = useState(1);

  const userId = useSelector(selectUserId);
  const userEmail = useSelector(selectEmail);
  const cartItems = useSelector(selectCartItems);
  const shippingAddress = useSelector(selectShippingAddress);
  const cartTotalAmount = useSelector(selectCartTotalAmount);
  
  const navigate = useNavigate();

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(CALCULATE_SUBTOTAL())
  },[dispatch, cartItems]);

  const saveOrder = (e) => {
    e.preventDefault()
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
      toast.error("Please navigate back to the Checkout details page, refresh the page, and then proceed to fill in the input field.")
    }
  }

  const handleTab = (e) => {
    setSelectPayment(e)
  }

  return (
    <div>
      <Helment  title={"Checkout Payments"}>
        <NavBar />
        <form onSubmit={saveOrder} className="formsss">
          <div className="div1">
            <div className="cardclassdiv">
              <CheckoutSummary />
            </div>
          </div>
          <div className="payments">
            <h3>Select Payment</h3>
            <div className="displays">
              <div className="displays1">
                <div className={selectPayment === 1 ? "paymensts one" : "paymensts"} onClick={() => handleTab(1)}>
                  <h4>Coingate</h4>
                  <div className="img_box">
                    <img src="./img/coingate.svg" alt="" />
                  </div>
                </div>
                <div className={selectPayment === 2 ? "paymensts two" : "paymensts"} onClick={() => handleTab(2)}>
                  <h4>PayPal</h4>
                  <div className="img_box">
                    <img src="./img/braintree_paypal.svg" alt="" />
                  </div>
                </div>
              </div>
              <div className="convigte">
                <div className={selectPayment === 1 ? "btc-payments" : "btc-payments fade"}>
                  <div className="btccomplet">
                    <div className="completess">
                      <div className="trans-1">COMPLETE PAYMENT IN BTC </div>
                      <img src="./img/bitcoin.svg" alt="" />
                    </div>
                    <div className="send">SEND <span>{`$${cartTotalAmount}`}</span> TO THE WALLET ADDRESS BELOW</div>
                    <div className="white-file">
                      <input value="1P8ZAsfdkiAunBaF5drfLcFX5ENsCaqpzC" disabled/>
                    </div>
                  </div>
                  <ul>
                    <li>You are about to pay using cryptocurrency. Due to its nature cryptocurrencies is irreversible, and the exchange rates is highly volatile and transitory. <span> Products purchased using cryptocurrencies is not refundable.</span></li>
                    <li>Please note that crypto payments are not received instantly as they require multiple confirmations on the blockchain. Payment confirmation can take up to few hours but usually happens within 20 min.</li>
                    <li>Once you complete the payment, click “Submit Payments” and you will be redirected to your orders</li>
                  </ul>
                </div>
                <div className={selectPayment === 2 ? "btc-payments" : "btc-payments fade"}>
                  <ul>
                    <li>Click on the "PayPal Checkout" button to initiate the payment process.</li>
                  </ul>
                  <div className="paypal-combined">
                    <Link to="https://www.paypal.com/paypalme/IloiloDobbs"  className='payplinks' target='_blank'>
                      <div className="img_box">
                        <img src="./img/braintree_paypal.svg" alt="" />
                      </div>
                      <h4>Checkout</h4>
                    </Link>
                  </div>
                  <ul>
                    <li>After completing the payment on the PayPal platform, Click on the "Submit Payment" button to finalize and complete the payment process and you will be redirected to your orders</li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="btns-com">
              <motion.button whileTap={{scale : 0.8}}>Submit Payment</motion.button>
              <div className="security">
                <div className="securityss">
                  <IoTimerOutline fontSize={16} color='rgb(103, 169, 4)'/>
                  <span>30-Day Money-Back Guarantee</span>
                </div>
                <div className="securityss">
                  <IoMdLock fontSize={16} color='rgb(103, 169, 4)'/>
                  <span>Encrypted and Secure Payments</span>
                </div>
              </div>
            </div>
          </div>
        </form>
        <Footer />

      </Helment>
    </div>
  )
}
