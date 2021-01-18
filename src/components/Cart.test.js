import { screen, render, fireEvent, cleanup } from '@testing-library/react';
import Cart from './Cart';

describe('The Cart component', () => {
  afterEach(cleanup);

  const items = [
    {
      productId: '1',
      name: 'orange',
      audPrice: 1,
      quantity: 2,
    },
    {
      productId: '2',
      name: 'pear',
      audPrice: 3,
      quantity: 20,
    },
  ];

  it('should display the items in the cart', async () => {
    render(
      <Cart
        items={items}
        onCheckOut={jest.fn()}
      />
    );

    expect(screen.getByText(/pear/i)).toBeInTheDocument();
    expect(screen.getByText(/check out/i)).toBeInTheDocument();
  });

  describe('Checking out', () => {
    it('should trigger prop "checkOut"', () => {
      const mockOnCheckOut = jest.fn();

      render(
        <Cart
          items={items}
          onCheckOut={mockOnCheckOut}
        />
      );

      fireEvent.click(screen.getByTestId('check-out-button'));
      expect(mockOnCheckOut).toHaveBeenCalled();
    });
  });
});
