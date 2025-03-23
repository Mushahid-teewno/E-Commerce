import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { ShopContext } from '../../Context'
import { useContext } from 'react';
import Item from '../Item/Item'
import './searchResults.css'


const SearchResults = () => {
  const {allProducts} = useContext(ShopContext);
  const [filteredProducts, setFilteredProducts] = useState([]); // Store filtered results
  const location = useLocation();
  const query = new URLSearchParams(location.search).get('query'); // Extract search term

  

  useEffect(() => {
    if (query) {
      // Filter products on the frontend
      const results = allProducts.filter(product =>
        product.name.toLowerCase().includes(query.toLowerCase()) // Case-insensitive search
      );
      setFilteredProducts(results);
    }
  }, [query, allProducts]);

  return (
    <div className='search-results'>
      <h2>Search Results for "{query}"</h2>
      <div className="product-grid">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((item,i) => (
          <Item key={i} id= {item.id} des = {item.name} image={item.image} new_price={item.new_price} old_price={item.old_price} />
        ))) : (
          <p>No results found.</p>
        )}
      </div>
    </div>
  );
};

export default SearchResults;
