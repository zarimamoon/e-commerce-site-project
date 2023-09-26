import React, { useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom'; // Import Navigate
import Home from './components/Home';
import Navbar from './components/Navbar';
import Products from './components/Products';
import Product from './components/Product';
import Login from './components/Login';
import Register from './components/Register';
import Cart from './components/Cart';
import Checkout from './components/Checkout';
import CheckoutSuccess from './components/CheckoutSuccess';

function App() {
  const [token, setToken] = useState(localStorage.getItem('userToken') || null);

  const logoutHandler = () => {
    setToken(""); // Clear the token
    localStorage.clear();
  };

  return (
    <>
      <Navbar token={token} setToken={setToken} logoutHandler={logoutHandler} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Products />} />
        <Route path="/products/:id" element={<Product />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/register" element={<Register />} />
        
        <Route
          path="/checkout"
          element={
            token ? (
              <Checkout />
            ) : (
              <Navigate to="/login" /> // Redirect to the login page
            )
          }
        />
        <Route path="/checkoutsuccess" element={<CheckoutSuccess />} />
        
        <Route path="/login" element={<Login token={token} setToken={setToken} />} />
      </Routes>
    </>
  );
}

export default App;
