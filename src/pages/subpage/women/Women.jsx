import React, { useEffect, useState } from 'react'
import WomenFeatured from './womenCard/WomenFeatured';
import NavBar from '../../components/navBar/NavBar';
import Footer from '../../components/footer/Footer';
import { Featured } from '../../components/detailed/HomeDetailed';
import { useDispatch, useSelector } from 'react-redux';
import useFetchCollection from '../../../customHooks/useFetchCollection';
import { GET_PRICE_RANGE, STORE_PRODUCTS, selectMaxPrice, selectProducts } from '../../../redux/slice/productSlice';

export default function Women() {
  const {data} = useFetchCollection("products")

  const dispatch = useDispatch()

  const products = useSelector(selectProducts)
  const maxPrice = useSelector(selectMaxPrice);

  useEffect(() => {
    dispatch(
      STORE_PRODUCTS({
        products : data,
      })
    )
    dispatch(
      GET_PRICE_RANGE({
        products : data
      })
    )
  },[dispatch, data])


  return (
    <div>
      <NavBar />
      <WomenFeatured
        data={products}
        Images="./img/stock-photo-118747891.jpg"
        number={500}
        pages={"Women_Wears"}
      />
      <Footer />
    </div>
  )
}
