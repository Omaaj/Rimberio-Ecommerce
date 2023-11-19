import React from 'react'
import { Link } from 'react-router-dom'
import ProductsCard from '../components/productsCard/ProductsCard'
import "./Stores.css";
import ProductPackaged from '../components/productPackaged/ProductPackaged';

export default function FeaturedStored() {
  return (
    <div>
        <div className="classifiedsss">
            <div className="flexs">
                <ProductPackaged />
            </div>
        </div>
    </div>
  )
}
