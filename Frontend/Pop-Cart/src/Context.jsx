import { createContext,useEffect, useState } from "react";
import React from "react";
// import all_product from './assets/all_product.js'

export const ShopContext = createContext(null);

 const getDefaultCart = (products) =>{
    const cart = {};
    products.forEach(product => {
        cart[[product.id]]= 0;
    });
        
    
    return cart;
 }


 const ShopContextProvider=(props)=>{
    const [CartItem,setCartItem] = useState({});
    const [subtotal, setSubtotal] = useState(0);
    const [allProducts,setAllProducts]=useState([]);


    
    const fetchProducts = async ()=>{
        let response= await fetch('http://localhost:3000/showproducts',{
             method:'GET',
             headers:{
                 accept:'application/json',
                 'content-type':'application/json'
             },
 
         
             
         });
         const   data = await response.json()
         setAllProducts(data)
         setCartItem(getDefaultCart(data))
     }



    const addToCart =(itemId) =>{
        setCartItem((prev)=>({
            ...prev,[itemId]: prev[itemId] +1
        }))
    }

    const removeFromCart =(itemId) =>{
        setCartItem((prev)=>({
            ...prev,[itemId]: prev[itemId] -1
        }))
    }

    useEffect(() => {
        const newSubtotal = allProducts.reduce((total, e) => {
            if (CartItem[e.id] > 0) {
                return total + (e.new_price * CartItem[e.id]);
            }
            return total;
        }, 0);
        setSubtotal(newSubtotal);
    }, [CartItem]);

    useEffect(() => {
        fetchProducts();
      }, []);

    const totalItems = allProducts.reduce((total, e) => {
        return total + CartItem[e.id];
    }, 0);
     
    const   contextValue = {allProducts,CartItem,totalItems, subtotal, addToCart,removeFromCart}

     
      console.log(CartItem);

        return(
           <ShopContext.Provider value={contextValue}>
                {props.children}
           </ShopContext.Provider>
        )

 }
 export default ShopContextProvider;

