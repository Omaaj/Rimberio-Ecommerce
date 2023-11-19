import React from 'react'
import { useParams } from 'react-router-dom'
import { Featured } from '../components/detailed/HomeDetailed';

export default function ProductsDetails() {
  const {id} = useParams();
  const product = Featured.find((item) => item.Title === id);

  console.log(product)
  // const { Img, Title} = product;



  return (
    <div>
      {/* <img src={Img} alt="" /> */}
    </div>
  )
}
