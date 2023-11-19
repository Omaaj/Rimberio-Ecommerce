import React, { useState } from 'react'
import { Nav } from './NavFoot'
import { Link } from 'react-router-dom';
import { MdEmail } from "react-icons/md";
import { sendPasswordResetEmail } from 'firebase/auth';
import { auth } from '../../fireBase/config';
import { toast } from 'react-toastify';
import Helment from '../components/helment/Helment';

export default function Reset() {
  const [email, setEmail] = useState('');
  
  const resetPassword = (e) => {
    e.preventDefault();
    sendPasswordResetEmail(auth, email)
    .then(() => {
      toast.success("Check Your email for password reset")
    })
    .catch((error) => {
      toast.error(error.message);
    });
  }

  return (
    <>
      <Helment title={"Reset"}>
          <section className="sectionss">
            <div className="started">
                <Nav />
                <div className="get-started">
                    <div className="getstar">
                        <div className="get-star">
                            <div className="get">Password Reset</div>
                        </div>
                        <form onSubmit={resetPassword}>
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
                            <input type="submit" value="SUBMIT" className="btn bold" />
                        </form>
                        <div className="createe">
                            <div className="account">
                              <Link to="/login" className="account1">Log in</Link>
                            </div>
                            <div className="account">
                              <Link to="/contact" className="account1">Need help?</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
      </Helment>
    </>
  )
}
