import React from 'react';
import Header from './Header';
import Nav from './Nav';
import styles from "./styles.module.scss";

function Layout(props) {
  return (
    <div className={styles.Layout}>
      <Header className={styles.Layout_header} />
      <Nav className={styles.Layout_nav} />
      {props.children}
    </div>
  );
}

export default Layout;