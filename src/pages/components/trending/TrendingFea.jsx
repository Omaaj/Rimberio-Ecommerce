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
import { STORE_FEATURED, selectFeatured } from '../../../redux/slice/featuredSlice';


export default function TrendingFea({type}) {
    const {data} = useFetchCollection("featued-products")

    const dispatch = useDispatch()
  
    const featured = useSelector(selectFeatured)
  
    useEffect(() => {
      dispatch(
        STORE_FEATURED(data)
      )
    },[dispatch, data])
  
    const dipatch = [
      {
        productId : "6W8InLwuR9IXWWN2WxfD",
        img : "",
        price : 112,
        oldPrice : 0,
        title : "Bankeng Women Winter Wool"
      },
      {
        productId : "0VTlLy39QaHmrEIOzefJ",
        img : "",
        price : 138,
        oldPrice : 0,
        title : "Smash V2 Sneaker        "
      },
      {
        productId : "i9OlvkEcap7LfbXSbXaH",
        img : "",
        price : 360,
        oldPrice : 400,
        title : "JBL Charge 5 Portable"
      },
      {
        productId : "XntrkqndXBZe6wKiXkaS",
        img : "",
        price : 30,
        oldPrice : 0,
        title : "PLANTERS"
      },
      {
        productId : "1TtD6bb7a4rMYWDeqdv2",
        img : "",
        price : 110,
        oldPrice : 0,
        title : "Sweepulire Electric Spin Scrubber     "
      },
    ]
  
  
    return (
      <div className='featuredproducts'>
        <div className="top">
          <h1>{type} products</h1>
        </div>
        <div className='displpw'>
          <FeaturedList data={featured}/>
        </div>
      </div>
    )
}
