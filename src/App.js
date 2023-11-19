import React from 'react'
import { Outlet, RouterProvider, ScrollRestoration, createBrowserRouter } from 'react-router-dom';
import Home from './pages/home/Home';
import Stores from './pages/stores/Stores';
import "./App.css";
import Women from './pages/subpage/women/Women';
import Men from './pages/subpage/women/Men';
import Computers from './pages/subpage/women/Computers';
import Food from './pages/subpage/women/Food';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import Cart from './pages/cart/Cart';
import Reset from './pages/auth/Reset';
import Contact from './pages/contact/Contact';
import Product from './pages/components/product/Product';
import Admin from './pages/admin/Admin';
import AdminRouter from './components1/adminRu/AdminRouter';
import Checkout from './pages/checkout/Checkout';
import CheckoutDetails from './pages/checkout/CheckoutDetails';
import CheckoutSuccess from './pages/checkout/CheckoutSuccess';
import OrderHistory from './pages/orderHistory/OrderHistory';
import OrdersDetailed from './pages/ordersDetailed/OrdersDetailed';
import ReviewProducts from './pages/components/reviewProducts/ReviewProducts';
import NotFound from './pages/notFound/NotFound';
import Payments from './pages/payments/Payments';


const Layouts = () => {
  return(
    <div className='app'>
      <ScrollRestoration />
      <Outlet/>
    </div>
  )
}

const router = createBrowserRouter([
  {
    path : '/',
    element : <Layouts/>,
    children : [
      {
        path : "/",
        element : <Home/>
      },
      {
          path : "/stores",
          element : <Stores/>
        },
        {
          path : "/login",
          element : <Login/>
        },
        {
          path : "/register",
          element : <Register/>
        },
        {
          path : "/reset",
          element : <Reset/>
        },
        {
          path : "/contact",
          element : <Contact/>
        },
        {
          path : "/cart",
          element : <Cart/>
        },
        {
          path : "/checkout-details",
          element : <CheckoutDetails/>
        },
        {
          path : "/checkout",
          element : <Checkout/>
        },
        {
          path : "/checkout-payments",
          element : <Payments/>
        },
        {
          path : "/checkout-success",
          element : <CheckoutSuccess/>
        },
        {
          path : "/order-history",
          element : <OrderHistory/>
        },
        {
          path : "/order-details/:id",
          element : <OrdersDetailed/>
        },
        {
          path : "/review-product/:id",
          element : <ReviewProducts/>
        },
        {
          path : "/admin/*",
          element :<AdminRouter><Admin /></AdminRouter> 
        },
        {
          path : "/shop/:id",
          element : <Product />
        },
      {
        path : "/menWears",
        element : <Men/>
      },
      {
        path : "/electronics",
        element : <Computers/>
      },
      {
        path : "/nourishment",
        element : <Food/>
      },
      {
        path : "/womenWears",
        element : <Women/>
      },
      {
        path : "*",
        element : <NotFound/>
      },
    ]
  }
  
])

export default function App() {
  return (
    <div>
      <RouterProvider router={router} />
    </div>
  )
}
