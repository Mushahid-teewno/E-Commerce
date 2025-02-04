import React from 'react'
import './Popular.css'
import Item from '../Item/Item'
import { Link } from 'react-router-dom'
import data_product from '../../assets/data'

export const Popular = () => {
  return (
    <div className='popular'>
        <h1>Popular in Women</h1>
        <hr />
        <div className='popular-item'>
            {data_product.map((item,i)=>{
              return  <Item key={i} id= {item.id} des = {item.name} image={item.image} new_price={item.new_price} old_price={item.old_price} />
            })}
        </div>
        <div className='View-Collection'>
          <Link style={{textDecoration : "none",color: 'inherit'}} to='/women'><button>View All Collections</button></Link>
          
        </div>
    </div>
  )
}
