import React, { useEffect, useState } from 'react';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import "./NavBar.css";
import { auth } from '../../../fireBase/config';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { REMOVE_ACTIVE_USER, SET_ACTIVE_USER } from '../../../redux/slice/authSlice';
import { ShowLogin, ShowLogout } from '../hiddenlinks/HiddenLinks';
import { AdminLink } from '../../../components1/adminRu/AdminRouter';
import { CALCULATE_TOTAL_QUANTITY, selectCartTotalQuantity } from '../../../redux/slice/cartSlice';
import { FaUserCircle } from 'react-icons/fa';

export default function NavBar() {
    const [uName, setUName] = useState("");
    const [scrollPage, setScrollPage] = useState(false);
    const [navActives, setNavActives] = useState('link');
    const [navToggle, setNavToggle] = useState("nav-toggle");

    const cartTotalQuantity = useSelector(selectCartTotalQuantity)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(CALCULATE_TOTAL_QUANTITY())
    },[dispatch])


    const navigate = useNavigate();

    const fixNavBar = () => {
        if(window.scrollY > 50) {
            setScrollPage(true)
        }else {
            setScrollPage(false)
        }
    }

    window.addEventListener("scroll", fixNavBar);

    // monitored currently signrd in user;
    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                if(user.displayName === null) {
                    const u1 = user.email.substring(0, user.email.indexOf("@"));
                    const firstN = u1.charAt(0).toUpperCase() + u1.slice(1);
                    setUName(firstN)
                }else {
                    setUName(user.displayName);
                }
                dispatch(SET_ACTIVE_USER({
                    email : user.email,
                    userName : user.displayName ? user.displayName : uName,
                    userId : user.uid 
                }))
            } else {
                setUName("");
                dispatch(REMOVE_ACTIVE_USER())
            }
        });
    },[dispatch, uName]);

    const activeLink = ({isActive}) => {
        return isActive ? "active" : 'active active_links'
    }
    
    const logutUser = () => {
        signOut(auth).then(() => {
            toast.success("Logout Successfully");
            navigate("/")
        })
        .catch((error) => {
            toast.error(error.message);
        });
    }

    const navToggles = () => {
        navActives === 'link' ? setNavActives('link navivation') : setNavActives('link');
        navToggle === "nav-toggle" ? setNavToggle("nav-toggle  toggless") : setNavToggle("nav-toggle")
    }

  return (
    <header className={scrollPage ? "fixed-header" : null}>
        <div className="wrapper">
            <div className="center">
                <Link to="/">
                    <img src="/img/Colorful Illustrative Online Shop Logo.png" alt="logo" />
                </Link>
            </div>
            <div className="right">
                <AdminLink>
                    <Link to="/admin/home">
                        <button className='logout admin'>Admin</button>
                    </Link>
                </AdminLink>
                <div className={navActives}>
                    <ShowLogin>
                        <div className="display_profile">
                            <div className="icons">
                                <FaUserCircle fontSize={30} color='#545353'/>
                            </div>
                            {/* <div className="images">
                                <img src="/img/profile.jpg" alt="" />
                            </div> */}
                            <Link to="/" className='user_name'>
                                {uName}
                            </Link>
                        </div>
                    </ShowLogin>
                    <NavLink className={activeLink} to="/">Home</NavLink>
                    <NavLink className={activeLink} to="/contact">Contact</NavLink>
                    <NavLink className={activeLink} to="/stores">Stores</NavLink>
                    <ShowLogin>
                        <NavLink className={activeLink} to="/order-history">My Orders</NavLink>
                    </ShowLogin>
                    <ShowLogout>
                        <div className="straigh-bot">
                            <Link className='logout' to="/login">Login</Link>

                        </div>
                        {/* <NavLink className={activeLink} to="/register">Register</NavLink> */}
                    </ShowLogout>
                    <ShowLogin>
                        <div className="straigh-bot">
                            <Link onClick={logutUser} className='logout' >Logout</Link>

                        </div>
                    </ShowLogin>
                </div>
                <div className="icons">
                    {/* <div className="icons1">
                        <FavoriteBorderOutlinedIcon sx={{ fontSize: 20, marginRight: 1.5 }}/>
                    </div> */}
                    <Link to="/cart" className="cartIcon" >
                        <ShoppingCartOutlinedIcon sx={{ fontSize: 20,  }}/>
                        <span>{cartTotalQuantity}</span>
                    </Link>
                </div>
                <div className={navToggle} onClick={navToggles}>
                    <div className="line1"></div>
                    <div className="line2"></div>
                    <div className="line3"></div>
                </div>
            </div>
        </div>
    </header>
  )
}
