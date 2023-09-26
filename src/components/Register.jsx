import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

function Register({ setToken }) {
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [city, setCity] = useState('');
  const [street, setStreet] = useState('');
  const [number, setNumber] = useState(0);
  const [zipCode, setZipCode] = useState('');
  const [phone, setPhone] = useState('');

  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);

  const handleRegister = () => {
    setLoading(true);

    axios({
      url: 'https://fakestoreapi.com/users',
      method: 'POST',
      data: {
        email: email,
        username: username,
        password: password,
        name: {
          firstname: firstName,
          lastname: lastName,
        },
        address: {
          city: city,
          street: street,
          number: number,
          zipcode: zipCode,
        },
        phone: phone,
    },
})
  .then((res) => {
    setLoading(false);
    setToken(res.data.setToken);
    // Registration successful
    setSuccess(`Registration successful. Welcome, ${res.data.firstname}! You can now log in.`);
    navigate('/login');
    setError('');
    // Clear input fields
    setEmail('');
    setUsername('');
    setPassword('');
    setFirstName('');
    setLastName('');
    setCity('');
    setStreet('');
    setNumber('');
    setZipCode('');
    setPhone('');
  })
  .catch((err) => {
    setLoading(false);
    // Registration failed
    setSuccess('');
    setError('Registration failed. Please check your input.');
    console.log(err);
  });
};

return (
<div className="container mt-5">
  <div className="row justify-content-center">
    <div className="col-md-6">
      <div className="card" style={{ backgroundColor: 'rgba(800, 150, 0, 0.4)' }}>
        <div className="card-body">
          <h2 className="card-title text-center">Register</h2>
          {error && <div className="alert alert-danger">{error}</div>}
          {success && <div className="alert alert-success">{success}</div>}
          <form onSubmit={(e) => e.preventDefault()}>
            <div className="mb-3">
              <label>Email</label>
              <input
                type="email"
                className="form-control"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label>Username</label>
              <input
                type="text"
                className="form-control"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label>Password</label>
              <input
                type="password"
                className="form-control"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label>First Name</label>
              <input
                type="text"
                className="form-control"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label>Last Name</label>
              <input
                type="text"
                className="form-control"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
            </div>
            <label 
            style={{ fontWeight: 'bold', marginTop: '1rem', marginBottom: '1rem' }}>
                Address:</label>
            <div className="mb-3">
              <label>City</label>
              <input
                type="text"
                className="form-control"
                value={city}
                onChange={(e) => setCity(e.target.value)}
              />
            </div>
            <div className="mb-3">
            <label>Street</label>
              <input
                type="text"
                className="form-control"
                value={street}
                onChange={(e) => setStreet(e.target.value)}
              />
            </div>
            <div className="mb-3">
            <label>Number</label>
              <input
                type="text"
                className="form-control"
                value={number}
                onChange={(e) => setNumber(e.target.value)}
              />
            </div>
            <div className="mb-3">
            <label>Zip Code</label>
              <input
                type="text"
                className="form-control"
                value={zipCode}
                onChange={(e) => setZipCode(e.target.value)}
              />
            </div>
            <div className="mb-3">
            <label>Phone Number</label>
              <input
                type="phonenumber"
                className="form-control"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>
            <div className="d-grid">
              <button
                type="button"
                className="btn btn-dark"
                onClick={handleRegister}
                disabled={loading}
              >
                {loading ? 'Registering...' : 'Register'}
              </button>
            </div>
          </form>
          <div className="mt-3 text-center">
            Already have an account?{' '}
            <Link to="/login" className="btn btn-link">
              Log In
            </Link>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
);
}

export default Register;