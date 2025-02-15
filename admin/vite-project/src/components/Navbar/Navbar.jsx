import React from 'react'
import "./navbar.css"
import profile from "../../assets/Profile.jpg"
import droparrow from "../../assets/dropdown_icon.png"

const Navbar = () => {
  return (
    <div className='navbar'>
        <div className="logo">
            <h1>PopCart</h1>
        </div>
        <div className="profile">
            <img className='profile-pic' src={profile} alt="" />
            <img className='droparrow' src={droparrow} alt="" />

        </div>
    </div>
  )
}

export default Navbar