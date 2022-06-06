import React from 'react';
import { Link } from 'react-router-dom';
import ShippingIcon from '../assets/ic_shipping.png';

const ProductItem = (props) => {
  return (
    <li className='search-products-item'>
      <div className='search-products-item-first'>
        <img
          className='search-products-item-img'
          src={props.item.picture}
          alt={props.item.id}
        />
      </div>
      <div className='search-products-item-second'>
        <h3 className='search-products-item-price'>
          {props.item.price.currency === 'ARS' ? '$' : 'U$S'}{' '}
          {props.item.price.amount
            .toString()
            .replace(/\B(?=(\d{3})+(?!\d))/g, '.')}
          {props.item.free_shipping ? (
            <img
              className='free-shipping-icon'
              src={ShippingIcon}
              alt='shipping icon'
            />
          ) : (
            ''
          )}
        </h3>
        <Link
          className='search-products-item-link'
          to={`/items/${props.item.id}`}
        >
          {props.item.title}
        </Link>
      </div>
      <div className='search-products-item-third'>
        <span className='search-products-item-seller-state'>
          {props.item.seller_state_name}
        </span>
      </div>
    </li>
  );
};

export default ProductItem;
