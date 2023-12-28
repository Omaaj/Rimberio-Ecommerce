import React, { useEffect } from 'react';
import "./Trending.css";
import ProductList from '../productlist/ProductList';
import FeaturedList from '../featuredList/FeaturedList';
import useFetchCollection from '../../../customHooks/useFetchCollection';
import { useDispatch, useSelector } from 'react-redux';
import { STORE_OFFERS, selectOffers } from '../../../redux/slice/offersSlice';
import { STORE_PRODUCTS, selectProducts } from '../../../redux/slice/productSlice';
import { STORE_ARRIVALS, selectArrivals } from '../../../redux/slice/arrivalSlice';
import { STORE_TRENDINGS, selectTrendings } from '../../../redux/slice/trendingSlice';

export default function Trending({type}) {
  const {data} = useFetchCollection("trending-products")

  const dispatch = useDispatch()

  const trending = useSelector(selectTrendings)

  useEffect(() => {
    dispatch(
      STORE_TRENDINGS(data)
    )
  },[dispatch, data])


  return (
    <div className='featuredproducts'>
      <div className="top">
        <h1>{type} products</h1>
      </div>
      <div className='displpw'>
        <FeaturedList data={trending}/>
      </div>
    </div>
  )
}
