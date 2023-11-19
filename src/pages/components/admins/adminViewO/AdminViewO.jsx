import React, { useEffect } from 'react';
import "./AdminViewO.css";
import useFetchCollection from '../../../../customHooks/useFetchCollection';
import { useDispatch, useSelector } from 'react-redux';
import { STORE_ORDERS, selectOrderHistory } from '../../../../redux/slice/orderSlice';
import { useNavigate } from 'react-router-dom';

export default function AdminViewO() {
  const {data} = useFetchCollection("orders");
  
  const orders = useSelector(selectOrderHistory);

  const dispatch = useDispatch();
  const navigate = useNavigate()
  
  useEffect(() => {
    dispatch(STORE_ORDERS(data))
  },[dispatch, data])

  const handleClick = (id) => {
    navigate(`/admin/order-details/${id}`)
  }

  return (
    <>
      <div className="tablea">
        <h2>ALL Order History</h2>
        <p>Open an order to change <span>Order Status</span> </p>
        {
          orders.length === 0 ? (
            <>
              <p>No Order found</p>
            </>
          )
          :
          (
            <>
              <div className="bondings">
                <table>
                  <thead>
                    <tr>
                      <th>s/n</th>
                      <th>Date</th>
                      <th>Order ID</th>
                      <th>Order Amount</th>
                      <th>Order Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {
                      orders.map((order, index) => {
                        const { id, orderDate, orderTime, orderAmount, orderStatus} = order;
                        return(
                          <tr key={id} onClick={() => handleClick(id)}>
                            <td>
                              {index + 1}
                            </td>
                            <td>
                              {orderDate} at {orderTime}
                            </td>
                            <td>
                              {id}
                            </td>
                            <td>
                              {`$${orderAmount}`}
                            </td>
                            <td>
                              <div className={orderStatus !== "Delivered" ? "pending" : "delivered"}>
                                {orderStatus}
                              </div>
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
      </div>
    </>
  )
}
