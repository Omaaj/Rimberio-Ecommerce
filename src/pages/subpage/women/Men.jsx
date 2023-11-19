import React, { useEffect, useState } from 'react'
import WomenFeatured from './womenCard/WomenFeatured';
import NavBar from '../../components/navBar/NavBar';
import Footer from '../../components/footer/Footer';
import { useDispatch, useSelector } from 'react-redux';
import useFetchCollection from '../../../customHooks/useFetchCollection';
import { GET_PRICE_RANGE, STORE_PRODUCTS, selectProducts } from '../../../redux/slice/productSlice';

export default function Men() {
  const {data} = useFetchCollection("men-products")

  const dispatch = useDispatch()

  const products = useSelector(selectProducts)

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
        Images="./img/stock-photo-115165055.jpg"
        number={500}
        pages={"Men_Wears"}
      />
      <Footer />
    </div>
  )
}
