import CloudDownloadOutlinedIcon from '@material-ui/icons/CloudDownloadOutlined';
import EventAvailableOutlinedIcon from '@material-ui/icons/EventAvailableOutlined';
import PowerSettingsNewIcon from '@material-ui/icons/PowerSettingsNew';
import createIcsString from "modules/createIcsString";
import Link from "next/link";
import { useRouter } from "next/router";
import React from 'react';
import { useSelector } from 'react-redux';
import styles from "./styles.module.scss";

function Nav(props) {
  const router = useRouter();
  const schedule = useSelector(state => state.schedule);

  const handleClickDownload = () => {
    let ics = createIcsString(schedule);
    let url = "data:text/calendar;charset=utf-8," + ics;

    var downloadLink = document.createElement("a");
    downloadLink.href = url;
    downloadLink.download = "schedule.ics";

    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
  }
  const handleClickSignOut = () => {
    localStorage.removeItem("schedule");
    //Cookies.remove("token");
    router.push("/auth")
  }

  const nav_item = [
    {
      icon: <EventAvailableOutlinedIcon style={{ fontSize: "34px" }} />,
      title: "Thời khóa biểu",
      href: "/"
    },
    {
      icon: <CloudDownloadOutlinedIcon style={{ fontSize: "34px" }} />,
      title: "Xuất file .ics",
      onClick: handleClickDownload
    },
    {
      icon: <PowerSettingsNewIcon style={{ fontSize: "34px" }} />,
      title: "Đăng xuất",
      onClick: handleClickSignOut
    }
  ]

  return (
    <div className={styles.Nav} id="Nav">
      <div>
        {
          nav_item.map((item, idx) => (
            item.href ?
              <Link href={item.href} key={idx}>
                <a className={styles.Nav_item}>
                  {item.icon}
                  < span className={styles["Nav_item-title"]} > {item.title}</span>
                </a>
              </Link >
              : <div className={styles.Nav_item} onClick={item.onClick} key={idx}>
                {item.icon}
                <span className={styles["Nav_item-title"]}>{item.title}</span>
              </div>
          ))
        }
      </div >
      <div className={styles.Nav_footer}>
        Made by <a href="https://www.facebook.com/namee2810/" target="_blank" rel="noopener noreferrer">@Namee</a>
      </div>
    </div >
  );
}

export default Nav;