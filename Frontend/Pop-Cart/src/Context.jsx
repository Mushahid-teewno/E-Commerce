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
const fetchcart = async ()=>{
    if (localStorage.getItem('authToken')) {
        let response= await fetch('http://localhost:3000/get-cartData',{
            method:'POST',
            headers:{
                accept:'application/json',
                "Authorization": localStorage.getItem("authToken"),
                'content-type':'application/json'
            },
       
    
        
            
        });
        const data = await response.json();


         if (data.success) {
            setCartItem((prev) => ({
                ...prev,
                ...data.cartData, //  Merge instead of replacing
            })); // Update cart data only if the request is successful
         } else {
             console.error("Failed to fetch cart data:", data.message);
         }
    }
    
}


    const addToCart =async (itemId) =>{
       


        try {
            const response = await fetch("http://localhost:3000/add-to-cart", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": localStorage.getItem("authToken") // User must be logged in
                },
                body: JSON.stringify({ itemId }), // Send only productId
            });
    
            const data = await response.json();
            if (data.success) {
                setCartItem(data.cartData)
            }
            else{
                setCartItem((prev)=>({
                    ...prev,[itemId]: prev[itemId] +1
                 }))
            }
            
        } catch (error) {
            console.error("Error adding to cart:", error);
        }
    
    }

    const removeFromCart =async (itemId) =>{

        try {
            const response = await fetch("http://localhost:3000/remove-from-cart", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": localStorage.getItem("authToken") // User must be logged in
                },
                body: JSON.stringify({ itemId }), // Send only productId
            });
    
            const data = await response.json();

            if (data.success) {
                setCartItem(data.cartData)
            }
            else{
                setCartItem((prev) => ({
                    ...prev,
                    [itemId]: Math.max(0, prev[itemId] - 1), 
                }));
            }

        }
            catch(error){
                console.log(error)
            }


       
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
        const fetchData = async () => {
            await fetchProducts(); // Ensure products are fetched first
            fetchcart(); // Then fetch cart data
        };
        
        fetchData();

      }, []);

    const totalItems = allProducts.reduce((total, e) => {
        return total + CartItem[e.id];
    }, 0);
     
    const   contextValue = {allProducts,CartItem,totalItems, subtotal, addToCart,removeFromCart}

     
  

        return(
           <ShopContext.Provider value={contextValue}>
                {props.children}
           </ShopContext.Provider>
        )

 }
 export default ShopContextProvider;

