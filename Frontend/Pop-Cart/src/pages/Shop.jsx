import React from 'react'
import Hero from '../components/Hero/Hero'
import { Popular } from '../components/Popular/Popular'
import Offers from '../components/Offers/Offers'
import Collection from '../components/Collections/Collection'
import Contact from '../components/Contact/Contact'
import Footer from '../components/Footer/Footer'
import offers1 from '../assets/offers11.png'


const Shop = () => {
  return (
   <>
   <Hero/>
   <Popular/>
   <Offers img={offers1} h1='Best Deals, Just a Click Away!' p='Premium selections, unbeatable prices, all for you.'/>
   <Collection/>
   <Contact/>
   </>
  )
}

export default Shop