import React from 'react'
import ProductsCard from '../productsCard/ProductsCard'
import "./ProductRelated.css";

export default function ProductRelated({data}) {
    
  return (
    <div className="flexx">
      <div className="flexs">
        {
          data.length === 0 ? (
            <p>No Products Found</p>
          )
          :
          (
          
            data.map((item, index) => {
              return(
                <div key={index} >
                  <div >
                    <ProductsCard {...item} item={item}/>
                  </div>
                </div>
              )
            })
          )
        }
      </div>
    </div>
  )
}
