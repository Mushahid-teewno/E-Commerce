import React, { useState } from 'react'
import './addproduct.css'
import addphoto_icon from '../../assets/addphoto_iconnn.png'

const Addproduct = () => {
  const [img, setImg] = useState(null)
  const [fieldData, setFieldData] = useState({
    name: "",
    old_price: "",
    new_price: "",
    category: "Men",
    image: ""
  })

  const handleImageChange = (event) => {
    setImg(event.target.files[0]);
  };
  const handleChange = () => {
    setFieldData({ ...fieldData, [event.target.name]: event.target.value })
  }

  const Addproducts = async () => {
    console.log(fieldData);

    const formData = new FormData();
    formData.append('file', img);

    let response;

    await fetch('http://localhost:3000/upload', {
      method: 'POST',
      headers:{
        accept: 'application/json'
      },
      body:formData
    })
    .then(res => res.json())
    .then(res => response =res)
    .catch(err => console.log(err))

    if (response.success)
    {
      fieldData.image = response.imgurl;
    }
  }
  return (
    <div className='addproduct-page'>
      <div className='img-box'>
        <label htmlFor="input-file" className='img-label'>
          <img src={img ? URL.createObjectURL(img) : addphoto_icon} alt="" />
          <input onChange={handleImageChange} type="file" name="file" id="input-file" hidden />
        </label>
      </div>
      <div className='field-box'>
        <div className='field'>
          <p>Product Title</p>
          <input value={fieldData.name} onChange={handleChange} type="text" name="name" placeholder='add name here' />
        </div>
        <div className='prices-div' >
          <div className='field'>
            <p>Old Price</p>
            <input value={fieldData.old_price} onChange={handleChange} type="text" name="old_price" placeholder='add old price' />
          </div>
          <div className='field'>
            <p>New Price</p>
            <input value={fieldData.new_price} onChange={handleChange} type="text" name="new_price" placeholder='add new price' />
          </div>
        </div>

        <div className='field'>
          <p>Select Category</p>
          <select value={fieldData.category} onChange={handleChange} name="category" className='selecttag'>
            <option value="men">Men</option>
            <option value="women">Women</option>
            <option value="kids">Kids</option>
          </select>
        </div>

        <button onClick={() => { Addproducts() }} className='add-btn'>Add Product</button>
      </div>
    </div>
  )
}

export default Addproduct