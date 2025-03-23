import React, { useState, useEffect,useRef, useContext } from 'react'
import './Navbar.css'
import logo from '../../assets/logo.png'
import cart_icon from '../../assets/cart_icon.png'
import { Link, useLocation } from 'react-router-dom'
import { ShopContext } from '../../Context'
import { FiSearch } from 'react-icons/fi';


const Navbar = () => {
  const [State, setState] = useState('shop');
  const { totalItems } = useContext(ShopContext)
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState(''); 
  const [isOpen, setIsOpen] = useState(false); 


  const location = useLocation();
  const searchRef = useRef(null);

  useEffect(() => {
    if (location.pathname === '/') setState('shop');
    else if (location.pathname === '/men') setState('men');
    else if (location.pathname === '/women') setState('women');
    else if (location.pathname === '/kids') setState('kids');
  }, [location.pathname]);


  useEffect(() => {
    const handleClickOutside = (event) => {
     
       console.log("Search Bar Element:", searchRef.current); 
       if (isOpen && searchRef.current && !searchRef.current.contains(event.target)) {
         setIsOpen(false);
       }
      
    };

    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [isOpen]);


  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };


  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim() !== '') {
      window.location.href = `/search?query=${searchQuery}`; // Redirecting to search page
    }
  };


  return (
    <div className='navbar' >
      <div className='logo'>
        {/* <img src={logo} alt="" /> */}
        <h1 onClick={() => { setState('shop') }}> <Link style={{ textDecoration: "none", color: 'inherit' }} to='/'>Pop Cart</Link></h1>
      </div>
      

      {/* <div className={`nav-category ${menuOpen ? 'open' : ''}`}>
        <ul>
          <li onClick={() => setState('shop')}> 
            <Link to='/'>Shop</Link> {State === 'shop' ? <hr /> : null}
          </li>
          <li onClick={() => setState('men')}>
            <Link to='/men'>Men</Link> {State === 'men' ? <hr /> : null}
          </li>
          <li onClick={() => setState('women')}>
            <Link to='/women'>Women</Link> {State === 'women' ? <hr /> : null}
          </li>
          <li onClick={() => setState('kids')}>
            <Link to='/kids'>Kids</Link> {State === 'kids' ? <hr /> : null}
          </li>
        </ul>
      </div> */}

      {/* Search Bar */}
     

      <div className={`nav-category ${menuOpen ? 'open' : ''}`}>
        <ul>
        <span className="close-btn" onClick={() => setMenuOpen(false)}>
                    &times;
                </span>
          <li onClick={() => { setState('shop'),setMenuOpen(false) }}> <Link style={{ textDecoration: "none", color: 'inherit' }} to='/'>Shop</Link> {State === 'shop' ? <hr /> : <></>}</li>
          <li onClick={() => { setState('men'), setMenuOpen(false) }}><Link style={{ textDecoration: "none", color: 'inherit' }} to='/men'>Men</Link>  {State === 'men' ? <hr /> : <></>}</li>
          <li onClick={() => { setState('women'),setMenuOpen(false) }}><Link style={{ textDecoration: "none", color: 'inherit' }} to='/women'>Women</Link> {State === 'women' ? <hr /> : <></>}</li>
          <li onClick={() => { setState('kids') ,setMenuOpen(false)}}><Link style={{ textDecoration: "none", color: 'inherit' }} to='/kids'>Kids</Link> {State === 'kids' ? <hr /> : <></>}</li>
        </ul>
      </div>
      
     
      <div className='login'>
      <div ref={searchRef} className='search-container'>
      <FiSearch className={`search-icon ${isOpen ? 'disapear' : ''}`} onClick={() => setIsOpen(!isOpen)} />
      {isOpen && (
        <form className='search-bar' onSubmit={handleSearchSubmit}>
          <input 
            type='text' 
            placeholder='Search products...' 
            value={searchQuery} 
            onChange={handleSearchChange} 
            autoFocus 
          />
          <button type='submit'>Search</button>
        </form>
      )}
      </div>
        {localStorage.getItem('authToken')
          ? <button onClick={()=>{localStorage.removeItem('authToken'),window.location.reload();}}>Logout</button>
          : <Link style={{ textDecoration: "none" }} to='/login'><button>Login</button></Link>}
        {/* <Link style={{ textDecoration: "none" }} to='/login'><button>Login</button></Link> */}
        <Link style={{ textDecoration: "none" }} to='/cart' >   <img src={cart_icon} alt="" />
        </Link>
        <div className='nav-count'>{totalItems}</div>

        <div className="hamburger" onClick={() => setMenuOpen(!menuOpen)}>
        ☰
      </div>

      </div>
      
    </div>
  )
}

export default Navbar