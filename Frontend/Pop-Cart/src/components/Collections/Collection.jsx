import React,{useContext} from 'react'
import './Collection.css'
import { ShopContext } from '../../Context'
// import new_collections from '../../assets/new_collections'
import Item from '../Item/Item'

const Collection = () => {

  const { allProducts } = useContext(ShopContext); // Access products from context
  return (
    <div className='collection'>
      <h1>New Arrivals</h1>
      <hr />
      <div className='collection-item'>
      {allProducts.slice(0, 30).map((item, i) => { 
          return <Item key={i} id={item.id} des={item.name} image={item.image} new_price={item.new_price} old_price={item.old_price} />
        })}
      </div>
    </div>
  )
}

export default Collection