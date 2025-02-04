import React, { useContext } from 'react'
import './css/category.css'
import { ShopContext } from '../Context'
import Offers from '../components/Offers/Offers'
import offers1 from '../assets/offers1.png'
import Item from '../components/Item/Item'

const Category = (props) => {
   const {all_product} = useContext(ShopContext)
   console.log({all_product})

   const filteredProducts = all_product.filter(item => item.category === props.category);
  
  return (
    <div className='category'>
        {/* <div className="banner">
        {props.banner==='Men'? ( <Offers  img={offers1} h1='Save More with Our Hot Offers!' p='Best choices for men picked by us'/>):null}
        {props.banner==='Women'? ( <Offers img={offers1} h1='Save More with Our Hot Offers!' p='Best choices for women picked by us'/>):null}
        {props.banner==='Kids'? ( <Offers img={offers1} h1='Save More with Our Hot Offers!' p='Best choices for kids picked by us'/>):null}
        </div> */}
        <div className='category-info'>
          <h3>Home/{props.banner}</h3>
          <h1>{props.banner}</h1>
          <h3>Showing all {filteredProducts.length} results </h3>
        </div>
        
        <div className='category-items'>
          
          
              {all_product.map((item,i) => {
           if (props.category===item.category) {
               
               return(  <Item  key={i} id= {item.id} des = {item.name} image={item.image} new_price={item.new_price} old_price={item.old_price}/> )           
           }
           else {
            return null;
           }
           })}
         </div>
        
    </div>
  )
}

export default Category