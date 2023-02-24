import React from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavLink from "../NavLink";
import { useRouter } from "next/router";

export default function Header() {
  return (
    <Navbar bg="light" expand="lg" className="">
      <Container>
        <NavLink href="/" passHref legacyBehavior>
          <Navbar.Brand href="/">Apartments</Navbar.Brand>
        </NavLink>
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
