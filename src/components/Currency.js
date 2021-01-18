import React from 'react';
import PropTypes from 'prop-types';

const formatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  minimumFractionDigits: 2,
});

const Currency = (props) => (
  <>
    {formatter.format(props.amount)}
  </>
);

Currency.propTypes = {
  amount: PropTypes.number.isRequired,
};

export default Currency;
