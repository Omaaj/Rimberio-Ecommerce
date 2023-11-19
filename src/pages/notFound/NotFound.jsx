import React from 'react'
import NavBar from '../components/navBar/NavBar'
import Footer from '../components/footer/Footer'
import { Link } from 'react-router-dom';
import "./NotFound.css";

export default function NotFound() {
  return (
    <div>
        <NavBar />
         <div className="not-found">
            <div className="details">
                <h2>404</h2>
                <p>Opps!!! page not found</p>
                <Link to="/"><button>Back To Home</button></Link>

            </div>
         </div>
        <Footer />
    </div>
  )
}
