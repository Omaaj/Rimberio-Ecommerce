import React from 'react';
import "./AdminNavBars.css";
import { FaUserCircle } from "react-icons/fa";
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectuserName } from '../../../../redux/slice/authSlice';

export default function AdminNavBars() {
  const userName = useSelector(selectuserName);

  return (
    <>
      <div className='NavBars'>
        <div className="datas">
          <div className="icons">
            <FaUserCircle/>
          </div>
          <div className="displayName">{userName}</div>
        </div>
        <div className="navs_ad">
          <div className="nav-add-links">
            <NavLink to="/admin/home">Home</NavLink>
            <NavLink to="/admin/all-offers-products">Promo</NavLink>
            <NavLink to="/admin/add-offers-products/ADD">Add promo Product</NavLink>
            <NavLink to="/admin/all-products">All Women Products</NavLink>
            <NavLink to="/admin/add-products/ADD">Add Women Product</NavLink>
            <NavLink to="/admin/all-men-products">All Men Products</NavLink>
            <NavLink to="/admin/add-men-products/ADD">Add Men Product</NavLink>
            <NavLink to="/admin/all-electronics-products">All Electronics Products</NavLink>
            <NavLink to="/admin/add-electronics-products/ADD">Add Electronics Product</NavLink>
            <NavLink to="/admin/all-food-products">All Nutrient Products</NavLink>
            <NavLink to="/admin/add-food-products/ADD">Add Nutrient Product</NavLink>
            <NavLink to="/admin/orders">Orders</NavLink>
            <NavLink to="/admin/reviews">Reviews</NavLink>
            <NavLink to="/admin/all-new-products">All Arrivals Products</NavLink>
            <NavLink to="/admin/add-new-products/ADD">Add New Product</NavLink>
            <NavLink to="/admin/all-trending-products">All Trending Products</NavLink>
            <NavLink to="/admin/add-trending-products/ADD">Add Trending Product</NavLink>
            <NavLink to="/admin/all-featured-products">All Featured Products</NavLink>
            <NavLink to="/admin/add-featured-products/ADD">Add Featured Product</NavLink>
          </div>
        </div>
      </div>
    
    </>
  )
}
