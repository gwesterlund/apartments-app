import { useSession } from "next-auth/react";
import React from "react";
import { Home } from "react-feather";
import { Container, Navbar, Nav } from "react-bootstrap";
import NavLink from "../NavLink";
import UserProfile from "./UserProfile";

export default function Header() {
  const { data: session } = useSession();

  return (
    <Navbar>
      <Container>
        <Nav className="me-auto">
          <NavLink href="/" className="navbar-brand d-flex align-items-center">
            <Home size={20} style={{ marginRight: "10px" }} />
            Apartments
          </NavLink>
          {session?.user?.accountType === "LANDLORD" && (
            <>
              <NavLink href="/app/landlords" className="nav-link">
                Dashboard
              </NavLink>
              <NavLink href="/app/landlords/properties" className="nav-link">
                Properties
              </NavLink>
              <NavLink href="/app/landlords/applications" className="nav-link">
                Applications
              </NavLink>
            </>
          )}
          {session?.user?.accountType === "TENANT" && (
            <>
              <NavLink href="/app/tenants" className="nav-link">
                My Apartment
              </NavLink>
            </>
          )}
          {!session && (
            <>
              <NavLink href="/landlords" className="nav-link">
                For Landlords
              </NavLink>
              <NavLink href="/tenants" className="nav-link">
                For Tenants
              </NavLink>
            </>
          )}
        </Nav>
        <Nav>
          <UserProfile />
        </Nav>
      </Container>
    </Navbar>
  );
}
