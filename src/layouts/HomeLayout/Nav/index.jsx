import CloudDownloadOutlinedIcon from '@material-ui/icons/CloudDownloadOutlined';
import EventAvailableOutlinedIcon from '@material-ui/icons/EventAvailableOutlined';
import FaceIcon from '@material-ui/icons/Face';
import PowerSettingsNewIcon from '@material-ui/icons/PowerSettingsNew';
import ActiveLink from 'components/common/ActiveLink';
import { useRouter } from "next/router";
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { SIGN_OUT } from "store/reducer";
import createIcsString from 'utils/createIcsString';
import styles from "./styles.module.scss";

function Nav(props) {
  const router = useRouter();
  const dispatch = useDispatch();
  const schedule = useSelector(state => state.schedule);

  const navItems = [
    {
      title: "Thời khóa biểu",
      icon: <EventAvailableOutlinedIcon style={{ fontSize: "34px" }} />,
      href: "/"
    },
    {
      title: "Xuất file .ics",
      icon: <CloudDownloadOutlinedIcon style={{ fontSize: "34px" }} />,
      onClick() {
        let ics = createIcsString(schedule);
        let url = "data:text/calendar;charset=utf-8," + ics;

        let downloadLink = document.createElement("a");
        downloadLink.href = url;
        downloadLink.download = `thoikhoabieu.ics`;

        document.body.appendChild(downloadLink);
        downloadLink.click();
        document.body.removeChild(downloadLink);
      }
    },
    {
      title: "Thông tin sinh viên",
      icon: <FaceIcon style={{ fontSize: "34px" }} />,
      href: "/profile"
    },
    {
      title: "Đăng xuất",
      icon: <PowerSettingsNewIcon style={{ fontSize: "34px" }} />,
      onClick() {
        dispatch(SIGN_OUT())
        router.push("/auth")
      }
    }
  ]

  return (
    <div className={styles.Nav} id="Nav">
      <div>
        {
          navItems.map((item, idx) => (
            item.href ? <ActiveLink href={item.href} activeClassName={styles.Nav_item_active}
              key={idx}>
              <a className={styles.Nav_item}>
                {item.icon}
                <span className={styles["Nav_item-title"]}>{item.title}</span>
              </a>
            </ActiveLink>
              : <div className={styles.Nav_item} onClick={item.onClick}
                key={idx}>
                {item.icon}
                <span className={styles["Nav_item-title"]}>{item.title}</span>
              </div>
          ))
        }
      </div>
      <div className={styles.Nav_footer}>
        Made by <a href="https://www.facebook.com/namee2810/" target="_blank" rel="noopener noreferrer">@Namee</a>
      </div>
    </div>
  );
}

export default Nav;