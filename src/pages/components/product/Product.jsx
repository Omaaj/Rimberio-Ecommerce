import React, { useCallback, useEffect, useState } from 'react'
import NavBar from '../navBar/NavBar'
import Footer from '../footer/Footer'
import { useParams } from 'react-router-dom'
import { doc, getDoc } from 'firebase/firestore'
import { db } from '../../../fireBase/config'
import { motion } from 'framer-motion'
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import "./Product.css";
import { useDispatch, useSelector } from 'react-redux'
import { selectFilteredProducts } from '../../../redux/slice/filterSlice'
import ProductRelated from '../relatated/ProductRelated'
import { ADD_TO_CART, CALCULATE_TOTAL_QUANTITY, DECREASE_CART, selectCartItems } from '../../../redux/slice/cartSlice'
import StarsRating from 'react-star-rate'
import Helment from '../helment/Helment'



export default function Product() {
    const {id} = useParams()
    const [details, setDetails] = useState(null);
    const [selectedImage, setSelectedImage] = useState(0);

    const dispatch = useDispatch()
  
  

    const filteredProducts = useSelector(selectFilteredProducts);

    const cartItems = useSelector(selectCartItems);

    const cart = cartItems.find((cart) => cart.createdAt.seconds === details?.createdAt.seconds);

    const isCartAdded = cartItems.findIndex((car) => {
      return car.createdAt.seconds === details?.createdAt.seconds
    });

    const images = [
      details?.img,
      details?.bol,
      details?.sun
    ]

    const fetchData = useCallback(async (collectionName, id, setDetails) => {
      const docRef = doc(db, collectionName, id);
      const docSnap = await getDoc(docRef);
  
      if (docSnap.exists()) {
        const obj = {
          id: details?.id,
          ...docSnap.data(),
        };
        setDetails(obj);
      } else {
        // toast.error("Product Not Found")
      }
    }, [details?.id]); 
  
    useEffect(() => {
      fetchData('products', id, setDetails);
      fetchData('men-products', id, setDetails);
      fetchData('electro-products', id, setDetails);
      fetchData('nutrient-products', id, setDetails);
    }, [id, fetchData]); 

    // const fetchData = async (collectionName, id, setDetails) => {
    //   const docRef = doc(db, collectionName, id);
    //   const docSnap = await getDoc(docRef);
    
    //   if (docSnap.exists()) {
    //     const obj = {
    //       id: details?.id, 
    //       ...docSnap.data(),
    //     };
    //     setDetails(obj);
    //   } else {
    //     // toast.error("Product Not Found")
    //   }
    // };
    
    // useEffect(() => {
    //   fetchData('products', id, setDetails);
    //   fetchData('men-products', id, setDetails);
    //   fetchData('electro-products', id, setDetails);
    //   fetchData('nutrient-products', id, setDetails);
    // },[id])

    const related = filteredProducts.filter(item => item.brand === details?.brand)



    const addToCart = (product) => {
      dispatch(ADD_TO_CART(product))
      dispatch(CALCULATE_TOTAL_QUANTITY())
  
    }  

    const decreaseCart = (product) => {
      dispatch(DECREASE_CART(product))
      dispatch(CALCULATE_TOTAL_QUANTITY())
  
    }  

  return (
    <>
      <Helment title={details ? details?.title : '' }>
          <NavBar />
          <div className="wrappers">
          <div className="second1">
              <div className="mainImage">
                {images[selectedImage] ? <img src={images[selectedImage]} alt="selectedImage"/> : null}
              </div>
            </div>
            <div className="first">
              <div className="images">
                <div className="imgbos">
                  {images[0] ? <img src={images[0]} alt="Product" onClick={e => setSelectedImage(0)}/> : null}
                </div>
                <div className="imgbos">
                  {images[1] ? <img src={images[1]} alt="Product" onClick={e => setSelectedImage(1)}/> : null}
                </div>
                <div className="imgbos">
                  {images[2] ? <img src={images[2]} alt="Product" onClick={e => setSelectedImage(2)}/> : null}
                </div>
              </div>
            </div>
            <div className="second">
              <div className="mainImage">
                {images[selectedImage] ? <img src={images[selectedImage]} alt="selectedImage"/> : null}
              </div>
            </div>
            <div className="third">
              {
                details ? (
                  <div className="details">
                    <h2>{details?.title}</h2>
                    <h4>${details?.price}</h4>
                    <p>{details?.description}</p>
                  </div>
                )
                :
                null
              }
              
              <div className="buttons">
                {
                  details ? (
                    <>
                    {
                      isCartAdded < 0 ? null : (
                        <>
                          <motion.button whileTap={{scale : 0.9}} onClick={() => decreaseCart(details)}>-</motion.button>
                          <span>{cart.cartQuatity}</span>
                          <motion.button whileTap={{scale : 0.9}} onClick={() => addToCart(details)}>+</motion.button>

                        </>
                      )
                    }
                    </>
                  )
                  :
                  null
                
                }
              </div>
              {
                details ? (
                  <>
                    <motion.div whileTap={{scale : 0.9}} className="cart">
                      <div className='icons'>
                        <AddShoppingCartIcon sx={{ fontSize: 18,  }}/> 
                      </div>
                      <span onClick={() => addToCart(details)}>ADD TO CART</span>
                    </motion.div>

                  </>
                )
                :
                null
              }
              {/* {
                details ? (
                  <>
                    <div className="adds">
                      <div className="icons">
                        <FavoriteBorderOutlinedIcon sx={{ fontSize: 18,  }} />
                      </div>
                      <span>ADD TO WISHLIST</span>
                    </div>
                  </>
                )
                :
                null
              } */}
              {
                details ? (
                  <>
                    <div className="vendr">
                      <p>Product Type : {details?.cat}</p>
                      <p>Tags : {details?.cat}, {details?.tags}</p>
                    </div>
                  </>
                )
                :
                null
              }
            </div>
          </div>
          <div className="centersss">
            <h2>Product Reviews</h2>
            <div>
              {
                details? (
                  <>
                    <div className='reviews'>
                      <StarsRating value={details?.rate} />
                      <h4>{details?.reviews}</h4>
                      <span>
                        <p>{details?.reviewdate}</p>
                      </span>
                      <span>
                        <p>{details?.username}</p>
                      </span>
                    </div>
                  </>
                )
                :
                (
                  <p>There are no reviews for this product yet</p>
                  
                )
              }
            </div>
          </div>
          <div className="centerss">
            {
              related.length === 0 ? null
              :
              (
                <>
                  <h2>Customers frequently viewed</h2>
                  <div className="flex-dire">
                    <ProductRelated data={related}/>
                  </div>
                </>
              )
            }
            
          </div>
          <Footer />

      </Helment>
    </>
  )
}
