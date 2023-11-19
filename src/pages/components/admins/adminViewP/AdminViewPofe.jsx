import React, { useEffect } from 'react';
import "./AdminViewP.css";
import { toast } from 'react-toastify';
import {  deleteDoc, doc, } from 'firebase/firestore';
import { db, storage } from '../../../../fireBase/config';
import { Link } from 'react-router-dom';
import { FaEdit, FaTrashAlt } from 'react-icons/fa';
import { deleteObject, ref } from 'firebase/storage';
import Notiflix from 'notiflix';
import { useDispatch, useSelector } from 'react-redux';
import { STORE_PRODUCTS, selectProducts } from '../../../../redux/slice/productSlice';
import useFetchCollection from '../../../../customHooks/useFetchCollection';
import { STORE_OFFERS, selectOffers } from '../../../../redux/slice/offersSlice';

export default function AdminViewPofe() {
    const {data} = useFetchCollection("offer-Products")

    const offers = useSelector(selectOffers);

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(STORE_OFFERS(data))
    },[dispatch, data]);


  // const dispatch = useDispatch()

  // const products = useSelector(selectProducts)

  // useEffect(() => {
  //   dispatch(
  //     STORE_PRODUCTS({
  //       products : data,
  //     })
  //   )
  // },[dispatch, data])
  


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
      await deleteDoc(doc(db, "offer-Products", id));
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
        <h2>All Offers Products</h2>
        {
          offers.length === 0 ? (
            <p>No Products found.</p>
          ) : (
            <div className="bondings">
              <table>
                <thead>
                  <tr>
                    <th>s/n</th>
                    <th>Image</th>
                    <th>Title</th>
                    <th>StartTime</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                {
                  offers.map((product, index) => {
                    const {id, name, img, startTime} = product;
                    return(
                      <tbody key={id}>
                        <tr>
                          <td>
                            {index + 1}
                          </td>
                          <td>
                            <img src={img} alt={name}  />
                          </td>
                          <td>
                            {name}
                          </td>
                          <td>
                            {startTime}
                          </td>
                          <td>
                            <div className="actionss">
                              <Link className='links_ad' to={`/admin/add-offers-products/${id}`}>
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
      </div>
    </>
  )
}
