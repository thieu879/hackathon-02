import React from 'react';
export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  quantity: number;
  image: string;
  inStock: boolean;
}

export interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
}

interface CartProps {
  cartItems: CartItem[];
  updateCartItem: (productId: number, quantity: number) => void;
  removeFromCart: (productId: number) => void;
}

const Cart: React.FC<CartProps> = ({ cartItems, updateCartItem, removeFromCart }) => {
  const totalItems = cartItems.length;
  const totalPrice = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  return (
    <div className="panel panel-danger">
      <div className="panel-heading">
        <h1 className="panel-title">Your Cart</h1>
      </div>
      <div className="panel-body">
        <table className="table">
          <thead>
            <tr>
              <th>STT</th>
              <th>Name</th>
              <th>Price</th>
              <th>Quantity</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody id="my-cart-body">
            {cartItems.map((item, index) => (
              <tr key={item.id}>
                <th scope="row">{index + 1}</th>
                <td>{item.name}</td>
                <td>{item.price} USD</td>
                <td>
                  <input
                    type="number"
                    min="1"
                    value={item.quantity}
                    onChange={(e) => updateCartItem(item.id, Number(e.target.value))}
                  />
                </td>
                <td>
                  <button 
                    className="btn btn-warning" 
                    onClick={() => updateCartItem(item.id, item.quantity)}>
                    Update
                  </button>
                  <button 
                    className="btn btn-danger" 
                    onClick={() => removeFromCart(item.id)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
          <tfoot id="my-cart-footer">
            <tr>
              <td colSpan={4}>There are <b>{totalItems}</b> items in your shopping cart.</td>
              <td colSpan={2} className="total-price text-left">{totalPrice} USD</td>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  );
};

export default Cart;
