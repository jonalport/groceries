import React from 'react';
import PropTypes from 'prop-types';
import Currency from './Currency';

const Cart = (props) => {
  if (!props.items.length) {
    return (
      <ul className="items">
        <li>Your cart is empty</li>
      </ul>
    )
  }

  const getTotal = () => {
    return props.items.reduce((total, item) => total + (item.quantity * item.audPrice), 0);
  };

  return (
    <div className="items">
      <ul>
        {props.items.map(item => (
          <li
            className="item"
            key={item.productId}
          >
            <span className="item-name">{item.name} ({item.quantity})</span>

            <span className="item-price">
              <Currency amount={item.audPrice * item.quantity} />
            </span>
          </li>
        ))}

        <li className="item">
          <span />

          <span className="cart-total">
            <Currency amount={getTotal()} />
          </span>
        </li>
      </ul>

      <button
        className="check-out-button"
        onClick={props.onCheckOut}
        data-testid="check-out-button"
      >
        Check out
      </button>
    </div>
  );
};

Cart.propTypes = {
  items: PropTypes.arrayOf(PropTypes.shape({
    productId: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    quantity: PropTypes.number.isRequired,
    audPrice: PropTypes.number.isRequired,
  })),
  onCheckOut: PropTypes.func.isRequired,
};

export default Cart;
