import React from 'react'
import './Offers.css'
import offers1 from '../../assets/offers11.png'

const Offers = (props) => {
  return (
    <div className='offers'>
        <div className='Box'></div>
        <div className="div-left">
            <img src={props.img} alt="" />
        </div>
        <div className="div-right">
            <h1>{props.h1}</h1>
            <p>{props.p}</p>
            <button>Explore Now</button>
        </div>
        
    </div>
  )
}

export default Offers