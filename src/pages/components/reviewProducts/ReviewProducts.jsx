import React, { useEffect, useState } from 'react'
import NavBar from '../navBar/NavBar'
import Footer from '../footer/Footer';
import "./ReviewProducts.css";
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectProducts } from '../../../redux/slice/productSlice';
import { selectUserId, selectuserName } from '../../../redux/slice/authSlice';
import StarsRating from 'react-star-rate';
import { selectCartItems } from '../../../redux/slice/cartSlice';
import { Timestamp, addDoc, collection, doc, getDoc } from 'firebase/firestore';
import { db } from '../../../fireBase/config';
import { toast } from 'react-toastify';

export default function ReviewProducts() {
  const {id} = useParams();

  const [rate, setRate] = useState(0);
  const [review, setReview] = useState("");
  const [produc, setproduc] = useState(null);

  console.log(produc);

  const userId = useSelector(selectUserId);
  const userName = useSelector(selectuserName);

  const fetchData = async (collectionName, id, setproduc) => {
    const docRef = doc(db, collectionName, id);
    const docSnap = await getDoc(docRef);
  
    if (docSnap.exists()) {
      const obj = {
        id: produc?.id, 
        ...docSnap.data(),
      };
      setproduc(obj);
    } else {
      // toast.error("Product Not Found")
    }
  };
  
  useEffect(() => {
    fetchData('products', id, setproduc);
  },[id])

  // console.log(products)

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
        <div className="container-review">
          <h2>Rate This Product</h2>
          {
            produc === null ? (
              <p>Loading...</p>
            )
            :
            (
              <>
                <div className="rate-product">
                  <p>Product Name: <span>{produc?.title}</span></p>
                </div>
                <img src={produc?.img} alt="" />
              </>
            )
          }
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
              <button type='submit'>Submit Review</button>
            </form>
          </div>
        </div>
      <Footer />
    </>
  )
}
