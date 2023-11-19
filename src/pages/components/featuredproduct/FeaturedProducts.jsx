import React, { useEffect } from 'react';
import "./FeaturedProducts.css";
import ProductList from '../productlist/ProductList';
import FeaturedList from '../featuredList/FeaturedList';
import useFetchCollection from '../../../customHooks/useFetchCollection';
import { useDispatch, useSelector } from 'react-redux';
import { STORE_OFFERS, selectOffers } from '../../../redux/slice/offersSlice';
import { STORE_PRODUCTS, selectProducts } from '../../../redux/slice/productSlice';
import { STORE_ARRIVALS, selectArrivals } from '../../../redux/slice/arrivalSlice';

export default function FeaturedProducts({type}) {
  const {data} = useFetchCollection("new-Products")

  const dispatch = useDispatch()

  const arrival = useSelector(selectArrivals)

  useEffect(() => {
    dispatch(
      STORE_ARRIVALS(data)
    )
  },[dispatch, data])


  return (
    <div className='featuredproducts'>
      <div className="top">
        <h1>{type} products</h1>
      </div>
      <div className='displpw'>
        <FeaturedList data={arrival}/>
      </div>
    </div>
  )
}
