import React, { useState } from 'react';
import "./AdminChangeOrderStatus.css";
import { motion } from 'framer-motion'; 
import { Timestamp, collection, doc, setDoc } from 'firebase/firestore';
import { db } from '../../../../fireBase/config';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

export default function AdminChangeOrderStatus({orders, id}) {
  const [status, setStatus] = useState("");

  const navigate = useNavigate()

  const editOrder = (e, id) => {
    e.preventDefault();
    const orderConfig = {
      userId: orders?.userId,
      userEmail: orders?.userEmail,
      orderDate : orders?.orderDate,
      orderTime : orders?.orderTime,
      orderAmount : orders?.orderAmount,
      orderStatus : status,
      cartItems: orders?.cartItems,
      shippingAddress: orders?.shippingAddress,
      createdAt : orders?.createdAt,
      editedAt : Timestamp.now().toDate()
    }

    try {
      setDoc(doc(db, "orders", id), orderConfig);
      toast.success("Order Status Chaged Succesfully")
      navigate("/admin/orders")
    } catch (error) {
      toast.error(error.message)
    }
  }

  return (
    <>
      <div className="card-statuss">
        <h4>Update Order Status</h4>
        <form onSubmit={(e) => editOrder(e, id)}>
          <span>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
            >
              <option value="" disabled>--Select Current Status--</option>
              <option value="Order Placed...">Order Placed...</option>
              <option value="Processing...">Processing...</option>
              <option value="Shipped...">Shipped...</option>
              <option value="Delivered">Delivered</option>
            </select>
          </span>
          <span>
            <motion.button 
            whileTap={{scale : 0.9}}
            type='submit'>Update Status</motion.button>
          </span>
        </form>
      </div>
    </>
  )
}
