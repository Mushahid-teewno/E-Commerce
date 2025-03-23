import React, { useState, useEffect } from 'react'
import '../Showproducts/Showproducts.css'
import removeicon from '../../assets/removeicon.png'

const Showproducts = () => {

  const [products, setProducts] = useState([])

  const getproducts = async () => {

    await fetch('http://localhost:3000/showproducts',)
      .then(res => res.json())
      .then(res => {
        setProducts(res)
      console.log(res)})
      .catch(err => console.log(err))


    
  }
  useEffect(() => {
    getproducts();
   
  }, []);

  const removeProduct = async (product) =>{
    await fetch ('http://localhost:3000/removeproduct',{
      method: 'POST',
      headers:{
        accept: 'application/json',
         'content-type':'application/json'
      },
      body:JSON.stringify(product)
    })
    await getproducts();
  }

  return (
    <div className='allproducts-list'>
      <h1>All products list</h1>
      <div className='products-heading'>
        <p>Image</p>
        <p>Name</p>
        <p>About</p>
        <p>Old Price</p>
        <p>New Price</p>
        <p>Category</p>
        <p>Remove</p>
      </div>
      <hr />
      
        {products.map((product) =>(
          <div className='products'>
            <img className='product-image' src={product.image} alt="" />
            <h4>{product.name}</h4>
            <h4>{product.about}</h4>
            <p>${product.old_price}</p>
            <p>${product.new_price}</p>
            <p>{product.category}</p>
            <img onClick={() => removeProduct(product)} className='rmv-icon'  src={removeicon} alt="" />
          </div>
          
        ))}
     
      

    </div>
  )
}

export default Showproducts