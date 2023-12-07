import React from 'react';
import "./Footers.css";
import { Link } from 'react-router-dom';
import { AiFillHome, AiFillRightCircle } from 'react-icons/ai';
import { BiSolidMessageDetail } from 'react-icons/bi';
import { IoStorefrontSharp } from 'react-icons/io5';
import { display } from '../productPackaged/ProductArray';

export default function Footers() {
  const date = new Date();
  const year = date.getFullYear();

  const pages = [
    {
      id : 1,
      path : "/",
      element : "Home",
      icon : <AiFillHome/>,
    },
    {
      id : 2,
      path : "/contact",
      element : "Contact Us",
      icon : <BiSolidMessageDetail />,
    },
    {
      id : 3,
      path : "/stores",
      element : "Store",
      icon : <IoStorefrontSharp />,
    },
  ]


  return (
    <footer>
      <div className="footer12">
        <div className="footers">
          <div className="today">
            <div className="today-1">
              <div className="logo-1">
                <div>
                  <Link to='/'>
                    <img src="/img/Colorful Illustrative Online Shop Logo.png" alt="" />
                  </Link>
                </div>
                <div className="crypto">
                  <div className="crypto-1">Shop Smart, Shop Easy<span> Unbeatable Deals Await You!</span></div>
                </div>
              </div>
              <p>At Rimberio, we curate a handpicked selection of the finest product from around the globe. Whether you're seeking the latest fashion trends, cutting-edge gadgets, exquisite home decor, or thoughtful gifts, we have something to delight every taste and preference.</p>
            </div>
            <div className="cobinesd">
              <div className="quick">
                <div className="quick-1">
                  <div className="line">QUICK LINKS</div>
                  <div className="lines"></div>
                </div>
                <div className="home">
                  <ul>
                    {
                      pages.map((page) => {
                        const {id, path, icon, element} = page;
                        return(
                          <li className="firstsss" key={id}>
                            <Link to={path}>
                              <i className="fas fa-circle-chevron-right"><AiFillRightCircle/></i>
                              <span>{element}</span>
                            </Link>
                          </li>
                        )
                      })
                    }
                  </ul>
                </div>
              </div>
              <div className="stay">
                <div className="stay-1">
                  <div className="with">CATEGORIES</div>
                  <div className="dash"></div>
                </div>
                <div className="home">
                  <ul>
                    {
                      display.map((page) => {
                        const {id, path, name} = page;
                        return(
                          <li className="firstsss" key={id}>
                            <Link to={path}>
                              <i className="fas fa-circle-chevron-right"><AiFillRightCircle/></i>
                              <span>{name}</span>
                            </Link>
                          </li>
                        )
                      })
                    }
                  </ul>
                </div>
              </div>
            </div>
          </div>
          <div className="bottom">
            <div className="img_box">
              <img src="/img/Colorful Illustrative Online Shop Logo.png" alt="" />
            </div>
            <div className="copyright">
              <span>&copy; Copyright {year}. All Rights Reserved</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
