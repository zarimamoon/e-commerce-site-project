import React, { useState, useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Home from './components/Home';
import Navbar from './components/Navbar';
import Products from './components/Products';
import Product from './components/Product';
import Login from './components/Login';
import Register from './components/Register';
import Cart from './components/Cart';
import Checkout from './components/Checkout';
import CheckoutSuccess from './components/CheckoutSuccess';
import axios from 'axios';

function App() {
  const [token, setToken] = useState(localStorage.getItem('userToken') || null);
  const [products, setProducts] = useState([]);
  const [passedUsername, setPassedUsername] = useState(localStorage.getItem('passedUsername') || null);
  const [userData, setUserData] = useState({});
  const [cart, setCart] = useState([]);

  useEffect(() => {
    if (passedUsername) {
      localStorage.setItem('passedUsername', passedUsername);
    } else {
      localStorage.removeItem('passedUsername');
    }
  }, [passedUsername]);

  // Function to fetch user data when the user logs in
  const fetchUserData = () => {
    if (token) {
      axios
        .get('https://fakestoreapi.com/users/1')
        .then((response) => {
          setUserData(response.data);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  };

  // Function to add an item to the cart
  const addToCart = (product) => {
    const updatedCart = [...cart];
    updatedCart.push(product);
    setCart(updatedCart);
  };

  // Function to remove an item from the cart
  const removeFromCart = (productId) => {
    const updatedCart = cart.filter((product) => product.id !== productId);
    setCart(updatedCart);
  };

  // Function to calculate the total quantity of items in the cart
  const calculateTotal = () => {
    return cart.length;
  };

  // Function to handle logout
  const logoutHandler = () => {
    // Clear the token
    setToken('');
    localStorage.clear();
  };

  return (
    <>
      <Navbar token={token} setToken={setToken} logoutHandler={logoutHandler} userData={userData} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/products"
          element={
            <Products
              setProducts={setProducts}
              products={products}
              cart={cart}
              setCart={setCart}
              addToCart={addToCart}
            />
          }
        />
        <Route path="/products/:id" element={<Product />} />
        <Route
          path="/cart"
          element={
            <Cart
              products={products}
              cart={cart}
              setCart={setCart}
              removeFromCart={removeFromCart}
              calculateTotal={calculateTotal}
            />
          }
        />
        <Route
          path="/register"
          element={<Register setToken={setToken} setPassedUsername={setPassedUsername} />}
        />

        <Route
          path="/checkout"
          element={
            token ? (
              <Checkout />
            ) : (
              <Navigate to="/login" />
            )
          }
        />
        <Route path="/checkoutsuccess" element={<CheckoutSuccess />} />

        <Route
          path="/login"
          element={<Login token={token} setToken={setToken} fetchUserData={fetchUserData} />}
        />
      </Routes>
    </>
  );
}

export default App;