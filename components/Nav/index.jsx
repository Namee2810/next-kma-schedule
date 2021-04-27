import CloudDownloadOutlinedIcon from '@material-ui/icons/CloudDownloadOutlined';
import EventAvailableOutlinedIcon from '@material-ui/icons/EventAvailableOutlined';
import FaceIcon from '@material-ui/icons/Face';
import PowerSettingsNewIcon from '@material-ui/icons/PowerSettingsNew';
import createIcsString from 'modules/createIcsString';
import { useRouter } from "next/router";
import React from 'react';
import styles from "./styles.module.scss";

function Nav(props) {
  const router = useRouter();
  const { studentCode, schedule, setPage } = props;

  const handleClickDownload = () => {
    let ics = createIcsString(schedule);
    let url = "data:text/calendar;charset=utf-8," + ics;

    var downloadLink = document.createElement("a");
    downloadLink.href = url;
    downloadLink.download = `${studentCode}.ics`;

    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
  }
  const handleClickSignOut = () => {
    localStorage.removeItem("schedule");
    //Cookies.remove("token");
    router.push("/auth")
  }

  return (
    <div className={styles.Nav} id="Nav">
      <div>
        <div className={styles.Nav_item} onClick={() => setPage(0)}>
          <EventAvailableOutlinedIcon style={{ fontSize: "34px" }} />
          <span className={styles["Nav_item-title"]}>Thời khóa biểu</span>
        </div>
        <div className={styles.Nav_item} onClick={handleClickDownload}>
          <CloudDownloadOutlinedIcon style={{ fontSize: "34px" }} />
          <span className={styles["Nav_item-title"]}>Xuất file .ics</span>
        </div>
        <div className={styles.Nav_item} onClick={() => setPage(1)}>
          <FaceIcon style={{ fontSize: "34px" }} />
          <span className={styles["Nav_item-title"]}>Thông tin sinh viên</span>
        </div>
        <div className={styles.Nav_item} onClick={handleClickSignOut} style={{ color: "red" }}>
          <PowerSettingsNewIcon style={{ fontSize: "34px" }} />
          <span className={styles["Nav_item-title"]}>Đăng xuất</span>
        </div>
      </div>
      <div className={styles.Nav_footer}>
        Made by <a href="https://www.facebook.com/namee2810/" target="_blank" rel="noopener noreferrer">@Namee</a>
      </div>
    </div>
  );
}

export default Nav;