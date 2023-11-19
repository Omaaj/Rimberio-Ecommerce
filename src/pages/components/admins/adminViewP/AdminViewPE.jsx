import React, { useEffect, useState } from 'react';
import "./AdminViewP.css";
import { toast } from 'react-toastify';
import { deleteDoc, doc } from 'firebase/firestore';
import { db, storage } from '../../../../fireBase/config';
import { Link } from 'react-router-dom';
import { FaEdit, FaTrashAlt } from 'react-icons/fa';
import { deleteObject, ref } from 'firebase/storage';
import Notiflix from 'notiflix';
import { useDispatch, useSelector } from 'react-redux';
import { STORE_PRODUCTS, selectProducts } from '../../../../redux/slice/productSlice';
import useFetchCollection from '../../../../customHooks/useFetchCollection';
import Search from '../../search/Search';
import { FILTER_BY_SEARCH, selectFilteredProducts } from '../../../../redux/slice/filterSlice';
import Pagination from '../../pagination/Pagination';

export default function AdminViewPE() {
    const [search, setSearch] = useState("");
    const {data} = useFetchCollection("electro-products")
    const [currentPage, setCurrentPage] = useState(1);
    const [productPerPage, setProductPerPage] = useState(8);
  
    const dispatch = useDispatch()
  
    const products = useSelector(selectProducts);
    const filteredProducts = useSelector(selectFilteredProducts);
  
  
    // Get Current Products
    const indexOfLastProduct = currentPage * productPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productPerPage;
    const currentsProduct = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);
  
    useEffect(() => {
      dispatch(
        STORE_PRODUCTS({
          products : data,
        })
      )
    },[dispatch, data]);
  
    useEffect(() => {
      dispatch(FILTER_BY_SEARCH({data, search }))
    },[dispatch, data, search])
  
  
    const confirmDelete = (id, img) => {
      Notiflix.Confirm.show(
        'Delete Product!!!',
        'You are about to delete this product',
        'Delete',
        'Cancel',
        function okCb() {
          deleteProducts(id, img)
        },
        function cancelCb() {
          console.log("Delete Cancel")
        },
        {
          width: '300px',
          borderRadius: '5px',
          fontSize : "12px",
          titleColor : "orangered",
          okButtonBackground : "orangered",
          cssAnimationStyle : "zoom"
        },
      );
    }
  
    const deleteProducts = async (id, img) => {
      try {
        await deleteDoc(doc(db, "electro-products", id));
        const storageRef = ref(storage, img);
        await deleteObject(storageRef)
        toast.success("Product deleted Suceesfully")
      } catch (error) {
        toast.error(error.message);
      }
    }
  
  
    return (
      <>
        <div className="tablea">
          <h2>All Products</h2>
          <div className="spans">
            <p><span>{filteredProducts.length}</span>Products Found</p>
            <Search 
              value={search} 
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          {
            filteredProducts.length === 0 ? (
              <p>No Products found.</p>
            ) : (
              <div className="bondings">
                <table>
                  <thead>
                    <tr>
                      <th>s/n</th>
                      <th>Image</th>
                      <th>Title</th>
                      <th>Category</th>
                      <th>Price</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  {
                    currentsProduct.map((product, index) => {
                      const {id, title, img, price, cat} = product;
                      return(
                        <tbody key={id}>
                          <tr>
                            <td>
                              {index + 1}
                            </td>
                            <td>
                              <img src={img} alt={title}  />
                            </td>
                            <td>
                              {title}
                            </td>
                            <td>
                              {cat}
                            </td>
                            <td>
                              {`$${price}`}
                            </td>
                            <td>
                              <div className="actionss">
                                <Link className='links_ad' to={`/admin/add-electronics-products/${id}`}>
                                  <FaEdit/>
                                </Link>
                                <div className="iconss">
                                  <FaTrashAlt onClick={() => confirmDelete(id, img)} />
                                </div>
                              </div>
                            </td>
                          </tr>
                        </tbody>
                      )
                    })
                  }
                </table>
              </div>
            )
          }
          <div className="paginatins">
            <Pagination
              currentPage = {currentPage}
              setCurrentPage = {setCurrentPage}
              productPerPage = {productPerPage}
              totalProducts = {filteredProducts.length}
            />
          </div>
        </div>
      </>
    )
}
