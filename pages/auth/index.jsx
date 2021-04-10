import AuthForm from "components/AuthForm";
import authToken from "modules/authToken";
import Head from "next/head";
import { useRouter } from "next/router";
import React, { useEffect } from 'react';
import styles from "./styles.module.scss";


export default function AuthPage(props) {
  const router = useRouter();
  useEffect(() => {
    if (authToken(localStorage.getItem("schedule"))) router.push("/")
  }, [])
  return (
    <>
      <Head>
        <title>Đăng nhập</title>
      </Head>
      <div className={styles.AuthPage} id="AuthPage">
        <AuthForm />
        <div className={styles.AuthPage_footer}>
          <div className={styles["AuthPage_footer-tag"]}>
            <span style={{ color: "red" }}>KMA</span> SCHEDULE
        </div>
          <div>
            Made by <a href="https://www.facebook.com/namee2810/" target="_blank" rel="noopener noreferrer">@Namee2810</a>
          </div>
        </div>
      </div>
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