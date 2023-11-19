import React, { useState } from 'react'
import "./ProductList.css";
import ProductsCard from '../productsCard/ProductsCard';
import Pagination from '../pagination/Pagination';

export default function ProductList({data, filteredProducts}) {
  // Pagination State
  const [currentPage, setCurrentPage] = useState(1);
  const [productPerPage, setProductPerPage] = useState(12);

  // Get Current Products
  const indexOfLastProduct = currentPage * productPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productPerPage;
  const currentsProduct = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);

  return (
    <>
      <div className='flex'>
        {
          data.length === 0 ? (
            <p>Loading...</p>
          )
          :
          (
            currentsProduct.map((item) => {
              return(
                <div key={item.id}>
                  <ProductsCard {...item} item={item}/>
                </div>
              )
            })
          )
        }
      </div>
      <Pagination
        currentPage = {currentPage}
        setCurrentPage = {setCurrentPage}
        productPerPage = {productPerPage}
        totalProducts = {filteredProducts.length}
      />
    </>
  )
}
