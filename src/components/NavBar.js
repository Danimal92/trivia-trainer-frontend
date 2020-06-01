import React from "react";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";


const NavBar = (props) => {

  

  return (
    <React.Fragment>
      <Navbar style={{backgroundColor: "#e6afba"}} bg="#fff5f7" expand="lg">
        <Navbar.Brand >Trivia</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link href="/about">About</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </React.Fragment>
  );
};

export default NavBar;
