import AssignmentIndIcon from '@material-ui/icons/AssignmentInd';
import CakeIcon from '@material-ui/icons/Cake';
import CheckIcon from '@material-ui/icons/Check';
import FaceIcon from '@material-ui/icons/Face';
import WcIcon from '@material-ui/icons/Wc';
import WorkOutlineIcon from '@material-ui/icons/WorkOutline';
import { Progress } from 'antd';
import Layout from "components/Layout";
import Head from "next/head";
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import styles from "./styles.module.scss";

function getMajorsName(prefix) {
  switch (prefix) {
    case "AT": return "An toàn thông tin"
    case "CT": return "Công nghệ thông tin"
    case "DT": return "Điện tử viễn thông"
    default: return "-"
  }
}
function getProgress(schedule) {
  let passed = 0;
  schedule.forEach(item => {
    let date = item.day.split("/").map(i => +i);
    date = new Date(date[2], date[1] - 1, date[0]).getTime();
    const now = new Date().getTime();
    if (now - date > 0) passed++;
  })
  return ((passed / schedule.length) * 100).toFixed(0);
}

function Profile(props) {
  const { studentProfile, schedule } = useSelector(state => state);
  const [majors, setMajors] = useState("-");
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let prefix = studentProfile.studentCode.slice(0, 2);
    setMajors(getMajorsName(prefix));
  }, [studentProfile])
  useEffect(() => {
    if (schedule.length) setProgress(getProgress(schedule));
  }, [schedule])

  return (
    <Layout>
      <Head>
        <title>KMA | Thông tin sinh viên</title>
      </Head>
      <div className={styles.Profile}>
        <table>
          <tbody>
            <tr>
              <th className={styles["Profile_card-key"]}><FaceIcon /> Họ tên</th>
              <th className={styles["Profile_card-value"]}>{studentProfile.displayName}</th>
            </tr>
            <tr>
              <th className={styles["Profile_card-key"]}><WcIcon /> Giới tính</th>
              <th className={styles["Profile_card-value"]}>{studentProfile.gender}</th>
            </tr>
            <tr>
              <th className={styles["Profile_card-key"]}><CakeIcon /> Ngày sinh</th>
              <th className={styles["Profile_card-value"]}>{studentProfile.birthday}</th>
            </tr>
            <tr>
              <th className={styles["Profile_card-key"]}><AssignmentIndIcon /> Mã sinh viên</th>
              <th className={styles["Profile_card-value"]}>{studentProfile.studentCode}</th>
            </tr>
            <tr>
              <th className={styles["Profile_card-key"]}><WorkOutlineIcon /> Chuyên ngành</th>
              <th className={styles["Profile_card-value"]}>{majors}</th>
            </tr>
            <tr>
              <th className={styles["Profile_card-key"]}><CheckIcon /> Tiến độ chương trình</th>
              <th className={styles["Profile_card-value"]}>
                <Progress type="circle" percent={progress} strokeColor={"#1ED760"} />
              </th>
            </tr>
          </tbody>
        </table>
      </div>
    </Layout >
  );
}

export default Profile;