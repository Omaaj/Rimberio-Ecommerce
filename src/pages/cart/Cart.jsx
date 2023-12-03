import React, { useEffect } from 'react';
import "./Cart.css";
import NavBar from '../components/navBar/NavBar'
import Footer from '../components/footer/Footer'
import { useDispatch, useSelector } from 'react-redux';
import { ADD_TO_CART, CALCULATE_SUBTOTAL, CALCULATE_TOTAL_QUANTITY, CLEAR_CART, DECREASE_CART, REMOVE_FROM_CART, SAVE_URL, selectCartItems, selectCartTotalAmount, selectCartTotalQuantity } from '../../redux/slice/cartSlice';
import { Link, useNavigate } from 'react-router-dom';
import { FaTrashAlt } from 'react-icons/fa';
import { motion } from 'framer-motion';
import { selectIsLoggedInUser } from '../../redux/slice/authSlice';
import Helment from '../components/helment/Helment';

export default function Cart() {
  const cartItems = useSelector(selectCartItems);
  const cartTotalAmount = useSelector(selectCartTotalAmount);
  const cartTotalQuantity = useSelector(selectCartTotalQuantity);
  const isLoggedIn = useSelector(selectIsLoggedInUser)
 
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const increaseCart = (cart) => {
    dispatch(ADD_TO_CART(cart))
  }

  const decreaseCart = (cart) => {
    dispatch(DECREASE_CART(cart))
  }

  const removeFromCart = (cart) => {
    dispatch(REMOVE_FROM_CART(cart))
  }

  const clearCart = () => {
    dispatch(CLEAR_CART())
  }

  useEffect(() => {
    dispatch(CALCULATE_SUBTOTAL())
    dispatch(CALCULATE_TOTAL_QUANTITY());
    dispatch(SAVE_URL(""));
  },[dispatch, cartItems]);

  const url = window.location.href;

  const checkOut = () => {
    if(isLoggedIn) {
      navigate("/checkout-details")
    }else {
      dispatch(SAVE_URL(url));
      navigate("/login")
    }
  }

  

  return (
    <div>
      <Helment title={"Cart"}>
        <NavBar />
        <div className="tables">
          <h2>Shopping Cart</h2>
          {
            cartItems.length === 0 ? (
              <>
                <p>Your Cart is currently empty.</p>
                <div className="fivs">
                  <Link to="/stores">&larr; Continue shopping</Link>
                </div>
              </>
            )
            :
            (
              <>
                <div className="thtabke">
                  <table>
                    <thead>
                      <tr>
                        <th>s/n</th>
                        <th>Product</th>
                        <th>Title</th>
                        <th>Price</th>
                        <th>Quantity</th>
                        <th>Total</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {
                        cartItems.map((cart, index) => {
                          const { title, price, img, cartQuatity} = cart;
                          return(

                            <tr key={index}>
                              <td>
                                {index + 1}
                              </td>
                              <td>
                                <img src={img} alt={title}  />
                              </td>
                              <td>
                                {title}
                              </td>
                              <td>
                                {`$${price}`}
                              </td>
                              <td>
                                <div className="buttons">
                                  <button onClick={() => decreaseCart(cart)}>-</button>
                                  <span>{cartQuatity}</span>
                                  <button onClick={() => increaseCart(cart)}>+</button>
                                </div>
                              </td>
                              <td>
                                ${(price * cartQuatity).toFixed(2)}
                              </td>
                              <td>
                                <div className="actionss">
                                    <FaTrashAlt onClick={() => removeFromCart(cart)} />
                                </div>
                              </td>
                            </tr>
                          )
                        })
                      }
                    </tbody>
                  </table>
                </div>
                <div className="summary">
                  <div className="summarybtn">
                    <motion.button whileTap={{scale : 0.8}}  className='btn' onClick={clearCart}>Clear Cart</motion.button>
                  </div>
                  <div className="checkout">
                    <div className="link-sum">
                      <Link to="/stores" className='link-sum1'>&larr; Continue Shopping</Link>
                      <div className="cards-sum">
                        <p>Cart items(s): <span>{`${cartTotalQuantity}` }</span> </p>
                        <div className="subttal">
                          <h4>Subtotal:</h4>
                          <h3>{`$${cartTotalAmount.toFixed(2)}`}</h3>
                        </div>
                        <div className="tasx">
                          <div className='paea'> Once payment is made, we'll email your shipping fee and tracking number. Thanks for choosing our services!</div>
                        </div>
                        <motion.button 
                          className='checkut' 
                          whileTap={{scale : 0.9}}
                          onClick={checkOut}
                          >
                            Checkout
                          </motion.button>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            )
          }
        </div>
        <Footer />

      </Helment>
    </div>
  )
}
