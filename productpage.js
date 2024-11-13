
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './productpage.css';

const ProductPage = () => {
  const [products, setProducts] = useState([]);
  const [newProduct, setNewProduct] = useState({ name: '', quantity: 0 });
  const [error, setError] = useState('');

  useEffect(() => {
    fetchProducts();
  }, []);

  
  const fetchProducts = async () => {
    try {
      const response = await axios.get('http://localhost:3001/products');
      setProducts(response.data);
    } catch (error) {
      console.error('Error fetching products:', error);
      setError('Failed to fetch products.');
    }
  };

  
  const handleAddProduct = async (e) => {
    e.preventDefault();
    setError('');
    try {
      await axios.post('http://localhost:3001/products', newProduct);
      fetchProducts(); 
      setNewProduct({ name: '', quantity: 0 });
    } catch (error) {
      setError('Failed to add product.');
    }
  };

  
  const handleDeleteProduct = async (productId) => {
    setError('');
    try {
      await axios.delete(`http://localhost:3001/products/${productId}`);
      fetchProducts(); 
    } catch (error) {
      setError('Failed to delete product.');
      console.error('Error deleting product:', error);
    }
  };

  return (
    <div className="product-page">
        <div>
      <h1 className="product-header">Product Management</h1>

      <form onSubmit={handleAddProduct} className="product-form">
        <input
          type="text"
          placeholder="Product Name"
          value={newProduct.name}
          onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
          required
        />
        <input
          type="number"
          placeholder="Quantity"
          value={newProduct.quantity}
          onChange={(e) => setNewProduct({ ...newProduct, quantity: parseInt(e.target.value) || 0 })}
          required
        />
        <button type="submit">Add Product</button>
      </form>
      </div>

      {error && <p style={{ color: 'red', textAlign: 'center' }}>{error}</p>}

      <div className="product-grid">
        {products.map((product) => (
          <div key={product.id} className="product-card">
            <h3>{product.name}</h3>
            <p>Quantity: {product.quantity}</p>
            <button className="card-button" onClick={() => handleDeleteProduct(product.id)}>Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductPage;
