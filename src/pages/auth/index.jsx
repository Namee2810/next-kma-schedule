import AuthForm from "components/auth/AuthForm";
import Head from "next/head";
import { useRouter } from "next/router";
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { signInWithToken } from "store/reducer";
import styles from "./styles.module.scss";


export default function AuthPage(props) {
  const router = useRouter();
  const dispatch = useDispatch();
  const signed = useSelector(state => state.signed);

  useEffect(() => {
    if (signed) return router.push("/");

    const token = localStorage.getItem("token");
    if (token) dispatch(signInWithToken(token))
  }, [])

  useEffect(() => {
    if (signed) router.push("/")
  }, [signed])

  return (
    <>
      <Head>
        <title>KMA | Đăng nhập</title>
      </Head>
      {
        !signed &&
        <div className={styles.container} id="AuthPage">
          <AuthForm />
          <div className={styles.footer}>
            <span className="text-red">KMA</span> SCHEDULE
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