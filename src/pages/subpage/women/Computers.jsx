import React, { useEffect, useState } from 'react'
import WomenFeatured from './womenCard/WomenFeatured';
import NavBar from '../../components/navBar/NavBar';
import Footer from '../../components/footer/Footer';
import { useDispatch, useSelector } from 'react-redux';
import useFetchCollection from '../../../customHooks/useFetchCollection';
import { GET_PRICE_RANGE, STORE_PRODUCTS, selectProducts } from '../../../redux/slice/productSlice';


export default function Computers() {
  const {data} = useFetchCollection("electro-products")

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
        Images="./img/stock-photo-1014082096.jpg"
        number={5000}
        pages={"Electronics"}
      />
      <Footer />
    </div>
  )
}
