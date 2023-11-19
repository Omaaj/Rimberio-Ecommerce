import React, { useState } from 'react'
import "./auth.css";
import { Link, useNavigate } from 'react-router-dom';
import { MdEmail } from "react-icons/md";
import { BiSolidLockAlt } from "react-icons/bi";
import { Footers, Google, Nav } from './NavFoot';
import {  toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from '../../fireBase/config';
import Loader from '../components/loader/Loader';
import Helment from '../components/helment/Helment';
import { useSelector } from 'react-redux';
import { selectPreviousUrl } from '../../redux/slice/cartSlice';

export default function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [visible, setVisible] = useState(false);
  

  const navigate = useNavigate();

  const previousUrl = useSelector(selectPreviousUrl);

  const redirectUser = () => {
    if(previousUrl.includes("cart")) {
      return navigate("/cart")
    }else {
      navigate("/")
    }
  }

  const regiserUser = (e) => {
    e.preventDefault();
    if(password !== confirm) {
      toast.error("Password do not match")
      return;
    }
    setIsLoading(true);
    createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
    // Signed up 
      const user = userCredential.user;
      // console.log(user)
      setIsLoading(false)
      toast.success("Registration Succesful");
      navigate("/login")
    })
    .catch((error) => {
      // const errorMessage = error.message;
      toast.error(error.message)
      setIsLoading(false);
     });
  }

  

  return (
    <>
      <Helment title={"Register"}>
        {
          isLoading && <Loader />
        }
        <section className="sectionss">
          <div className="started">
              <Nav />
              <div className="get-started">
                  <div className="getstar">
                      <div className="get-star">
                          <div className="get">Get Started</div>
                      </div>
                      <form onSubmit={regiserUser}>
                          <div className="user">
                              <i className="fa-solid fa-envelope">
                                <MdEmail />
                              </i>
                              <input 
                                type="email" 
                                name="Email" 
                                placeholder="Email" 
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required 
                              />
                          </div>
                          <div className="user">
                              <i className="fa-solid fa-lock">
                                <BiSolidLockAlt />
                              </i>
                              <input 
                                type={visible ? "text" : "password"} 
                                name="password" 
                                placeholder="Password" 
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required 
                              />
                              {password.length > 0 && (
                                <div 
                                  className="showBtn" 
                                  onClick={() => setVisible(!visible)}
                                >
                                  {visible ? "hide" : "show"}
                                </div>
                              )}
                          </div>
                          <div className="user">
                              <i className="fa-solid fa-lock">
                                <BiSolidLockAlt />
                              </i>
                              <input 
                                type={visible ? "text" : "password"} 
                                name="password" 
                                placeholder="Repeat Password" 
                                className="soln" 
                                value={confirm}
                                onChange={(e) => setConfirm(e.target.value)}
                                required 
                              />
                          </div>
                          <input type="submit" value="Create Account" className="btn"  />
                      </form>
                      <div className="already">
                          <span>Already a Member?</span>
                          <Link to="/login" className='already1'>Log In</Link>
                      </div>
                      <Google redirectUser={redirectUser}/>
                  </div>

              </div>
          </div>
      </section>
      </Helment>
    </>
  )
}
