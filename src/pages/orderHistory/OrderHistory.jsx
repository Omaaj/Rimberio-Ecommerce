import React, { useEffect } from 'react';
import "./OrderHistory.css";
import useFetchCollection from '../../customHooks/useFetchCollection';
import NavBar from '../components/navBar/NavBar';
import Footer from '../components/footer/Footer';
import { useDispatch, useSelector } from 'react-redux';
import { STORE_ORDERS, selectOrderHistory } from '../../redux/slice/orderSlice';
import { selectUserId } from '../../redux/slice/authSlice';
import { useNavigate } from 'react-router-dom';
import Helment from '../components/helment/Helment';

export default function OrderHistory() {
  const {data} = useFetchCollection("orders");
  
  const orders = useSelector(selectOrderHistory);
  const userId = useSelector(selectUserId);

  const dispatch = useDispatch();
  const navigate = useNavigate()
  
  useEffect(() => {
    dispatch(STORE_ORDERS(data))
  },[dispatch, data])

  const handleClick = (id) => {
    navigate(`/order-details/${id}`)
  }

  const filterOrders = orders.filter((order) => {
    return order.userId === userId
  })

  return (
    <>
      <Helment  title={"Orders"}>
        <NavBar />
        <div className="tables">
          <h2>Order History</h2>
          <p>Open an order to leave a  <span>Product Review</span> </p>
          {
            filterOrders.length === 0 ? (
              <>
                <p>No Order found</p>
              </>
            )
            :
            (
              <>
              <div className="thtabke">
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
                        filterOrders.map((order, index) => {
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
        <Footer />
      </Helment>
    </>
  )
}
