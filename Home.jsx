import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Home.css';
import { Link } from 'react-router-dom';

const Home = () => {
  
  const [totalProducts, setTotalProducts] = useState(0);
  const [totalOrders, setTotalOrders] = useState(0);
  const [outOfStock, setOutOfStock] = useState(0);
  const [pendingOrders, setPendingOrders] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    
    const fetchData = async () => {
      try {
        
        const productsResponse = await axios.get('http://localhost:3001/products');
        setTotalProducts(productsResponse.data.length); 

        
        const ordersResponse = await axios.get('http://localhost:3001/orders');
        setTotalOrders(ordersResponse.data.length); 

        
        const outOfStockCount = productsResponse.data.filter(product => product.quantity === 0).length;
        setOutOfStock(outOfStockCount);

        
        const pendingCount = ordersResponse.data.filter(order => order.status === 'pending').length;
        setPendingOrders(pendingCount);

        setLoading(false);  
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <div>Loading...</div>; 
  }

  return (
    <div className="home">
      <div className="home-container">
        <header className="navbar">
          <h1>Inventory Management System</h1>
          <nav>
            <ul className='bar'>
              <li><Link to="/products">Products</Link></li>
              <li><Link to="/orders">Orders</Link></li>
              <li><Link to="/settings">Settings</Link></li>
              <li><Link to="/register">Logout</Link></li>
            </ul>
          </nav>
        </header>

        <main className="dashboard">
          <h1>Welcome, Admin!</h1>
          <div className="stats-grid">
            <div className="stat-card">
              <h3>Total Products</h3>
              <p>{totalProducts}</p> {/* Dynamic value for total products */}
            </div>
            <div className="stat-card">
              <h3>Total Orders</h3>
              <p>{totalOrders}</p> {/* Dynamic value for total orders */}
            </div>
            <div className="stat-card">
              <h3>Out of Stock</h3>
              <p>{outOfStock}</p> {/* Dynamic value for out-of-stock products */}
            </div>
            <div className="stat-card">
              <h3>Pending Orders</h3>
              <p>{pendingOrders}</p> {/* Dynamic value for pending orders */}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Home;
