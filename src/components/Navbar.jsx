import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { Navbar as BootstrapNavbar, Nav, Container } from "react-bootstrap";

const Navbar = ({ token, setToken }) => {
  const { cartTotalQuantity } = useSelector((state) => state.cart);

  // Function to handle logout
  const logoutHandler = () => {
    setToken("");
    localStorage.clear();
  };

  return (
    <BootstrapNavbar bg="light" expand="lg">
      <Container>
        <BootstrapNavbar.Brand as={Link} to="/">
          MY FAV SHOP
        </BootstrapNavbar.Brand>
        <BootstrapNavbar.Toggle aria-controls="basic-navbar-nav" />
        <BootstrapNavbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link as={Link} to="/">
              <i className="fa fa-home me-1"></i> Home
            </Nav.Link>
            <Nav.Link as={Link} to="/products">
              <i className="fa fa-shopping-bag" aria-hidden="true"></i> Products
            </Nav.Link>
          </Nav>

          <div className="d-flex">
            {token ? (
              <button
                onClick={() => logoutHandler()}
                className="btn btn-outline-dark me-2"
              >
                <i className="fa fa-sign-out me-1"></i> Logout
              </button>
            ) : (
              <>
                <Link to="/login" className="btn btn-outline-dark me-2">
                  <i className="fa fa-sign-in me-1"></i> Login
                </Link>
                <Link to="/register" className="btn btn-outline-dark me-2">
                  <i className="fa fa-user-plus me-1"></i> Register
                </Link>
              </>
            )}
          </div>
          <Link to="/cart" className="btn btn-outline-dark">
            <i className="fa fa-shopping-cart me-1"></i>{" "}
            {cartTotalQuantity > 0 && cartTotalQuantity}
          </Link>
        </BootstrapNavbar.Collapse>
      </Container>
    </BootstrapNavbar>
  );
};

export default Navbar;
