import { ReactNode } from "react";
import { Container, Row, Col } from "react-bootstrap";
import Header from "./Header";
import Footer from "./Footer";

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <Header />
      <Container>
        <Row>
          <Col>{children}</Col>
        </Row>
      </Container>
      <Footer />
    </>
  );
};

export default Layout;
