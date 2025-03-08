import React, { useContext } from 'react'
import './DisplayProduct.css'
import star_icon from '../../assets/star_icon.png'
import star_dull_icon from '../../assets/star_dull_icon.png'
import { ShopContext } from '../../Context'


const DisplayProduct = ({ product }) => {

    const { addToCart } = useContext(ShopContext)
    if (!product) {
        return <p>Loading product...</p>; // Prevents crash
    }
    console.log(product)
    return (
        <div className='display-product-parent'>
            <div className='display-product'>
                <div className="product-left">
                    <div className="image-list">
                        <img src={product.image} alt="" />
                        <img src={product.image} alt="" />
                        <img src={product.image} alt="" />
                        <img src={product.image} alt="" />
                    </div>
                    <div className="main-image">
                        <img src={product.image} alt="" />
                    </div>
                </div>
                <div className="product-right">
                    <h1>{product.name}</h1>
                    <div className="star">
                        <img src={star_icon} alt="" />
                        <img src={star_icon} alt="" />
                        <img src={star_icon} alt="" />
                        <img src={star_icon} alt="" />
                        <img src={star_dull_icon} alt="" />
                        <p>(31)</p>
                    </div>
                    <div className="price">
                        <p className='old-price'>${product.old_price}</p>
                        <p className='new-price'>${product.new_price}</p>
                    </div>
                    <div className="description">
                        <h3>A timeless look with a button-down collar, single chest pocket, and neatly stitched cuffs. Perfect for both formal and casual styles.</h3>

                        <p>Select size</p>
                        <div className="size-boxes">
                            <div className="box">
                                S
                            </div>
                            <div className="box">
                                M
                            </div>
                            <div className="box">
                                L
                            </div>
                            <div className="box">
                                XL
                            </div>
                            <div className="box">
                                XXL
                            </div>
                        </div>

                    </div>
                    <button onClick={() => { addToCart(product.id) }} className='add-to-cart-btn'>Add to cart</button>
                </div>
            </div>
            <div className='display-div-bottom'>
                <div className='form-description'>
                    <div className='h-tag'>
                        <h1>Description</h1>
                    </div>
                    <div className='p-tag'>
                        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Natus ducimus esse, eveniet eius dicta hic cum dignissimos reiciendis velit voluptate unde tenetur facere ad eaque ipsam optio ipsa temporibus fuga!</p>
                    </div>
                </div>
                <div className='reviews'>
                    <div className='h-tag'>
                        <h1>Reviews 0</h1>
                    </div>
                    <div className='reviews-form'>
                        <p>There are no reviews yet</p>
                        <div className='form-details'>
                            <h3>Be the first one to review</h3>
                            <p>your email adress won't be published</p>
                            <h3 style={{ display: 'inline-block' }}>Your rating *</h3>
                            <div className='form-stars'>
                                <img src={star_icon} alt="" />
                                <img src={star_icon} alt="" />
                                <img src={star_icon} alt="" />
                                <img src={star_icon} alt="" />
                                <img src={star_icon} alt="" />
                            </div>
                            <h3>Your review *</h3>
                            <textarea rows={6} name="" id=""></textarea>
                            <div className='reviews-info'>
                                <div>
                                    <p>Name *</p>
                                    <input type="text" />
                                </div>
                                <div>
                                    <p>Email *</p>
                                    <input type="text" />
                                </div>
                            </div>
                            <input className='review-checkbox' type="checkbox" name="" id="" />
                            <p style={{ display: 'inline-block' }}>save my name, email for the next time I comment</p>
                            <button>Submit</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default DisplayProduct