import React, { useState } from "react";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { removeFromCart, getTotals } from "../redux/cartSlice";

const Checkout = () => {
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getTotals());
  }, [cart, dispatch]);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [country, setCountry] = useState("");
  const [state, setState] = useState("");
  const [zip, setZip] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("credit");
  const [ccName, setCcName] = useState("");
  const [ccNumber, setCcNumber] = useState("");
  const [ccExpiration, setCcExpiration] = useState("");
  const [ccCvv, setCcCvv] = useState("");
  const [formErrors, setFormErrors] = useState({});

  const validateForm = () => {
    const errors = {};
    if (!firstName) errors.firstName = "First name is required.";
    if (!lastName) errors.lastName = "Last name is required.";
    if (!address) errors.address = "Address is required.";
    if (!country) errors.country = "Country is required.";
    if (!state) errors.state = "State is required.";
    if (!zip) errors.zip = "Zip code is required.";
    if (!ccName) errors.ccName = "Name on card is required.";
    if (!ccNumber) errors.ccNumber = "Credit card number is required.";
    if (!ccExpiration) errors.ccExpiration = "Expiration date is required.";
    if (!ccCvv) errors.ccCvv = "CVV is required.";
    return errors;
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const errors = validateForm();
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }
    setFormErrors({});
    alert(`Form submitted successfully! Total amount: ${cart.cartTotalAmount}`);
    // Reset form fields
    setFirstName("");
    setLastName("");
    setUsername("");
    setEmail("");
    setAddress("");
    setCountry("");
    setState("");
    setZip("");
    setPaymentMethod("credit");
    setCcName("");
    setCcNumber("");
    setCcExpiration("");
    setCcCvv("");
  };

  const productList = (product) => {
    const handleRemoveFromCart = () => {
      dispatch(removeFromCart({ id: product.id }));
    };

    return (
      <li
        className="list-group-item d-flex justify-content-between lh-sm"
        key={product.id}
      >
        <div>
          <h6 className="my-0">{product.title}</h6>
        </div>
        <span className="text-muted">${cart.cartTotalAmount.toFixed(2)}</span>
        <button
          onClick={handleRemoveFromCart}
          className="btn btn-danger btn-sm"
        >
          Remove
        </button>
      </li>
    );
  };

  return (
    <>
      <div
        className="container my-5"
        style={{ backgroundColor: "rgba(800, 150, 0, 0.4)" }}
      >
        <div className="row g-5">
          <div className="col-md-5 col-lg-4 order-md-last">
            <h4 className="d-flex justify-content-between align-items-center mb-3">
              <span className="text-brown">Your cart</span>
              <span className="badge bg-dark rounded-pill">
                {cart.length}
                <h5>Total: {cart.cartTotalAmount.toFixed(2)}</h5>
              </span>
            </h4>
            <ul className="list-group mb-3">{cart.cart.map(productList)}</ul>
            <form className="card p-2" onSubmit={handleFormSubmit}>
              <div className="input-group">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Promo code"
                />
                <button type="submit" className="btn btn-secondary">
                  Redeem
                </button>
              </div>
            </form>
          </div>
          <div className="col-md-7 col-lg-8">
            <h4 className="mb-3">Billing address</h4>
            <form className="needs-validation" noValidate>
              <div className="row g-3">
                <div className="col-12">
                  <label htmlFor="firstName" className="form-label">
                    First name
                  </label>
                  <input
                    type="text"
                    className={`form-control ${
                      formErrors.firstName ? "is-invalid" : ""
                    }`}
                    id="firstName"
                    placeholder=""
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    required
                    autoComplete="given-name"
                  />
                  <div className="invalid-feedback">{formErrors.firstName}</div>
                </div>
              </div>
              <div className="col-12">
                <label htmlFor="lastName" className="form-label">
                  Last name
                </label>
                <input
                  type="text"
                  className={`form-control ${
                    formErrors.lastName ? "is-invalid" : ""
                  }`}
                  id="lastName"
                  placeholder=""
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  required
                  autoComplete="family-name"
                />
                <div className="invalid-feedback">{formErrors.lastName}</div>
              </div>

              <div className="col-12">
                <label htmlFor="username" className="form-label">
                  Username
                </label>
                <div className="input-group has-validation">
                  <span className="input-group-text">@</span>
                  <input
                    type="text"
                    className={`form-control ${
                      formErrors.username ? "is-invalid" : ""
                    }`}
                    id="username"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                    autoComplete="username"
                  />
                  <div className="invalid-feedback">{formErrors.username}</div>
                </div>
              </div>

              <div className="col-12">
                <label htmlFor="email" className="form-label">
                  Email <span className="text-muted">(Optional)</span>
                </label>
                <input
                  type="email"
                  className={`form-control ${
                    formErrors.email ? "is-invalid" : ""
                  }`}
                  id="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  autoComplete="email"
                />
                <div className="invalid-feedback">{formErrors.email}</div>
              </div>
              <div className="col-12">
                <label htmlFor="address" className="form-label">
                  Address
                </label>
                <input
                  type="text"
                  className={`form-control ${
                    formErrors.address ? "is-invalid" : ""
                  }`}
                  id="address"
                  placeholder="1234 Main St"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  required
                  autoComplete="street-address"
                />
                <div className="invalid-feedback">{formErrors.address}</div>
              </div>
              <div className="col-md-3">
                <label htmlFor="zip" className="form-label">
                  Zip
                </label>
                <input
                  type="text"
                  className={`form-control ${
                    formErrors.zip ? "is-invalid" : ""
                  }`}
                  id="zip"
                  placeholder=""
                  value={zip}
                  onChange={(e) => setZip(e.target.value)}
                  required
                  autoComplete="postal-code"
                />
                <div className="invalid-feedback">{formErrors.zip}</div>
              </div>

              <hr className="my-4" />

              <div className="form-check">
                <input
                  type="checkbox"
                  className="form-check-input"
                  id="same-address"
                />
                <label className="form-check-label" htmlFor="same-address">
                  Shipping address is the same as my billing address
                </label>
              </div>

              <div className="form-check">
                <input
                  type="checkbox"
                  className="form-check-input"
                  id="save-info"
                />
                <label className="form-check-label" htmlFor="save-info">
                  Save this information for next time
                </label>
              </div>

              <hr className="my-4" />

              <h4 className="mb-3">Payment</h4>
              <div className="my-3">
                <div className="form-check">
                  <input
                    id="credit"
                    name="paymentMethod"
                    type="radio"
                    className="form-check-input"
                    checked={paymentMethod === "credit"}
                    onChange={() => setPaymentMethod("credit")}
                    required
                  />
                  <label className="form-check-label" htmlFor="credit">
                    Credit card
                  </label>
                </div>
                <div className="form-check">
                  <input
                    id="debit"
                    name="paymentMethod"
                    type="radio"
                    className="form-check-input"
                    checked={paymentMethod === "debit"}
                    onChange={() => setPaymentMethod("debit")}
                    required
                  />
                  <label className="form-check-label" htmlFor="debit">
                    Debit card
                  </label>
                </div>
                <div className="form-check">
                  <input
                    id="paypal"
                    name="paymentMethod"
                    type="radio"
                    className="form-check-input"
                    checked={paymentMethod === "paypal"}
                    onChange={() => setPaymentMethod("paypal")}
                    required
                  />
                  <label className="form-check-label" htmlFor="paypal">
                    PayPal
                  </label>
                </div>
              </div>

              <div className="row gy-3">
                <div className="col-md-6">
                  <label htmlFor="cc-name" className="form-label">
                    Name on card
                  </label>
                  <input
                    type="text"
                    className={`form-control ${
                      formErrors.ccName ? "is-invalid" : ""
                    }`}
                    id="cc-name"
                    placeholder=""
                    value={ccName}
                    onChange={(e) => setCcName(e.target.value)}
                    required
                    autoComplete="cc-name"
                  />
                  <small className="text-muted">
                    Full name as displayed on card
                  </small>
                  <div className="invalid-feedback">{formErrors.ccName}</div>
                </div>

                <div className="col-md-6">
                  <label htmlFor="cc-number" className="form-label">
                    Credit card number
                  </label>
                  <input
                    type="text"
                    className={`form-control ${
                      formErrors.ccNumber ? "is-invalid" : ""
                    }`}
                    id="cc-number"
                    placeholder=""
                    value={ccNumber}
                    onChange={(e) => setCcNumber(e.target.value)}
                    required
                    autoComplete="cc-number"
                  />
                  <div className="invalid-feedback">{formErrors.ccNumber}</div>
                </div>

                <div className="col-md-3">
                  <label htmlFor="cc-expiration" className="form-label">
                    Expiration
                  </label>
                  <input
                    type="text"
                    className={`form-control ${
                      formErrors.ccExpiration ? "is-invalid" : ""
                    }`}
                    id="cc-expiration"
                    placeholder=""
                    value={ccExpiration}
                    onChange={(e) => setCcExpiration(e.target.value)}
                    required
                    autoComplete="cc-exp"
                  />
                  <div className="invalid-feedback">
                    {formErrors.ccExpiration}
                  </div>
                </div>

                <div className="col-md-3">
                  <label htmlFor="cc-cvv" className="form-label">
                    CVV
                  </label>
                  <input
                    type="text"
                    className={`form-control ${
                      formErrors.ccCvv ? "is-invalid" : ""
                    }`}
                    id="cc-cvv"
                    placeholder=""
                    value={ccCvv}
                    onChange={(e) => setCcCvv(e.target.value)}
                    required
                    autoComplete="cc-csc"
                  />
                  <div className="invalid-feedback">{formErrors.ccCvv}</div>
                </div>
              </div>

              <h4 className="my-4">Total: {cart.cartTotalAmount.toFixed(2)}</h4>

              <hr className="my-4" />

              <button
                className="w-100 btn btn-dark btn-lg my-4"
                type="submit"
                onClick={() => navigate("/checkoutsuccess")}
              >
                Continue to checkout
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Checkout;
