import AuthForm from "components/AuthForm";
import authToken from "modules/authToken";
import Head from "next/head";
import { useRouter } from "next/router";
import React, { useEffect } from 'react';
import { useSelector } from "react-redux";
import styles from "./styles.module.scss";


export default function AuthPage(props) {
  const router = useRouter();
  const sign_in = useSelector(state => state.sign_in);

  useEffect(() => {
    if (sign_in) return router.push("/");

    const local = localStorage.getItem("schedule");
    if (local) {
      if (authToken(local)) return router.push("/");
    }
  }, [])
  return (
    <>
      <Head>
        <title>KMA | Đăng nhập</title>
      </Head>
      {
        !sign_in &&
        <div className={styles.AuthPage} id="AuthPage">
          <AuthForm />
          <div className={styles.AuthPage_footer}>
            <span style={{ color: "red" }}>KMA</span> SCHEDULE
          </div>
        </div>
      }
    </>
  );
}

// export async function getServerSideProps({ req, res }) {
//   const token = req.cookies.token;
//   if (token)
//     if (authToken(token))
//       return {
//         redirect: {
//           source: '/auth',
//           destination: '/',
//           permanent: false,
//         },
//       }
//   return {
//     props: {}
//   }
// }