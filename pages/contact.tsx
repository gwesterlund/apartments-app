import Head from "next/head";
import Image from "next/image";
import Layout from "@/components/Layout";
import { Inter } from "@next/font/google";
import { Alert, Button } from "react-bootstrap";
import Link from "next/link";

const inter = Inter({ subsets: ["latin"] });

export default function Contact() {
  return (
    <>
      <Head>
        <title>Contact</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout>
        <Alert variant="primary">Contact</Alert>
      </Layout>
    </>
  );
}