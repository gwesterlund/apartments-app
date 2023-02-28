import React from "react";
import Container from "react-bootstrap/Container";
import { Col, Nav, Row } from "react-bootstrap";
import NavLink from "../NavLink";

export default function Footer() {
  return (
    <Container>
      <Row>
        <Col className="d-flex justify-content-between align-items-center">
          <Nav>
            <NavLink href="/about" className="nav-link">
              About
            </NavLink>
            <NavLink href="/contact" className="nav-link">
              Contact
            </NavLink>
          </Nav>
          <span className="copyright">All rights &copy; 2023</span>
        </Col>
      </Row>
    </Container>
  );
}
