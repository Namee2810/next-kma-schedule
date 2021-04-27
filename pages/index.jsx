import Schedule from "components/HomePage/Schedule";
import Layout from "components/Layout";
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