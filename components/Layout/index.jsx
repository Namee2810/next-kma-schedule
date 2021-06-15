import { useRouter } from "next/router";
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { signInWithToken } from "store/reducer";
import Header from './Header';
import Nav from './Nav';
import styles from "./styles.module.scss";

function Layout(props) {
  const router = useRouter();

  const signed = useSelector(state => state.signed);
  const dispatch = useDispatch();

  useEffect(async () => {
    if (signed) return;

    const token = localStorage.getItem("token");
    if (!token) return router.push("/auth");
    dispatch(signInWithToken(token)).then(res => {
      if (!res.payload) router.push("/auth")
    })
  }, [])
  return (
    signed &&
    <div className={styles.Layout}>
      <Header />
      <Nav />
      {props.children}
    </div>
  );
}

export default Layout;