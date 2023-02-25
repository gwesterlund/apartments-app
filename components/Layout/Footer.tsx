import React from "react";
import Container from "react-bootstrap/Container";
import Link from "next/link";

export default function Footer() {
  return (
    <>
      <footer className="footer fixed-bottom">
        <Container>
          <Link href="/" passHref>
            Home
          </Link>
          {" | "}
          <Link href="/about" passHref>
            About
          </Link>
          {" | "}
          <Link href="/contact" passHref>
            Contact
          </Link>
        </Container>
      </footer>
    </>
  );
}
