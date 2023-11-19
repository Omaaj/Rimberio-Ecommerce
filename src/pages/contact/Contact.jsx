import React, { useRef } from 'react';
import emailjs from '@emailjs/browser';
import NavBar from '../components/navBar/NavBar'
import Footer from '../components/footer/Footer'
import "./Contact.css";
import { toast } from 'react-toastify';
import Helment from '../components/helment/Helment';

export default function Contact() {
  const form = useRef();


  const sendEmail = (e) => {
    e.preventDefault();

    emailjs.sendForm(process.env.REACT_APP_SERVICE_ID, 'template_yq7que6', form.current, 'fW6dYxB1XoxEvpBJD')
      .then((result) => {
        toast.success("Message Sent Successfully");
      }, (error) => {
          toast.error(error.text);
      });
      e.target.reset();
  };


  return (
    <div>
      <Helment title={"Contact Us"}>

        <NavBar />
        <div className='contact_container'>
          <div className='contant'>
              <h2># Contact Us</h2>
              <div className='form'>
                  <form ref={form} onSubmit={sendEmail}>
                    <input 
                      type='text' 
                      name="user_name" 
                      placeholder='Enter your Full Name' 
                      required 
                      
                    />
                    <input 
                      type='email' 
                      name="user_email" 
                      placeholder='Enter your E-mail' 
                      required 
                      
                    />
                    <input 
                      type='text' 
                      name="subject" 
                      placeholder='Enter your Subject' 
                      required 
                      
                    />
                    <textarea 
                      name='message' 
                      placeholder='Your Message' 
                      required 
                    />
                    <button type='submit'>Send</button>
                  </form>
              </div>
          </div>
        </div>
        <Footer />
      </Helment>
    </div>
  )
}
