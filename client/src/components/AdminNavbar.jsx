import React from 'react';
import { Container, Nav, Navbar } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom'
import './Topnav.css';
import logo from '../images/navlogo.png';

const Topnav = () => {
  const navigate = useNavigate(); 
  
  const handleLogout = () => { 
    localStorage.removeItem('adminLoggedIn'); 
    navigate('/home'); 
  };

  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container fluid>
        <Navbar.Brand as={Link} to="/">
          <img
            src={logo}
            alt="nav_logo"
            className="d-inline-block align-top"
            style={{ maxWidth: '100%', height: 'auto', maxHeight: '40px' }} // Ensure the logo is responsive
          />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link as={Link} to="/Products">Products</Nav.Link>
            <Nav.Link as={Link} to="/Orders">Orders</Nav.Link>
            <Nav.Link as={Link} to="/Account">Accounts</Nav.Link>
            <Nav.Link as={Link} to="/Home" onClick={handleLogout}>Logout</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Topnav;


