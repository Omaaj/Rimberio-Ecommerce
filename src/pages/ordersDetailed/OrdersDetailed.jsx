import React, { useEffect, useState } from 'react'
import NavBar from '../components/navBar/NavBar'
import Footer from '../components/footer/Footer'
import { Link, useParams } from 'react-router-dom'
import { Timestamp, addDoc, collection, doc, getDoc } from 'firebase/firestore';
import { db } from '../../fireBase/config';
import { motion } from 'framer-motion';
import "./OrdersDetailed.css";
import StarsRating from 'react-star-rate';
import { selectUserId, selectuserName } from '../../redux/slice/authSlice';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';

export default function OrdersDetailed() {
  const {id} = useParams();
  const [orders, setOrders] = useState(null);
  const [rate, setRate] = useState(0);
  const [review, setReview] = useState("");
  const [productss, setProductss] = useState(null);


  const userId = useSelector(selectUserId);
  const userName = useSelector(selectuserName);

  const fetchData = async (collectionName, id, setOrders) => {
    const docRef = doc(db, collectionName, id);
    const docSnap = await getDoc(docRef);
  
    if (docSnap.exists()) {
      const obj = {
        id: id, 
        ...docSnap.data(),
      };
      setOrders(obj);
    } else {
      // toast.error("Product Not Found")
    }
  };
  
  useEffect(() => {
    fetchData('orders', id, setOrders);
  },[id])

  const fetchProduct = async (collectionName, id, setProductss) => {
    const docRef = doc(db, collectionName, id);
    const docSnap = await getDoc(docRef);
  
    if (docSnap.exists()) {
      const obj = {
        id: id, 
        ...docSnap.data(),
      };
      setProductss(obj);
    } else {
      // toast.error("Product Not Found")
    }
  };
  
  useEffect(() => {
    fetchProduct('products', id, setProductss);
  },[id])

  const submitReview = (e) => {
    e.preventDefault()
    const today = new Date();
    const date = today.toDateString();
    const reviewConfig = {
      userId,
      userName,
      productID : id,
      rate,
      review,
      reviewDate : date,
      createdAt : Timestamp.now().toDate()
    }

    try {
      addDoc(collection(db, "reviews"), reviewConfig);
      toast.success("Thank you for your Review")
      setRate(0)
      setReview("")
    } catch (error) {
      toast.error(error.message)
    }
  }



  return (
    <>
      <NavBar />
      <div className="table">
        <h2>Order Details</h2>
        <div>
          <Link to="/order-history" className='links'>&larr; Back To Orders</Link>
        </div>
        {
          orders?.length === null ? (
            <>
              <p>No Order found</p>
            </>
          )
          :
          (
            <>
              <div className="detaisls">
                <p>Order ID: <span>{orders?.id}</span></p>
                <p>Order Amount: <span>${orders?.orderAmount}</span></p>
                <p>Order Status: <span>{orders?.orderStatus}</span></p>
              </div>
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
                      {/* <th>Actions</th> */}
                    </tr>
                  </thead>
                  <tbody>
                    {
                      orders?.cartItems.map((order, index) => {
                        const { cartQuatity, img, price, title} = order;
                        return(
                          <tr key={index}>
                            <td>
                              {index + 1}
                            </td>
                            <td>
                              <img src={img} alt="" />
                            </td>
                            <td>
                              {title}
                            </td>
                            <td>
                              {`$${price}`}
                            </td>
                            <td>
                              {cartQuatity}
                            </td>
                            <td>
                              {`$${(price * cartQuatity).toFixed(2)}`}
                            </td>
                            {/* <td>
                              <div className="summarybtn">
                              <Link to={`/review-product/${order.createdAt.seconds}`}><motion.button whileTap={{scale : 0.9}}  className='btn'>Review Product </motion.button></Link>
                              </div>
                            </td> */}
                          </tr>
                        )
                      })
                    }
                  </tbody>
                </table>
              </div>
              <div className="container-review">
              <h2>Rate This Product</h2>
              {/* <div className="rate-product">
                <p>Product Name: <span>{productss?.title}</span></p>
              </div> */}
              <img src={productss?.img} alt="" />
              <div className="card-review">
                <form onSubmit={(e) => submitReview(e)}>
                  <label>Rating:</label>
                  <div>
                    <StarsRating
                      value={rate}
                      onChange={rate => {
                        setRate(rate);
                      }}
                    />
                  </div>
                  <label>Review:</label>
                  <textarea 
                    value={review}
                    onChange={(e) => setReview(e.target.value)}
                    required
                  ></textarea>
                  <motion.button 
                    type='submit'
                    whileTap={{scale : 0.9}}
                    >Submit Review</motion.button>
                </form>
              </div>
            </div>
            </>
          )
        }
      </div>
      <Footer />
    </>
  )
}
