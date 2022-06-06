import React, { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import ProductItem from '../components/ProductItem';

const SearchResults = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchedProducts, setSearchedProducts] = useState([]);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const searchText = searchParams.get('search');

  const fetchSearchedProducts = async () => {
    setIsLoading(true);

    try {
      const response = await fetch(
        `http://localhost:5000/api/items?q=${searchText}`
      );
      const products = await response.json();
      setError('');
      setSearchedProducts(products.items);
    } catch (err) {
      setError(err.message);
    }

    setIsLoading(false);
  };

  useEffect(() => {
    if (searchText.trim().length === 0) {
      navigate('/');
    }

    fetchSearchedProducts();
  }, [searchText]);

  if (error) {
    return (
      <div className='search-products container'>
        <p className='search-products-error'>{error}</p>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className='search-products container'>
        <p className='search-products-loading'>Cargando productos...</p>
      </div>
    );
  }

  return (
    <div className='search-products container'>
      {searchedProducts.length ? (
        <ul className='search-products-list'>
          {searchedProducts.map((item, idx) => {
            return <ProductItem key={idx} item={item} />;
          })}
        </ul>
      ) : (
        <p className='search-products-error'>No se encontraron productos</p>
      )}
    </div>
  );
};

export default SearchResults;
