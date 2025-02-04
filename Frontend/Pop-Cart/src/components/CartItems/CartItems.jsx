import React, { useContext } from 'react'
import './CartItems.css'
import { ShopContext } from '../../Context'
import remove_icon from '../../assets/cart_cross_icon.png'
const CartItems = () => {
    const { all_product,subtotal, CartItem, removeFromCart } = useContext(ShopContext)
    return (
        <div className='cart-items-outer'>
            <div className='cart-items'>
                <div className='headings'>
                    <p>Product</p>
                    <p>Title</p>
                    <p>Price</p>
                    <p>Quantity</p>
                    <p>Total</p>
                    <p>Remove</p>

                </div>

                {
                    all_product.map((e) => {
                        if (CartItem[e.id] > 0) {
                            return (
                                <>
                                    <div className='sofa'>
                                        <img className='product-img' src={e.image} alt="" />
                                        <p>{e.name}</p>
                                        <p>${e.new_price}</p>
                                        <button>{CartItem[e.id]}</button>
                                        <p>${e.new_price * CartItem[e.id]}</p>
                                        <img className='remove-icon' src={remove_icon} onClick={() => { removeFromCart(e.id) }} alt="" />

                                    </div>

                                </>
                            )
                        }
                        return null
                    })
                }



                <div className='cart-calc-outer'>

                    <div className='cart-calc'>
                        <h1>Cart Totals</h1>
                        <div className='subtotals-border-bottom-outer'>
                            <div className="subtotals border-bottom">
                                <p>Subtotals</p>
                                <p className='price'>${subtotal}</p>

                            </div>

                            <div className="subtotals border-bottom">
                                <p>Shipping Fee</p>
                                <p className='price'>Free</p>

                            </div>

                            <div className="subtotals">
                                <p>Total</p>
                                <p className='price'>${subtotal}</p>
                            </div>
                            <button>Checkout</button>
                        </div>

                    </div>
                </div>

            </div>
        </div>
    )
}

export default CartItems