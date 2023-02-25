import { useSession } from "next-auth/react";
import React from "react";
import { Container, Navbar, Nav } from "react-bootstrap";
import NavLink from "../NavLink";
import UserProfile from "./UserProfile";

export default function Header() {
  const { data: session } = useSession();

  return (
    <Navbar bg="light" expand="lg" className="">
      <Container>
        <NavLink href="/" passHref legacyBehavior>
          <Navbar.Brand href="/">Apartments</Navbar.Brand>
        </NavLink>
        {session?.user?.accountType === "LANDLORD" && (
          <Nav className="me-auto">
            <NavLink href="/app/landlords" passHref legacyBehavior>
              <Nav.Link>Dashboard</Nav.Link>
            </NavLink>
            <NavLink href="/app/landlords/properties" passHref legacyBehavior>
              <Nav.Link>Properties</Nav.Link>
            </NavLink>
            <NavLink href="/app/landlords/applications" passHref legacyBehavior>
              <Nav.Link>Applications</Nav.Link>
            </NavLink>
          </Nav>
        )}
        {session?.user?.accountType === "TENANT" && (
          <Nav className="me-auto">
            <NavLink href="/app/tenants" passHref legacyBehavior>
              <Nav.Link>My Apartment</Nav.Link>
            </NavLink>
          </Nav>
        )}
        {!session && (
          <Nav className="me-auto">
            <NavLink href="/landlords" passHref legacyBehavior>
              <Nav.Link>Landlords</Nav.Link>
            </NavLink>
            <NavLink href="/tenants" passHref legacyBehavior>
              <Nav.Link>Tenants</Nav.Link>
            </NavLink>
          </Nav>
        )}
        <Nav className="ms-auto">
          <UserProfile />
        </Nav>
      </Container>
    </Navbar>
  );
}
