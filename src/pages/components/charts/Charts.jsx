import React from 'react';
import "./Charts.css";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { useSelector } from 'react-redux';
import { selectOrderHistory } from '../../../redux/slice/orderSlice';
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);
export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top',
    },
    title: {
      display: false,
      text: 'Chart.js Bar Chart',
    },
  },
};


export default function Charts() {
  const orders = useSelector(selectOrderHistory);

  // Create a new Array of order Status
  const array = [];
  orders.map((item) => {
    const {orderStatus} = item;
    array.push(orderStatus);
  })

  const getOrderCount = (arr, value) => {
    return arr.filter((n) => n === value).length
  }

  const [q1, q2, q3, q4] = ["Processing...", "Shipped...", "Order Placed...", "Delivered"]

  const placed = getOrderCount(array, q3);
  const processing = getOrderCount(array, q1);
  const shipped = getOrderCount(array, q2);
  const delivered = getOrderCount(array, q4);

  const data = {
    labels: ["Orders Placed", "Processing", "Shipped", "Delivered"],
    datasets: [
      {
        label: 'Order Count',
        data: [placed, processing, shipped, delivered],
        backgroundColor: 'rgba(13, 104, 189, 0.4)',
      },
    ],
  };
  return (
    <div className='card-chart'>
      <h3>Order Status Chart</h3>
      <Bar options={options} data={data} />
    </div>
  )
}
