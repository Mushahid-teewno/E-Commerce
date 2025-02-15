import React, { useState } from 'react'
import "./Sidebar.css"
import { Link } from "react-router-dom"
import addproducticon from '../../assets/icon-addproduct.png'
import showproductsicon from '../../assets/icon-showproducts.png'

const Sidebar = () => {
    const [hover,setHover] = useState("hoverOne")
  return (
    <div className='sidebar'>
        <Link to={'/addproducts'} onClick={()=>{setHover("hoverOne")} } className={`${hover ==="hoverOne" ? "active-class" : ""}`} style={{textDecoration: "none"}}>
            <div className='addproduct'>
                <img src={addproducticon} alt="" />
                <p>Add product</p>
            </div>
        </Link>
        <Link to={'/showproducts'} onClick={()=>{setHover("hoverTwo")} } style={{textDecoration: "none"}}>
            <div  className={`${hover=== "hoverTwo" ? "active-class showproducts" : "showproducts"}`}>
                <img src={showproductsicon} alt="" />
                <p>Show  Products</p>
            </div>
        </Link>
    </div>
  )
}

export default Sidebar