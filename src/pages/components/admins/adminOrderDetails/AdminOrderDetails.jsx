import React, { useEffect, useState } from 'react'
import "./AdminOrderDetails.css";
import { Link, useParams } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../../../fireBase/config';
import AdminChangeOrderStatus from '../adminChangeOrderStatus/AdminChangeOrderStatus';

export default function AdminOrderDetails() {
    const {id} = useParams();
    const [orders, setOrders] = useState(null);
  
    const fetchData = async (collectionName, id, setOrders) => {
      const docRef = doc(db, collectionName, id);
      const docSnap = await getDoc(docRef);
    
      if (docSnap.exists()) {
        const obj = {
          id: id, 
          ...docSnap.data(),
        };
        setOrders(obj);
      } else {
        // toast.error("Product Not Found")
      }
    };
    
    useEffect(() => {
      fetchData('orders', id, setOrders);
    },[id])
  
    return (
      <>
        <div className="tablea">
          <h2>Orders Details</h2>
          <div>
            <Link to="/admin/orders" className='links'>&larr; Back To Orders</Link>
          </div>
          {
            orders?.length === null ? (
            // orders?.length === null ? (
              <>
                <p>No Order found</p>
              </>
            )
            :
            (
              <>
                <div className="detaisls">
                  <p>Order ID: <span>{orders?.id}</span></p>
                  <p>Order Amount: <span>${orders?.orderAmount}</span></p>
                  <p>Order Status: <span>{orders?.orderStatus}</span></p>
                  <p>Name: <span>{orders?.shippingAddress.name}</span></p>
                  <p>Email: <span>{orders?.userEmail}</span></p>
                  <p>Phone Number: <span>{orders?.shippingAddress.phone}</span></p>
                  <p>Shipping Address: 
                    <br />
                    Address: <span>{orders?.shippingAddress.line1}, {orders?.shippingAddress.line2}, {orders?.shippingAddress.city}</span>
                    <br />
                    State: <span>{orders?.shippingAddress.state}</span>
                    <br />
                    Country: <span>{orders?.shippingAddress.country}</span>
                    </p>
                </div>
                <div className="bondings">
                  <table>
                    <thead>
                      <tr>
                        <th>s/n</th>
                        <th>Product</th>
                        <th>Title</th>
                        <th>Price</th>
                        <th>Quantity</th>
                        <th>Total</th>
                      </tr>
                    </thead>
                    <tbody>
                      {
                        orders?.cartItems.map((order, index) => {
                          const { cartQuatity, img, price, title} = order;
                          return(
                            <tr key={index}>
                              <td>
                                {index + 1}
                              </td>
                              <td>
                                <img src={img} alt="" />
                              </td>
                              <td>
                                {title}
                              </td>
                              <td>
                                {`$${price}`}
                              </td>
                              <td>
                                {cartQuatity}
                              </td>
                              <td>
                                {`$${(price * cartQuatity).toFixed(2)}`}
                              </td>
                            </tr>
                          )
                        })
                      }
                    </tbody>
                  </table>

                </div>

              </>
            )
          }
          <AdminChangeOrderStatus
            orders={orders}
            id={id}
          />
        </div>
      </>
    )
}
