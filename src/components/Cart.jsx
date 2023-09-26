import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import {
  removeFromCart,
  removeAll,
  reduceProduct,
  getTotals,
  addToCart,
} from '../redux/cartSlice';

export default function Cart() {
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getTotals());
  }, [cart, dispatch]);

  const handleDecreaseCart = (product) => {
    dispatch(reduceProduct(product));
  };

  const handleRemoveFromCart = (product) => {
    dispatch(removeFromCart(product));
  };

  const handleClearCart = () => {
    dispatch(removeAll());
  };

  const handleAddToCart = (product) => {
    dispatch(addToCart(product));
  };

  return (
    <div className="container py-5 mt-4">
      <h2 className="py-3 text-center">Shopping Cart</h2>
      {cart.cart && cart.cart.length > 0 ? (
        <div>
          {cart.cart.map((product) => (
            <div key={product.id} className="px-4 my-5 bg-light rounded-3 py-5">
              <div className="container py-4">
                <div className="row justify-content-center">
                  <div className="col-md-4">
                    <img
                      src={product.image}
                      alt={product.title}
                      className="img-fluid"
                    />
                    <div className="d-flex justify-content-between mt-3">
                      <button
                        className="btn btn-outline-dark"
                        onClick={() => handleDecreaseCart(product)}
                      >
                        <i className="fa fa-minus"></i>
                      </button>
                      <button
                        className="btn btn-outline-dark"
                        onClick={() => handleAddToCart(product)}
                      >
                        <i className="fa fa-plus"></i>
                      </button>
                    </div>
                    <div className="mt-3">
                      <h6 className="text-center">
                        ${(product.price * product.cartQuantity).toFixed(2)}
                      </h6>
                      <button
                        className="btn btn-danger btn-block"
                        onClick={() => handleRemoveFromCart(product)}
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
          <hr />
          <div className="mb-5 d-md-flex justify-content-between align-items-center">
            <button className="btn btn-danger mb-3 mb-md-0" onClick={handleClearCart}>
              Remove All items
            </button>
            <div className="cart-checkout text-center">
              <div className="subtotal">
                <span>Subtotal</span>
                <span className="amount">${cart.cartTotalAmount.toFixed(2)}</span>
              </div>
              <p>Taxes and shipping calculated at checkout</p>
              <button
                className="btn btn-dark cart-login"
                onClick={() => navigate("/checkout")}
              >
                Proceed to Checkout
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="cart-empty text-center">
          <p>Your cart is currently empty</p>
          <div className="start-shopping">
            <Link to="/">
              <button className="btn btn-warning">
                <span>Start Shopping</span>
              </button>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}