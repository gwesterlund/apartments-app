import { useState } from "react";
import {
  Container,
  Row,
  Col,
  Alert,
  Form,
  Button,
  ListGroup,
  ListGroupItem,
} from "react-bootstrap";
import Head from "next/head";

import Layout from "@/components/Layout";
import usMapSvg from "../public/us.svg";
import Image from "next/image";

import { useLazyQuery } from "@apollo/client";
import { SEARCH_PROPERTIES } from "@/client/setup/graphlq/queries";
import Link from "next/link";

export default function Home() {
  const [zipCode, setZipCode] = useState("");
  const [searchProperties, { data, loading, error }] =
    useLazyQuery(SEARCH_PROPERTIES);

  return (
    <>
      <Head>
        <title>Home</title>
        <meta name="description" content="Generated by create next app" />
      </Head>
      <Layout>
        <Container>
          <Row>
            <Col>
              <h2 style={{ color: "#f2e8cf" }}>
                <span style={{ borderBottom: "solid 4px #a7c957" }}>
                  Hand-picked
                </span>{" "}
                apartments
                <br />
                for every budget
              </h2>
            </Col>
            <Col>
              <Image
                src={usMapSvg}
                alt="US map"
                style={{ width: "100%", height: "auto" }}
              />
            </Col>
          </Row>
        </Container>
        <Container style={{ paddingTop: "30px" }}>
          <Row>
            <Col>
              <div className="panel">
                <Form
                  className="d-flex flex-row justify-content-stretch"
                  onSubmit={(e) => {
                    e.preventDefault();
                    searchProperties({
                      variables: { zip: zipCode },
                    });
                  }}
                >
                  <Form.Control
                    type="text"
                    placeholder="Enter ZIP code"
                    value={zipCode}
                    onChange={(e) => setZipCode(e.target.value)}
                  />
                  <Button variant="primary" className="ms-3" type="submit">
                    Search
                  </Button>
                </Form>
                {loading && <h4>LOADING</h4>}
                {data?.result && (
                  <ListGroup>
                    {data?.result.map((e, i) => (
                      <ListGroupItem key={i}>
                        <Link href={`/properties/${e.id}`}>
                          <div>{e.displayName}</div>
                          <div>{e.address.street}</div>
                        </Link>
                      </ListGroupItem>
                    ))}
                  </ListGroup>
                )}
              </div>
            </Col>
          </Row>
        </Container>
      </Layout>
    </>
  );
}
