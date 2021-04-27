import authToken from "modules/authToken";
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { SET_SCHEDULE, SET_STUDENT } from "store/reducer";
import Header from './Header';
import Nav from './Nav';
import styles from "./styles.module.scss";

function Layout(props) {
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
    <div className={styles.Layout}>
      <Header className={styles.Layout_header} />
      <Nav className={styles.Layout_nav} />
      {props.children}
    </div>
  );
}

export default Layout;