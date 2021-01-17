import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import Loader from 'react-loader-spinner';

const formatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  minimumFractionDigits: 2,
});

const ProductList = (props) => {
  if (props.errorMessage) {
    return (
      <>
        <div className="message">{props.errorMessage}</div>

        <button
          onClick={props.getProducts}
          className="white-button"
        >
          Try again
        </button>
      </>
    );
  }

  if (props.loading || !props.products) {
    return (
      <Loader
        type="ThreeDots"
        color="#fff"
        height={100}
        width={100}
      />
    );
  }

  if (!props.products.length) {
    return (
      <>
        <div className="message">Sorry, there are no products available right now.</div>

        <button
          onClick={props.getProducts}
          className="white-button"
        >
          Try again
        </button>
      </>
    );
  }

  return (
    <ul className="products">
      {props.products.map(product => (
        <li
          className="product"
          key={product.productId}
        >
          <span className="product-meta">
            <h3 className="product-name">{product.name}</h3>

            <div className="product-description">{product.description}</div>
          </span>

          <span className="product-price">{formatter.format(product.audPrice)}</span>

          <span className="add-to-cart">
            <button
              onClick={() => { props.onAddToCart(product); }}
              className="add-to-cart-button"
              disabled={!props.canAddProductToCart(product)}
            >
              Add to cart
            </button>
          </span>
        </li>
      ))}
    </ul>
  );
};

ProductList.propTypes = {
  products: PropTypes.arrayOf(PropTypes.shape({
    productId: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    audPrice: PropTypes.number.isRequired,
    stockOnHand: PropTypes.number.isRequired,
  })),
  errorMessage: PropTypes.string,
  getProducts: PropTypes.func.isRequired,
};

export default ProductList;
