import React , { useContext}from 'react'
import { ShopContext } from '../../Context'
import './Popular.css'
import Item from '../Item/Item'
import { Link } from 'react-router-dom'
// import { useContext } from 'react'
// import data_product from '../../assets/data'

export const Popular = () => {

  const {allProducts} = useContext(ShopContext);

  return (
    <div className='popular'>
        <h1>Popular in Women</h1>
        <hr />
        <div className='popular-item'>
            {allProducts.map((item,i)=>{
              if (item.category==='women') {
                return  <Item key={i} id= {item.id} des = {item.name} image={item.image} new_price={item.new_price} old_price={item.old_price} />
              }
              
            })}
        </div>
        <div className='View-Collection'>
          <Link style={{textDecoration : "none",color: 'inherit'}} to='/women'><button>View All Collections</button></Link>
          
        </div>
    </div>
  )
}
