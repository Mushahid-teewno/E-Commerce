import React from 'react'
import './Item.css'
import { Link } from 'react-router-dom'

const Item = (props) => {
  return (
    <div className="Item-Outer">
      <div className='item'>
        <img src={props.image} alt="" />
        <p>{props.des}</p>
        <div className="item-price">
          <div className="item-price-new">
            ${props.new_price}
          </div>
          <div className="item-price-old">
            ${props.old_price}
          </div>
          <div className='Order'>
          <Link to={`/product/${props.id}`}> <button>Order</button></Link>
          </div>
        </div>
      </div>
      </div>  
  )
}

export default Item