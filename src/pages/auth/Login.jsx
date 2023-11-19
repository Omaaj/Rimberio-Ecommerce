import React, { useState } from 'react';
import "./auth.css";
import { Link, useNavigate } from 'react-router-dom';
import { MdEmail } from "react-icons/md";
import { BiSolidLockAlt } from "react-icons/bi";
import { Footers, Google, Nav } from './NavFoot';
import {  signInWithEmailAndPassword } from "firebase/auth";
import { auth } from '../../fireBase/config';
import { toast } from 'react-toastify';
import Loader from '../components/loader/Loader';
import Helment from '../components/helment/Helment';
import { useSelector } from 'react-redux';
import { selectPreviousUrl } from '../../redux/slice/cartSlice';


export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
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

  const loginUser = (e) => {
    e.preventDefault();
    setIsLoading(true);
    signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // const user = userCredential.user;
      setIsLoading(false);
      toast.success("Login Succesful");
      redirectUser()
    })
    .catch((error) => {
      setIsLoading(false);
      toast.error(error.message);
    });
  }


  return (
    <>
      <Helment title={"Login"}>
          {
            isLoading && <Loader />
          }
          <section className="sectionss">
            <div className="started">
                <Nav />
                <div className="get-started">
                    <div className="getstar">
                        <div className="get-star">
                            <div className="get">Log In</div>
                        </div>
                        <form onSubmit={loginUser}>
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
                            <input type="submit" value="Log In" className="btn bold" />
                        </form>
                        <div className="forget1">
                          <Link 
                            to="/reset" 
                            className="forget"
                          >
                            Forgot Password?
                          </Link>
                        </div>
                        <Google redirectUser={redirectUser}/>
                        <div className="createe">
                            <div className="account">
                              <Link to="/register" className="account1">Create Account</Link>
                            </div>
                            <div className="account">
                              <Link to="/contact" className="account1">Need help?</Link>
                            </div>
                        </div>
                    </div>
                </div>

                {/* <Footers /> */}
            </div>
        </section>
      </Helment>
    </>
  )
}
