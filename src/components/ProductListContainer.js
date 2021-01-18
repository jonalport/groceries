import React, { Component } from 'react';
import settings from '../settings';
import ProductList from './ProductList';

const productsUrl = `${settings.apiBase}products?token=${settings.apiToken}`;

export default class ProductListContainer extends Component {
  state = {
    products: null,
    errorMessage: null,
    loading: false,
  };

  getProducts = async () => {
    this.setState({
      loading: true,
      errorMessage: null,
    });

    try {
      if (!settings.apiToken) {
        throw new Error('API token not found');
      }

      const response = await fetch(productsUrl);
      const products = await response.json();

      this.setState({ products });
    } catch (err) {
      const errorMessage = err.message || 'There was a problem retrieving the available products.';
      this.setState({ errorMessage });
    } finally {
      this.setState({ loading: false });
    }
  };

  componentDidMount() {
    this.getProducts();
  }

  render() {
    return (
      <ProductList
        products={this.state.products}
        loading={this.state.loading}
        errorMessage={this.state.errorMessage}
        getProducts={this.getProducts}
        onAddToCart={this.props.onAddToCart}
        canAddProductToCart={this.props.canAddProductToCart}
      />
    );
  }
}
