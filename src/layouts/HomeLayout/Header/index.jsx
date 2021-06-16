import MenuIcon from '@material-ui/icons/Menu';
import useWidth from 'hooks/useWidth';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import styles from "./styles.module.scss";


function Header(props) {
  const width = useWidth();
  const studentProfile = useSelector(state => state.studentProfile);
  const [openNav, setOpenNav] = useState(false);
  const [avatarUrl, setAvatarUrl] = useState("");

  const handleOpenNav = () => {
    const nav = document.getElementById("Nav");
    if (!openNav) nav.style.width = "220px";
    else {
      if (width > 576) nav.style.width = "56px";
      else nav.style.width = "0";
    }
    setOpenNav(!openNav);
  }

  useEffect(() => {
    if (studentProfile) setAvatarUrl(`https://ui-avatars.com/api/?name=${studentProfile.displayName}&background=random&size=38`)
  }, [studentProfile])

  return (
    <div className={styles.Header}>
      <MenuIcon className={styles.Header_nav} onClick={handleOpenNav} />
      <div className={styles.Header_kma}>
        <span style={{ color: "red", fontWeight: "bold" }}>KMA</span> Schedule
      </div>
      <div className={styles.Header_student}>
        <img src={avatarUrl} alt="" />
      </div>
    </div >
  );
}

export default Header;