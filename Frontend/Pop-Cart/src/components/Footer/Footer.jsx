import React from 'react'
import './Footer.css'
import logo from '../../assets/logo.png' 
import whatsapp from '../../assets/whatsapp_icon.png' 
import instagram from '../../assets/instagram_icon.png' 
import pinterest from '../../assets/pinterest_icon.png' 
const Footer = () => {
  return (
    <>
    <div className='footer'>
        <div className='logo'>
            {/* <img src={logo} alt="" /> */}
            <h1>Pop Cart</h1>
        </div>
        <div className='links'>
            
            <h2>Address</h2>
            <p>Phone:03111111111</p>
            <p>Email:email@gmail.com</p>
            <p>Adress:Albuquerque,New mexico</p>
                
        </div>
        <div className='links'>
                <h2>Menu</h2>
                <ul>
                    
                    <li>Products</li>
                    <li>About</li>
                    <li>Contact</li>
                </ul>
                
        </div>
        <div className="socials">
            <h2>Social Media</h2>
            <img src={whatsapp} alt="" />
            <img src={instagram} alt="" />
            <img src={pinterest} alt="" />
        </div>
    </div>
    <hr />
    <div className='terms'>
        <p>© 2024 all rights reserved</p>
        <div>
        <p>Terms of service</p>
        <p>Privacy policy</p>
        </div>
    </div>
    </>
  )
}

export default Footer