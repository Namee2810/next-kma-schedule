import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import styles from "./styles.module.scss";


function Header(props) {
  const studentProfile = useSelector(state => state.studentProfile);
  const [avatarUrl, setAvatarUrl] = useState("");

  useEffect(() => {
    if (studentProfile) setAvatarUrl(`https://ui-avatars.com/api/?name=${studentProfile.displayName}&background=random&size=38`)
  }, [studentProfile])

  return (
    <div className={styles.header}>
      <div className={styles.header_logo}>
        <span className="font-700 text-red">KMA</span> Schedule
      </div>
      <div className={styles.header_avatar}>
        <img src={avatarUrl} alt="" />
      </div>
    </div >
  );
}

export default Header;