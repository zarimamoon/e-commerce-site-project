import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

function Login({ token, setToken }) {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const loginHandler = () => {
    setLoading(true);

    axios({
      url: "https://fakestoreapi.com/auth/login",
      method: "POST",
      data: {
        username: username,
        password: password,
      },
    })
      .then((res) => {
        setLoading(false);
        setToken(res.data.token);
        // Redirect to the home page on successful login
        navigate("/");
      })
      .catch((err) => {
        setLoading(false);
        setError("Invalid credentials. Please try again.");
        console.log(err);
      });
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div
            className="card"
            style={{ backgroundColor: "rgba(800, 150, 0, 0.4)" }}
          >
            <div className="card-body">
              <h2 className="card-title text-center">Log in</h2>
              {error && (
                <div className="alert alert-danger text-center">{error}</div>
              )}
              <form onSubmit={(e) => e.preventDefault()}>
                <div className="mb-3">
                  <label htmlFor="username" className="form-label">
                    Username
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    disabled={loading}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="password" className="form-label">
                    Password
                  </label>
                  <input
                    type="password"
                    className="form-control"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    disabled={loading}
                  />
                </div>
                <div className="d-grid">
                  <button
                    onClick={loginHandler}
                    type="button"
                    className="btn btn-dark"
                    disabled={loading}
                  >
                    {loading ? "Logging in..." : "Log in"}
                  </button>
                </div>
              </form>
              <div className="mt-3 text-center">
                Don't have an account?{" "}
                <Link to="/register" className="btn btn-link">
                  Register
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
