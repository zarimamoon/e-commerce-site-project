import React from "react";
import { NavLink, Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { Navbar as BootstrapNavbar, Nav, Container } from 'react-bootstrap';

export default function Navbar() {
  const state = useSelector((state) => state.handleCart);

  return (
    <BootstrapNavbar bg="light" expand="lg">
      <Container>
        <BootstrapNavbar.Brand as={Link} to="/">
          ZARIMA'S COLLECTION
        </BootstrapNavbar.Brand>
        <BootstrapNavbar.Toggle aria-controls="basic-navbar-nav" />
        <BootstrapNavbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link as={NavLink} exact to="/" activeClassName="active">
              <i className="fa fa-home me-1"></i> Home
            </Nav.Link>
            <Nav.Link as={NavLink} to="/products" activeClassName="active">
              <i className="fa fa-cubes me-1"></i> Products
            </Nav.Link>
            <Nav.Link as={NavLink} to="/about" activeClassName="active">
              <i className="fa fa-info-circle me-1"></i> About
            </Nav.Link>
            <Nav.Link as={NavLink} to="/contact" activeClassName="active">
              <i className="fa fa-envelope me-1"></i> Contact
            </Nav.Link>
          </Nav>
          
          <div className="buttons d-flex">
            <Link to="/login" className="btn btn-outline-dark">
              <i className="fa fa-sign-in me-1"></i> Login
            </Link>
            <Link to="/register" className="btn btn-outline-dark ms-2">
              <i className="fa fa-user-plus me-1"></i> Register
            </Link>
            <Link to="/cart" className="btn btn-outline-dark ms-2">
              <i className="fa fa-shopping-cart me-1"></i> Cart ({state.length})
            </Link>
          </div>
        </BootstrapNavbar.Collapse>
      </Container>
    </BootstrapNavbar>
  );
}