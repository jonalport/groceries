import { screen, render, fireEvent, cleanup } from '@testing-library/react';
import ProductList from './ProductList';

describe('The ProductList component', () => {
  afterEach(cleanup);

  const products = [
    {
      productId: '1',
      name: 'orange',
      description: 'delicious fruit',
      audPrice: 1,
      stockOnHand: 12,
    },
    {
      productId: '2',
      name: 'pear',
      description: 'average fruit',
      audPrice: 3,
      stockOnHand: 0,
    },
  ];

  it('should render a list of products', async () => {
    render(
      <ProductList
        products={products}
        onAddToCart={jest.fn()}
        canAddProductToCart={jest.fn()}
        getProducts={jest.fn()}
        loading={false}
      />
    );

    expect(screen.getByText(/delicious fruit/i)).toBeInTheDocument();
    expect(screen.getAllByText(/add to cart/i).length).toEqual(2);
  });

  describe('Adding a product to the cart', () => {
    it('should trigger prop "onAddToCart"', () => {
      const mockOnAddToCart = jest.fn();

      render(
        <ProductList
          products={products}
          onAddToCart={mockOnAddToCart}
          canAddProductToCart={() => true}
          getProducts={jest.fn()}
          loading={false}
        />
      );

      fireEvent.click(screen.getByTestId('cart-button-1'));
      expect(mockOnAddToCart).toHaveBeenCalled();
      expect(mockOnAddToCart).toHaveBeenCalledWith(products[0]);
    });
  });
});
