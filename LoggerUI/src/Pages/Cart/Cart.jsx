import { useNavigate } from "react-router-dom";
import React, { useState } from 'react';

export function Cart() {
  const navigate = useNavigate();

  function directToCheckout() {
    navigate("/checkout");
  }

  const [cartItems, setCartItems] = useState([
    { id: 1, name: 'Item 1', price: 10, quantity: 2 },
    { id: 2, name: 'Item 2', price: 20, quantity: 1 },
    { id: 3, name: 'Item 3', price: 30, quantity: 3 }
  ]);

  const handleQuantityChange = (itemId, newQuantity) => {
    const updatedCartItems = cartItems.map(item =>
      item.id === itemId ? { ...item, quantity: newQuantity } : item
    );
    setCartItems(updatedCartItems.filter(item => item.quantity > 0));
  };

  const handleRemoveFromCart = itemId => {
    const updatedCartItems = cartItems.filter(item => item.id !== itemId);
    setCartItems(updatedCartItems);
  };

  return (
    <>
    <div>
      <h2>Shopping Cart</h2>
      <table>
        <thead>
          <tr>
            <th>Item Name</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {cartItems.map(item => (
            <tr key={item.id}>
              <td>{item.name}</td>
              <td>${item.price}</td>
              <td>
                <button onClick={() => handleQuantityChange(item.id, item.quantity - 1)}>-</button>
                {item.quantity}
                <button onClick={() => handleQuantityChange(item.id, item.quantity + 1)}>+</button>
              </td>
              <td>
                <button onClick={() => handleRemoveFromCart(item.id)}>Remove from Cart</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <button
        onClick={directToCheckout}
        className="bg-gray-700 hover:bg-gray-600 text-white font-semibold py-2 px-4 rounded transition-colors duration-300"
      >
        Checkout!
      </button>
      
    </div>
    

      
    </>
  );
}
