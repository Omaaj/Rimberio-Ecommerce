import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { CALCULATE_SUBTOTAL, selectCartItems, selectCartTotalAmount, selectCartTotalQuantity } from '../../../redux/slice/cartSlice'
import { Link } from 'react-router-dom';
import "./CheckoutSummary.css"

export default function CheckoutSummary() {
    const cartItems = useSelector(selectCartItems);
    const cartTotalAmount = useSelector(selectCartTotalAmount);
    const cartTotalQuantity = useSelector(selectCartTotalQuantity);

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(CALCULATE_SUBTOTAL())
    },[dispatch, cartItems]);
    

  return (
    <div className='checkSum'>
      <h3>Checkout Summary</h3>
      {
        cartItems.length === 0 ? (
            <>
                <p>No Item In your Cart</p>
                <button className='btns'>
                    <Link to="/womenWears">&larr; Back To Store</Link>
                </button>
            </>
        )
        :
        (
            <>
                <div>
                    <p>Cart items: <span>{cartTotalQuantity}</span></p>
                    <div className="texte">
                        <h4>Subtotal:</h4>
                        <h3>{`$${cartTotalAmount.toFixed(2)}`}</h3>
                    </div>
                    {
                        cartItems.map((cart, index) => {
                            const {title, price, cartQuatity } = cart
                            return (
                                <div className="cart-product" key={index}>
                                    <h4>Product Name: <span>{title}</span></h4>
                                    <p>Quantity: {cartQuatity}</p>
                                    <p>Unit Price: ${price}</p>
                                    <p>Set Price: ${price * cartQuatity}</p>
                                </div>
                            )
                        })
                    }
                </div>
            </>
        )
      }
    </div>
  )
}
