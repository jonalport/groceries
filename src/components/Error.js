import React from 'react';
import PropTypes from 'prop-types';

const Error = (props) => (
  <>
    <div className="message">
      {props.message}
    </div>

    <button
      onClick={props.action}
      className="white-button"
    >
      Try again
    </button>
  </>
);

Error.propTypes = {
  message: PropTypes.string.isRequired,
  action: PropTypes.func,
};

export default Error;
