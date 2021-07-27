import EventAvailableOutlinedIcon from '@material-ui/icons/EventAvailableOutlined';
import FaceIcon from '@material-ui/icons/Face';
import PowerSettingsNewIcon from '@material-ui/icons/PowerSettingsNew';
import ActiveLink from 'components/common/ActiveLink';
import { useRouter } from "next/router";
import React from 'react';
import { useDispatch } from 'react-redux';
import { SIGN_OUT } from "store/reducer";
import styles from "./styles.module.scss";

function nav(props) {
  const router = useRouter();
  const dispatch = useDispatch();

  const navItems = [{
    title: "Thời khóa biểu",
    icon: <EventAvailableOutlinedIcon style={{ fontSize: "34px" }} />,
    href: "/"
  }, {
    title: "Thông tin sinh viên",
    icon: <FaceIcon style={{ fontSize: "34px" }} />,
    href: "/profile"
  }, {
    title: "Đăng xuất",
    icon: <PowerSettingsNewIcon style={{ fontSize: "34px" }} />,
    onClick() {
      dispatch(SIGN_OUT())
      router.push("/auth")
    }
  }]

  return (
    <div className={styles.nav} id="nav">
      {
        navItems.map((item, idx) => (
          item.href ? <ActiveLink href={item.href} activeClassName={styles.nav_item_active}
            key={idx}>
            <a className={styles.nav_item}>
              {item.icon}
              <span className={styles["nav_item-title"]}>{item.title}</span>
            </a>
          </ActiveLink>
            : <div className={styles.nav_item} onClick={item.onClick}
              key={idx}>
              {item.icon}
              <span className={styles["nav_item-title"]}>{item.title}</span>
            </div>
        ))
      }
    </div>
  );
}

export default nav;