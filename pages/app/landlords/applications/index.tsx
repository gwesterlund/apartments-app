import {
  Alert,
  Button,
  Col,
  Container,
  Form,
  ListGroup,
  Modal,
  Row,
} from "react-bootstrap";
import Head from "next/head";

import Layout from "@/components/Layout";
import SessionGuard from "@/components/SessionGuard";
import { useState } from "react";

import { useQuery, gql, useMutation } from "@apollo/client";

export default function Applications() {
  return (
    <>
      <Head>
        <title>Landlord Portal - Applications</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout>
        <SessionGuard accountType="LANDLORD">
          <Container>
            <Row>
              <Col>
                <h2 style={{ color: "#f2e8cf" }}>
                  Landlord Portal - Applications
                </h2>
                <Alert variant="success" style={{ marginTop: "15px" }}>
                  No new applications
                </Alert>
              </Col>
            </Row>
          </Container>
        </SessionGuard>
      </Layout>
    </>
  );
}
