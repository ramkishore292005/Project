import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './orderpage.css';

const OrderPage = () => {
  const [orders, setOrders] = useState([]);
  const [newOrder, setNewOrder] = useState({ productId: '', quantity: 0, status: 'pending' });
  const [error, setError] = useState('');

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const response = await axios.get('http://localhost:3001/orders');
      setOrders(response.data);
    } catch (error) {
      console.error('Error fetching orders:', error);
    }
  };

  const handleAddOrder = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:3001/orders', newOrder);
      fetchOrders(); // Refresh order list
      setNewOrder({ productId: '', quantity: 0, status: 'pending' });
    } catch (error) {
      setError('Failed to add order.');
    }
  };

  return (
    <div className="order-page">
      <h1 className="order-header">Order Management</h1>
      <form onSubmit={handleAddOrder} className="order-form">
        <input
          type="text"
          placeholder="Product ID"
          value={newOrder.productId}
          onChange={(e) => setNewOrder({ ...newOrder, productId: e.target.value })}
          required
        />
        <input
          type="number"
          placeholder="Quantity"
          value={newOrder.quantity}
          onChange={(e) => setNewOrder({ ...newOrder, quantity: parseInt(e.target.value) })}
          required
        />
        <select
          value={newOrder.status}
          onChange={(e) => setNewOrder({ ...newOrder, status: e.target.value })}
        >
          <option value="pending">Pending</option>
          <option value="completed">Completed</option>
        </select>
        <button type="submit">Add Order</button>
      </form>
      
      {/* Order Grid */}
      <div className="order-grid">
        {orders.map((order) => (
          <div key={order.id} className="order-card">
            <h3>Order #{order.id}</h3>
            <p><strong>Product ID:</strong> {order.productId}</p>
            <p><strong>Quantity:</strong> {order.quantity}</p>
            <p><strong>Status:</strong> {order.status}</p>
          </div>
        ))}
      </div>
      
      {error && <p className="error-message">{error}</p>}
    </div>
  );
};

export default OrderPage;
