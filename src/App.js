import React, { Component } from 'react';
import './App.css';
import ProductListContainer from './components/ProductListContainer';
import Cart from './components/Cart';
import settings from './settings';

const checkOutUrl = `${settings.apiBase}checkout?token=${settings.apiToken}`;
const defaultErrorMessage = 'Sorry, your order could not be processed.';

export default class App extends Component {
  state = {
    currentPage: 'products',
    cart: {},
  };

  getCartCount() {
    return Object.values(this.state.cart).reduce((total, product) => total + product.quantity, 0);
  }

  getItemsArray() {
    return Object.values(this.state.cart);
  }

  checkOut = async () => {
    try {
      const response = await fetch(checkOutUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(this.state.cart),
      });

      const status = await response.text();

      if (status === 'OK') {
        alert('Thanks for your order!');

        this.setState({
          currentPage: 'products',
          cart: {},
        });
      } else {
        throw new Error(defaultErrorMessage);
      }
    } catch (err) {
      console.error(err);
      alert(err.message || defaultErrorMessage);
    }
  }

  canAddProductToCart = (product) => {
    let numInCart = 0;

    if (this.state.cart[product.productId]) {
      numInCart = this.state.cart[product.productId].quantity;
    }

    return numInCart < product.stockOnHand;
  }

  addToCart = (product) => {
    let cartItem = null;

    if (this.state.cart[product.productId]) {
      cartItem = { ...this.state.cart[product.productId] };
      cartItem.quantity = cartItem.quantity + 1;
    } else {
      cartItem = {
        quantity: 1,
        audPrice: product.audPrice,
        name: product.name,
        productId: product.productId,
      };
    }

    this.setState({
      cart: {
        ...this.state.cart,
        [product.productId]: cartItem,
      },
    });
  }

  render() {
    const cartCount = this.getCartCount();

    return (
      <>
        <h1 className="site-name">Groceries</h1>

        <main className="content">
          <nav className="nav">
            <button
              className={`nav-item ${this.state.currentPage === 'products' ? 'nav-item--selected' : ''}`}
              onClick={() => { this.setState({ currentPage: 'products' }); }}
            >
              Products
            </button>

            <button
              className={`nav-item ${this.state.currentPage === 'cart' ? 'nav-item--selected' : ''}`}
              onClick={() => { this.setState({ currentPage: 'cart' }); }}
            >
              Cart ({cartCount})
            </button>
          </nav>

          {this.state.currentPage === 'products' && (
            <ProductListContainer
              onAddToCart={this.addToCart}
              canAddProductToCart={this.canAddProductToCart}
            />
          )}

          {this.state.currentPage === 'cart' && (
            <Cart
              items={this.getItemsArray()}
              onCheckOut={this.checkOut}
            />
          )}
        </main>
      </>
    );
  }
}
