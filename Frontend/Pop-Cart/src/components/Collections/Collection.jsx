import React from 'react'
import './Collection.css'
import new_collections from '../../assets/new_collections'
import Item from '../Item/Item'

const Collection = () => {
  return (
    <div className='collection'>
      <h1>New Arrivals</h1>
      <hr />
      <div className='collection-item'>
        {new_collections.map((item, i) => {
          return <Item key={i} id={item.id} des={item.name} image={item.image} new_price={item.new_price} old_price={item.old_price} />
        })}
      </div>
    </div>
  )
}

export default Collection