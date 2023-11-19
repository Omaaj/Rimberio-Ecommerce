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

  const dipatch = [
    {
      productId : "Hr5HKd1B4JnNLo2T9zDj",
      img : "",
      price : 346,
      oldPrice : 0,
      title : "Lola Rose Dainty Women's Wrist Watch"
    },
    {
      productId : "mdowjZbLOwmBXKJgEyg6",
      img : "",
      price : 340,
      oldPrice : 430,
      title : "Berliner Bags Vintage Leather"
    },
    {
      productId : "6RC3FDCWwfaKaeyND5LT",
      img : "",
      price : 1900,
      oldPrice : 2200,
      title : "SAMSUNG 14 Galaxy Book3"
    },
    {
      productId : "UM4Br9OEs5lcEybp27HX",
      img : "",
      price : 559,
      oldPrice : 0,
      title : "KitchenAid RRK150IC"
    },
    {
      productId : "v4bVit86ndKPBWRmN4ZB",
      img : "",
      price : 138,
      oldPrice : 0,
      title : "JLO BEAUTY      "
    },
  ]


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
