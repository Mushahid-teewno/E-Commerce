import { createContext,useEffect, useState } from "react";
import React from "react";
import all_product from './assets/all_product.js'

export const ShopContext = createContext(null);

 const getDefaultCart = () =>{
    const cart = {};
    for (let i = 0; i < all_product.length +1; i++) {
        cart[i]= 0;
    }
    return cart;
 }

    

 const ShopContextProvider=(props)=>{
    const [CartItem,setCartItem] = useState(getDefaultCart);
    const [subtotal, setSubtotal] = useState(0);

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
        const newSubtotal = all_product.reduce((total, e) => {
            if (CartItem[e.id] > 0) {
                return total + (e.new_price * CartItem[e.id]);
            }
            return total;
        }, 0);
        setSubtotal(newSubtotal);
    }, [CartItem]);

    const totalItems = all_product.reduce((total, e) => {
        return total + CartItem[e.id];
    }, 0);
     
    const   contextValue = {all_product,CartItem,totalItems, subtotal, addToCart,removeFromCart}

     
      console.log(CartItem);

        return(
           <ShopContext.Provider value={contextValue}>
                {props.children}
           </ShopContext.Provider>
        )

 }
 export default ShopContextProvider;

