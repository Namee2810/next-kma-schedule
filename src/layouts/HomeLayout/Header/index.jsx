import React from 'react';
import { useSelector } from 'react-redux';
import getAvatarUrl from 'utils/getAvatarUrl';
import styles from "./styles.module.scss";


function Header(props) {
  const studentProfile = useSelector(state => state.studentProfile);

  return (
    <div className={styles.header}>
      <div className={styles.header_logo}>
        <span className="font-700 text-red">KMA</span> Schedule
      </div>
      <div className={styles.header_avatar}>
        <img src={getAvatarUrl(studentProfile.displayName, 38)} alt="" />
      </div>
    </div >
  );
}

export default Header;