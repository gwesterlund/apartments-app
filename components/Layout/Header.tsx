import React from "react";
import { Container, Navbar, Nav, Button } from "react-bootstrap";

import NavLink from "../NavLink";
import UserProfile from "./UserProfile";

export default function Header() {
  return (
    <Navbar bg="light" expand="lg" className="">
      <Container>
        <NavLink href="/" passHref legacyBehavior>
          <Navbar.Brand href="/">Apartments</Navbar.Brand>
        </NavLink>
        <Nav className="ms-auto me-2">
          <UserProfile />
        </Nav>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <NavLink href="/property-owners" passHref legacyBehavior>
              <Nav.Link>For Property Owners</Nav.Link>
            </NavLink>
            <NavLink href="/tenants" passHref legacyBehavior>
              <Nav.Link>For Tenants</Nav.Link>
            </NavLink>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
