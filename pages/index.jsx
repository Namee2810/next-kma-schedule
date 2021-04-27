import Schedule from "components/HomePage/Schedule";
import Layout from "components/Layout";
import authToken from "modules/authToken";
import Head from 'next/head';
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { SET_SCHEDULE, SET_STUDENT } from "store/reducer";

export default function Home() {
  const router = useRouter();
  const dispatch = useDispatch();

  useEffect(() => {
    const local = localStorage.getItem("schedule");
    if (!local) return router.push("/auth");
    else {
      const decoded = authToken(local);
      dispatch(SET_STUDENT({ student: decoded.studentProfile }))
      dispatch(SET_SCHEDULE({ schedule: decoded.schedule }))
    }
  }, [])

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