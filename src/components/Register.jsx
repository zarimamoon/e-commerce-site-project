import React, { useState } from 'react';
import axios from 'axios';

function Register() {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleRegister = () => {
    
    const userData = {
      email: email,
      username: username,
      password: password,
    
    };

    axios.post('https://fakestoreapi.com/users', userData)
      .then(response => {
        // Registration successful
        setSuccess('Registration successful. You can now log in.');
        setError('');
        // Clear input fields
        setEmail('');
        setUsername('');
        setPassword('');
      })
      .catch(error => {
        // Registration failed
        setSuccess('');
        setError('Registration failed. Please check your input.');
      });
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card">
            <div className="card-body">
              <h2 className="card-title text-center">Register</h2>
              {error && <div className="alert alert-danger">{error}</div>}
              {success && <div className="alert alert-success">{success}</div>}
              <form>
                {/* Add input fields for email, username, password, etc. */}
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
                    type="email"
                    className="form-control"
                    value={email}
                    onChange={(e) => setUsername(e.target.value)}
                  />
                </div>
                <div className="mb-3">
                  <label>Password</label>
                  <input
                    type="email"
                    className="form-control"
                    value={email}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                
                <div className="d-grid">
                  <button
                    type="button"
                    className="btn btn-primary"
                    onClick={handleRegister}
                  >
                    Register
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;