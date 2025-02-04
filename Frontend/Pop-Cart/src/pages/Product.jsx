import React, { useContext } from 'react'
import { ShopContext } from '../Context'
import { useParams } from 'react-router-dom';
import DisplayProduct from '../components/DisplayProduct/DisplayProduct';

const Product = () => {
  const {all_product} = useContext(ShopContext);
  const {productId} = useParams();
  const product = all_product.find((p)=> p.id=== Number(productId))
  console.log(product)

  return (
    <div>
      <DisplayProduct product={ product }/>
    </div>
  )
}

export default Product