import React from 'react'
import NavBar from '../components/navBar/NavBar'
import Footer from '../components/footer/Footer'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import Helment from '../components/helment/Helment'

export default function CheckoutSuccess() {
  return (
    <div>
      <Helment title={"Checkout Success"}>
        <NavBar/>
        <div className="container-sucess">
          <div className='center-succes'>
            <h2>Processing Payment...</h2>
            <p>Thank You for your purchase</p>
            <Link to="/order-history">
              <motion.button whileTap={{scale : 0.9}}>View Order Status</motion.button>
            </Link>
          </div>
        </div>
        <Footer />

      </Helment>
    </div>
  )
}
