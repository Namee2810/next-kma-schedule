import Layout from "components/Layout";
import Schedule from "components/Schedule";
import Head from 'next/head';

export default function Home() {
  return (
    <>
      <Head>
        <title>KMA | Thời khóa biểu</title>
      </Head>
      <Layout>
        <Schedule />
      </Layout>
    </>
  )
}