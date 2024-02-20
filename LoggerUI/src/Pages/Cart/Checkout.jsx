import { useNavigate } from "react-router-dom";
import React, { useState } from 'react';
export function Checkout() {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState([
    { id: 1, name: 'Item 1', price: 10, quantity: 2 },
    { id: 2, name: 'Item 2', price: 20, quantity: 1 },
    { id: 3, name: 'Item 3', price: 30, quantity: 3 }
  ]);

  function directToOrderConfirmation() {
    navigate("/order-confirmation");
  }

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    address: ''
  });

  const handleChange = e => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };


  return (
    <>
      <div>
      <h1>Checkout</h1>
      <div>
        <h3>Order Summary</h3>
        <table>
          <thead>
            <tr>
              <th>Item Name</th>
              <th>Price</th>
              <th>Quantity</th>
              <th>Total</th>
            </tr>
          </thead>
          <tbody>
            {cartItems.map(item => (
              <tr key={item.id}>
                <td>{item.name}</td>
                <td>${item.price}</td>
                <td>{item.quantity}</td>
                <td>${item.price * item.quantity}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
    <div>
    <form onSubmit={directToOrderConfirmation}>
        <label>
          Full Name:
          <input type="text" name="fullName" value={formData.fullName} onChange={handleChange} required />
        </label>
        <label>
          Email:
          <input type="email" name="email" value={formData.email} onChange={handleChange} required />
        </label>
        <label>
          Address:
          <textarea name="address" value={formData.address} onChange={handleChange} required />
        </label>
        <button
          type="submit"
          onClick={directToOrderConfirmation}
          className="bg-gray-700 hover:bg-gray-600 text-white font-semibold py-2 px-4 rounded transition-colors duration-300"
        >
          Confirm Order
      </button>
      </form>
      
    </div>
    </>
  );
}
