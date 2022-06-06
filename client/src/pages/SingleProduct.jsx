import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const SingleProduct = () => {
  const { id: productId } = useParams();
  const [singleProduct, setSingleProduct] = useState({});

  const navigate = useNavigate();

  const fetchSingleProduct = async () => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/items/${productId}`
      );
      const product = await response.json();
      setSingleProduct(product.item);
    } catch (err) {
      navigate(-1);
    }
  };

  useEffect(() => {
    fetchSingleProduct();
  }, [productId]);

  return (
    <div className='single-product container'>
      {Object.keys(singleProduct).length > 0 ? (
        <div className='single-product-inner'>
          <div className='single-product-top'>
            <div className='single-product-img-wrapper'>
              <img
                className='single-product-img'
                src={singleProduct.picture}
                alt='Imagen de producto'
              />
            </div>
            <div className='single-product-more-info'>
              <p className='single-product-condition-sold'>
                {singleProduct.condition === 'new' ? 'Nuevo' : 'Usado'} -{' '}
                {singleProduct.sold_quantity} vendidos
              </p>
              <h4 className='single-product-title'>{singleProduct.title}</h4>
              <h2 className='single-product-price'>
                {singleProduct.price.currency === 'ARS' ? '$' : 'U$S'}{' '}
                {singleProduct.price.amount
                  .toString()
                  .replace(/\B(?=(\d{3})+(?!\d))/g, '.')}
              </h2>
              <button className='single-product-compare-btn' type='button'>
                Comprar
              </button>
            </div>
          </div>
          <div className='single-product-bottom'>
            <h3 className='single-product-desc-heading'>
              Descripción del producto
            </h3>
            <p className='single-product-desc'>{singleProduct.description}</p>
          </div>
        </div>
      ) : (
        <p className='single-product-loading'>Cargando producto</p>
      )}
    </div>
  );
};

export default SingleProduct;
