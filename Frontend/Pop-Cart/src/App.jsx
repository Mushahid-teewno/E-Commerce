import { useState } from 'react'
import './App.css'
import Navbar from './components/Navbar/Navbar'
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import Hero from './components/Hero/Hero'
import Category from './pages/Category'
import Product from './pages/Product'
import Cart from './pages/Cart'
import LoginSignup from './pages/LoginSignup'
import Shop from './pages/Shop'
import Footer from './components/Footer/Footer'
import Scroll from './components/scroll/scroll.jsx/scroll'



function App() {
 

  return (
    <BrowserRouter>
     <Scroll/>
     <Navbar/>
     <Routes>
      <Route path="/" element={<Shop/>} />
      <Route path="/Men" element={<Category banner="Men" category="Men"/>} />
      <Route path="/women" element={<Category banner="Women" category="women" />} />
      <Route path="/kids" element={<Category banner="Kids" category="kids"/>}  />
      <Route path="/product" element={<Product/>}>
        <Route path=':productId' element={<Product/>} />
      </Route> 
      <Route path="/cart" element={<Cart/>} />
      <Route path="/login" element={<LoginSignup/>} />
    </Routes>
    <Footer/>
    </BrowserRouter>
  )
}

export default App
