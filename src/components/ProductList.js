import React from 'react';
import PropTypes from 'prop-types';
import Loader from 'react-loader-spinner';
import Currency from './Currency';
import Error from './Error';

const ProductList = (props) => {
  if (props.loading) {
    return (
      <Loader
        type="ThreeDots"
        color="#fff"
        height={100}
        width={100}
      />
    );
  }

  if (props.errorMessage) {
    return (
      <Error
        message={props.errorMessage}
        action={props.getProducts}
      />
    );
  }

  if (props.products && !props.products.length) {
    return (
      <Error
        message="Sorry, there are no products available right now."
        action={props.getProducts}
      />
    );
  }

  if (!props.products) {
    return null;
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

          <span className="product-price">
            <Currency amount={product.audPrice} />
          </span>

          <span className="add-to-cart">
            <button
              onClick={() => { props.onAddToCart(product); }}
              className="add-to-cart-button"
              disabled={!props.canAddProductToCart(product)}
              data-testid={`cart-button-${product.productId}`}
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
  onAddToCart: PropTypes.func.isRequired,
  canAddProductToCart: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
};

export default ProductList;
