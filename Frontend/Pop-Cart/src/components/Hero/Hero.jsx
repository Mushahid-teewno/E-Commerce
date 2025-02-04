import React from 'react'
import './Hero.css'
import hero_img from '../../assets/hero_img1.png'

const Hero = () => {
  return (
    <div className='hero'>
        <div className='hero-text'>
            <h1>Trendy Styles, Unbeatable Prices</h1>
            <h3>Upgrade your wardrobe with our exclusive collections. Shop now!</h3>
            <button>Explore Collections!</button>
        </div>
        <div className="hero-img">
            <img src={hero_img} alt="" />
        </div>
    </div>
  )
}

export default Hero