import React, { useState } from 'react'
import AdminNavBars from '../components/admins/adminNavs/AdminNavBars'
import { Route, Routes } from 'react-router-dom'
import AdminHome from '../components/admins/adminHome/AdminHome'
import AdminAdd from '../components/admins/adminAdd/AdminAdd'
import NavBar from '../components/navBar/NavBar'
import Footer from '../components/footer/Footer'
import AdminViewO from '../components/admins/adminViewO/AdminViewO'
import AdminViewP from '../components/admins/adminViewP/AdminViewP'
import "./Admin.css";
import AdminAddNew from '../components/admins/adminAddNew/AdminAddNew'
import AdminViewArr from '../components/admins/adminViewArr/AdminViewArr'
import AdminAddTre from '../components/admins/adminAddTre/AdminAddTre'
import AdminViewTr from '../components/admins/adminViewTr/AdminViewTr'
import AdminOrderDetails from '../components/admins/adminOrderDetails/AdminOrderDetails'
import AdminReviews from '../components/admins/adminReviews/AdminReviews'
import AdminAddM from '../components/admins/adminAdd/AdminAddM'
import AdminViewPM from '../components/admins/adminViewP/AdminViewPM'
import AdminAddE from '../components/admins/adminAdd/AdminAddE'
import AdminViewPE from '../components/admins/adminViewP/AdminViewPE'
import AdminAddF from '../components/admins/adminAdd/AdminAddF'
import AdminViewPF from '../components/admins/adminViewP/AdminViewPF'
import AdminAddOfe from '../components/admins/adminAdd/AdminAddOfe'
import AdminViewPofe from '../components/admins/adminViewP/AdminViewPofe'
import AdminAddTreF from '../components/admins/adminAddTre/AdminAddTreF'
import AdminViewTrFe from '../components/admins/adminViewTr/AdminViewTrFe'
import { AiOutlineMenuUnfold } from 'react-icons/ai'

export default function Admin() {
  const [adminActives, setadminActives] = useState('navbars');


  const navToggles = () => {
    adminActives === 'navbars' ? setadminActives('navbars navivation') : setadminActives('navbars');
  }


  return (
    <>
      {/* <AdminRouter> */}
        <NavBar />
        <div className='adminss' >
          <div className="admin-dash">
            <div className="admin-toggle" onClick={navToggles}>
              <AiOutlineMenuUnfold fontSize={30} color='#f7921a'/>
              {/* <div className="line1"></div>
              <div className="line2"></div>
              <div className="line3"></div> */}
            </div>
          </div>
          <div className={adminActives}>
            <AdminNavBars />
          </div>
          <div className="contents">
            <Routes>
              <Route path='home' element={<AdminHome/>} />
              <Route path='add-products/:id' element={<AdminAdd/>} />
              <Route path='add-men-products/:id' element={<AdminAddM/>} />
              <Route path='add-electronics-products/:id' element={<AdminAddE/>} />
              <Route path='add-food-products/:id' element={<AdminAddF/>} />
              <Route path='add-offers-products/:id' element={<AdminAddOfe/>} />
              <Route path='add-new-products/:id' element={<AdminAddNew/>} />
              <Route path='add-trending-products/:id' element={<AdminAddTre/>} />
              <Route path='add-featured-products/:id' element={<AdminAddTreF/>} />
              <Route path='orders' element={<AdminViewO/>} />
              <Route path='all-products' element={<AdminViewP/>} />
              <Route path='all-men-products' element={<AdminViewPM/>} />
              <Route path='all-electronics-products' element={<AdminViewPE/>} />
              <Route path='all-food-products' element={<AdminViewPF/>} />
              <Route path='all-offers-products' element={<AdminViewPofe/>} />
              <Route path='all-new-products' element={<AdminViewArr/>} />
              <Route path='all-trending-products' element={<AdminViewTr/>} />
              <Route path='all-featured-products' element={<AdminViewTrFe/>} />
              <Route path='order-details/:id' element={<AdminOrderDetails/>} />
              <Route path='reviews' element={<AdminReviews/>} />
            </Routes> 
          </div>
        </div>
        <Footer />
      {/* </AdminRouter> */}
    </>
  )
}
