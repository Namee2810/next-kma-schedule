import { notification } from "antd";
import authToken from "modules/authToken";
import { useRouter } from "next/router";
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { SIGN_IN } from "store/reducer";
import Header from './Header';
import Nav from './Nav';
import styles from "./styles.module.scss";

function Layout(props) {
  const router = useRouter();

  const sign_in = useSelector(state => state.sign_in);
  const dispatch = useDispatch();

  useEffect(async () => {
    if (sign_in) return;

    const local = localStorage.getItem("schedule");
    if (!local) return router.push("/auth");

    const decoded = authToken(local);
    if (decoded) dispatch(SIGN_IN({
      student: decoded.studentProfile,
      schedule: decoded.schedule
    }))
    else {
      notification.warn({ message: "Phiên đăng nhập không hợp lệ" });
      localStorage.removeItem("schedule");
      router.push("/auth");
    }
  }, [])
  return (
    sign_in &&
    <div className={styles.Layout}>
      <Header />
      <Nav />
      {props.children}
    </div>
  );
}

export default Layout;