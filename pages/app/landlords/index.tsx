import { Alert } from "react-bootstrap";
import Head from "next/head";

import Layout from "@/components/Layout";
import SessionGuard from "@/components/SessionGuard";

export default function LandlordPortal() {
  return (
    <>
      <Head>
        <title>Landlord Portal - Home</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout>
        <SessionGuard accountType="LANDLORD">
          <h1>Landlord Portal - Home</h1>
          <Alert variant="primary">
            Landing page for landlords - supposedly summary on all properties, some sort of dashboard with charts and moneys.
          </Alert>
        </SessionGuard>
      </Layout>
    </>
  );
}