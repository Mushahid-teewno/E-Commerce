import React, { useState, useEffect, useContext } from 'react'
import './Navbar.css'
import logo from '../../assets/logo.png'
import cart_icon from '../../assets/cart_icon.png'
import { Link, useLocation } from 'react-router-dom'
import { ShopContext } from '../../Context'


const Navbar = () => {
  const [State, setState] = useState('shop');
  const { totalItems } = useContext(ShopContext)

  const location = useLocation();

  useEffect(() => {
    if (location.pathname === '/') setState('shop');
    else if (location.pathname === '/men') setState('men');
    else if (location.pathname === '/women') setState('women');
    else if (location.pathname === '/kids') setState('kids');
  }, [location.pathname]);


  return (
    <div className='navbar' >
      <div className='logo'>
        {/* <img src={logo} alt="" /> */}
        <h1 onClick={() => { setState('shop') }}> <Link style={{ textDecoration: "none", color: 'inherit' }} to='/'>Pop Cart</Link></h1>
      </div>

      <div className='nav-category'>
        <ul>
          <li onClick={() => { setState('shop') }}> <Link style={{ textDecoration: "none", color: 'inherit' }} to='/'>Shop</Link> {State === 'shop' ? <hr /> : <></>}</li>
          <li onClick={() => { setState('men') }}><Link style={{ textDecoration: "none", color: 'inherit' }} to='/men'>Men</Link>  {State === 'men' ? <hr /> : <></>}</li>
          <li onClick={() => { setState('women') }}><Link style={{ textDecoration: "none", color: 'inherit' }} to='/women'>Women</Link> {State === 'women' ? <hr /> : <></>}</li>
          <li onClick={() => { setState('kids') }}><Link style={{ textDecoration: "none", color: 'inherit' }} to='/kids'>Kids</Link> {State === 'kids' ? <hr /> : <></>}</li>
        </ul>
      </div>
      <div className='login'>
        {localStorage.getItem('authToken')
          ? <button onClick={()=>{localStorage.removeItem('authToken'),window.location.reload();}}>Logout</button>
          : <Link style={{ textDecoration: "none" }} to='/login'><button>Login</button></Link>}
        {/* <Link style={{ textDecoration: "none" }} to='/login'><button>Login</button></Link> */}
        <Link style={{ textDecoration: "none" }} to='/cart' >   <img src={cart_icon} alt="" />
        </Link>
        <div className='nav-count'>{totalItems}</div>

      </div>
    </div>
  )
}

export default Navbar