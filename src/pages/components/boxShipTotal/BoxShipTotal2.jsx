import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { STORE_PRODUCTS, selectProducts } from '../../../redux/slice/productSlice';
import useFetchCollection from '../../../customHooks/useFetchCollection';


export default function BoxShipTotal2() {
    const {data} = useFetchCollection("nutrient-products");

    const dispatch = useDispatch()
  
    useEffect(() => {
      dispatch(STORE_PRODUCTS({
        products : data,
      }))
    },[dispatch, data])
    return (
      <div>
        {data.length}
      </div>
    )
}
