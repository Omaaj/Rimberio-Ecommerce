import React, { useState } from 'react'
import NavBar from '../components/navBar/NavBar'
import Footer from '../components/footer/Footer';
import "./Checkout.css";
import { CountryDropdown } from 'react-country-region-selector';
import { motion } from 'framer-motion';
import { useDispatch } from 'react-redux';
import { SAVE_BILLING_ADDRESS, SAVE_SHIPPING_ADDRESS } from '../../redux/slice/checkoutSlice';
import { useNavigate } from 'react-router-dom';
import CheckoutSummary from '../components/checkoutSummary/CheckoutSummary';
import Helment from '../components/helment/Helment';

const initialAddressState = {
  name : "", 
  line1 : "", 
  line2 : "", 
  city : "", 
  state : "", 
  postal_code : "",
  country : "",
  phone : "",
}

export default function CheckoutDetails() {
  const [shippingAddress, setShippingAddress] = useState({...initialAddressState});
  const [billingAddress, setBillingAddress] = useState({...initialAddressState});

  

  const navigate = useNavigate();

  const dispatch = useDispatch()

  // useEffect(() => {
  //   dispatch(CALCULATE_SUBTOTAL())
  // },[dispatch, cartItems]);

  const handleShipping = (e) => {
    const {name, value} = e.target;
    setShippingAddress({
      ...shippingAddress,[name] : value})
  }
  const handleBilling = (e) => {
    const {name, value} = e.target;
    setBillingAddress({
      ...billingAddress,
      [name] : value
    })
  }
  
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(SAVE_SHIPPING_ADDRESS(shippingAddress));
    dispatch(SAVE_BILLING_ADDRESS(billingAddress));
    navigate("/checkout-payments")
  }

  return (
    <>
      <Helment title={"Checkout Details"}>
        <NavBar />
        <div className='container'>
          <h2>Checkout Details</h2>
          <div className="notes">
            <p><span>Note:</span> In order for our staff to see your shipping information, please reload the checkout details page before filling out the field.</p>
          </div>
          <form onSubmit={handleSubmit}>
            <div>
              <div className="card_add">
                <h3>Shipping Address</h3>
                <div className="input_field">
                  <label>Recipient Name:</label>
                  <input 
                    type="text" 
                    placeholder='Recipient Name'
                    name='name'
                    value={shippingAddress.name}
                    onChange={(e) => handleShipping(e)}
                    required
                  />
                </div>
                <div className="input_field">
                  <label>Address Line 1:</label>
                  <input 
                    type="text" 
                    placeholder='Address Line 1'
                    name='line1'
                    value={shippingAddress.line1}
                    onChange={(e) => handleShipping(e)}
                    required
                  />
                </div>
                <div className="input_field">
                  <label>Address Line 2:</label>
                  <input 
                    type="text" 
                    placeholder='Address Line 2'
                    name='line2'
                    value={shippingAddress.line2}
                    onChange={(e) => handleShipping(e)}
                  />
                </div>
                <div className="input_field">
                  <label>City:</label>
                  <input 
                    type="text" 
                    placeholder='City'
                    name='city'
                    value={shippingAddress.city}
                    onChange={(e) => handleShipping(e)}
                    required
                  />
                </div>
                <div className="input_field">
                  <label>State:</label>
                  <input 
                    type="text" 
                    placeholder='State'
                    name='state'
                    value={shippingAddress.state}
                    onChange={(e) => handleShipping(e)}
                    required
                  />
                </div>
                <div className="input_field">
                  <label>Postal Code:</label>
                  <input 
                    type="text" 
                    placeholder='Postal Code'
                    name='postal_code'
                    value={shippingAddress.postal_code}
                    onChange={(e) => handleShipping(e)}
                    required
                  />
                </div>
                <div className="input_field">
                  <label>Country:</label>
                  <CountryDropdown 
                    className = "select"
                    valueType='short'
                    value={shippingAddress.country}
                    onChange={(val) => handleShipping({
                      target : {
                        name : "country",
                        value : val
                      }
                    })}
                  />
                </div>
                <div className="input_field">
                  <label>Phone:</label>
                  <input 
                    type="number" 
                    placeholder='Phone'
                    name='phone'
                    value={shippingAddress.phone}
                    onChange={(e) => handleShipping(e)}
                    required
                  />
                </div>
                
              </div>
              <div className="card_add">
                <h3>Billing Address</h3>
                <div className="input_field">
                  <label>Name:</label>
                  <input 
                    type="text" 
                    placeholder='Name'
                    name='name'
                    value={billingAddress.name}
                    onChange={(e) => handleBilling(e)}
                    required
                  />
                </div>
                <div className="input_field">
                  <label>Address Line 1:</label>
                  <input 
                    type="text" 
                    placeholder='Address Line 1'
                    name='line1'
                    value={billingAddress.line1}
                    onChange={(e) => handleBilling(e)}
                    required
                  />
                </div>
                <div className="input_field">
                  <label>Address Line 2:</label>
                  <input 
                    type="text" 
                    placeholder='Address Line 2'
                    name='line2'
                    value={billingAddress.line2}
                    onChange={(e) => handleBilling(e)}
                  />
                </div>
                <div className="input_field">
                  <label>City:</label>
                  <input 
                    type="text" 
                    placeholder='City'
                    name='city'
                    value={billingAddress.city}
                    onChange={(e) => handleBilling(e)}
                    required
                  />
                </div>
                <div className="input_field">
                  <label>State:</label>
                  <input 
                    type="text" 
                    placeholder='State'
                    name='state'
                    value={billingAddress.state}
                    onChange={(e) => handleBilling(e)}
                    required
                  />
                </div>
                <div className="input_field">
                  <label>Postal Code:</label>
                  <input 
                    type="text" 
                    placeholder='Postal Code'
                    name='postal_code'
                    value={billingAddress.postal_code}
                    onChange={(e) => handleBilling(e)}
                    required
                  />
                </div>
                <div className="input_field">
                  <label>Country:</label>
                  <CountryDropdown 
                    className = "select"
                    valueType='short'
                    value={billingAddress.country}
                    onChange={(val) => handleBilling({
                      target : {
                        name : "country",
                        value : val
                      }
                    })}
                  />
                </div>
                <div className="input_field">
                  <label>Phone:</label>
                  <input 
                    type="number" 
                    placeholder='Phone'
                    name='phone'
                    value={billingAddress.phone}
                    onChange={(e) => handleBilling(e)}
                    required
                  />
                </div>
                <motion.button 
                  type='submit'
                  className='checkut' 
                  whileTap={{scale : 0.9}}
                  >
                    Proceed to Checkout
                </motion.button>
              </div>
            </div>
            <div className="card-summary">
              <CheckoutSummary />
            </div>
          </form>
        </div>
        <Footer />

      </Helment>
    </>
  )
}
