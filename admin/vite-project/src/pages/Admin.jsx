import React from 'react'
import './Admin.css'
import Sidebar from '../components/Sidebar/Sidebar'
import { Routes, Route } from 'react-router-dom'
import Addproduct from '../components/Addproduct/Addproduct'
import Showproducts from '../components/Showproducts/Showproducts'

const Admin = () => {
  return (
    <div className='admin'>
        <Sidebar/>
        <Routes>
            <Route path='/addproducts' Component={Addproduct}/>
            <Route path='/showproducts' Component={Showproducts}/>
        </Routes>
    </div>
  )
}

export default Admin