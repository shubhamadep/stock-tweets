import React from 'react'
import { Nav, Navbar, Form, Button, FormControl} from 'react-bootstrap';
import { NavLink} from 'react-router-dom';
import './styles/navbar.css';

const NavBar = () => {
    return (
        <Navbar collapseOnSelect fixed="top" expand="lg" className="navbar-style">
          <Navbar.Brand href="/">Coin Prophet</Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="mx-md-auto">
              <NavLink to="/" className="navbar-styles" style={{textDecoration: 'none'}}>Prophet Analysis</NavLink>
              <NavLink to="/News" className="navbar-styles" style={{textDecoration: 'none'}}>News</NavLink>
              <NavLink to="/News" className="navbar-styles" style={{textDecoration: 'none'}}>Tools</NavLink>
              <NavLink to="/News" className="navbar-styles" style={{textDecoration: 'none'}}>CrypTalks</NavLink>
              <NavLink to="/News" className="navbar-styles" style={{textDecoration: 'none'}}>My dashboard</NavLink>
            </Nav>
            <Form inline style={{paddingLeft: '20'}}>
              <FormControl type="text" placeholder="Search" className="mr-sm-2" />
              <Button variant="outline-info">Search</Button>
            </Form>
          </Navbar.Collapse>
        </Navbar>
    )
}

export default NavBar;
