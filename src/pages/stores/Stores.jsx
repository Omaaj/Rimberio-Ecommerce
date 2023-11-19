import React from 'react';
import "./Stores.css";
import NavBar from '../components/navBar/NavBar';
import Footer from '../components/footer/Footer';
import Helment from '../components/helment/Helment';
import FeaturedStored from './FeaturedStored';

export default function Stores() {

  return (
    <>
        <Helment title={"Stores"}>
            <NavBar />
            <div className='stores'>
                <div className="second3">
                    <div className="image_box">
                        <img src="./img/stock-photo-1069254700.jpg" alt="background" />
                    </div>
                </div>
                <div className="second">
                    <div className="wrapper">
                        <div className="categories">
                            <FeaturedStored />
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </Helment>
    </>
  )
}
