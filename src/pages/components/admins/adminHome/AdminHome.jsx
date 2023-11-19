import React, { useEffect } from 'react';
import "./AdminHome.css";
import InfoBox from '../../infoBox/InfoBox';
import {AiFillDollarCircle} from "react-icons/ai"
import {BsCart4} from "react-icons/bs"
import { FaCartArrowDown } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { STORE_PRODUCTS, selectProducts } from '../../../../redux/slice/productSlice';
import { CALC_TOTAL_ORDER_AMOUNT, STORE_ORDERS, selectOrderHistory, selectTotalOrderAmount } from '../../../../redux/slice/orderSlice';
import useFetchCollection from '../../../../customHooks/useFetchCollection';
import Charts from '../../charts/Charts';
import BoxShipTotal from '../../boxShipTotal/BoxShipTotal';
import BoxShipTotal1 from '../../boxShipTotal/BoxShipTotal1';
import BoxShipTotal2 from '../../boxShipTotal/BoxShipTotal2';
import { IoNutrition, IoWomanSharp } from 'react-icons/io5';
import { FcBusinessman, FcBusinesswoman } from 'react-icons/fc';
import { MdElectricBolt } from 'react-icons/md';

const earningIcons = <AiFillDollarCircle size={30} color="#b624ff"/>
const womenIcons = <FcBusinesswoman size={30} color="chocolate" />
const manIcons = <FcBusinessman size={30} color="royalblue" />
const electroIcons = <MdElectricBolt size={30} color="crimson" />
const nutrIcons = <IoNutrition size={30} color="rgb(54, 106, 2)" />
const ordersIcons = <FaCartArrowDown size={30} color="orangered" />

export default function AdminHome() {
  const product = useSelector(selectProducts);
  const orders = useSelector(selectOrderHistory);
  const totalOrderAmount = useSelector(selectTotalOrderAmount);

  const fbProducts = useFetchCollection("products");
  const {data} = useFetchCollection("orders");

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(STORE_PRODUCTS({
      products : fbProducts.data,
    }))
    dispatch(STORE_ORDERS(data))
    dispatch(CALC_TOTAL_ORDER_AMOUNT())
  },[dispatch, data, fbProducts])

  return (
    <div className='home'>
      <h2>Admin Home</h2>
      <div className="info-boxa">
        <InfoBox 
          cardClass="info info-earnings"
          title={"Earnings"}
          count={`$${totalOrderAmount}`}
          icon={earningIcons}
        />
        <InfoBox 
          cardClass="info info-products"
          title={"Women Products"}
          count={product.length}
          icon={womenIcons}
        />
        <InfoBox 
          cardClass="info info-products1"
          title={"Men Products"}
          count={<BoxShipTotal />}
          icon={manIcons}
        />
        <InfoBox 
          cardClass="info info-products2"
          title={"Electronic Products"}
          count={<BoxShipTotal1 />}
          icon={electroIcons}
        />
        <InfoBox 
          cardClass="info info-products3"
          title={"Nutrition Products"}
          count={<BoxShipTotal2 />}
          icon={nutrIcons}
        />
        <InfoBox 
          cardClass="info info-orders"
          title={"Orders"}
          count={orders.length}
          icon={ordersIcons}
        />
        {/* <BoxShipTotal /> */}
      </div>
      <div className="chart-box">
        <Charts />
      </div>
    </div>
  )
}
