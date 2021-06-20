import AssignmentIndIcon from '@material-ui/icons/AssignmentInd';
import CakeIcon from '@material-ui/icons/Cake';
import CheckIcon from '@material-ui/icons/Check';
import FaceIcon from '@material-ui/icons/Face';
import WcIcon from '@material-ui/icons/Wc';
import WorkOutlineIcon from '@material-ui/icons/WorkOutline';
import { Progress } from 'antd';
import HomeLayout from "layouts/HomeLayout";
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
  let passed = 0, currentTime = new Date().getTime();
  schedule.forEach(item => {
    let time = new Date(item.day[2], item.day[1] - 1, item.day[0]).getTime()
    if (currentTime - time > 0) passed++;
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
    <HomeLayout title="KMA | Thông tin sinh viên">
      <div className={[styles.container, "fade"].join(" ")}>
        <table>
          <tbody>
            <tr>
              <th className="text-primary font-700"><FaceIcon /> Họ tên</th>
              <th className="font-500">{studentProfile.displayName}</th>
            </tr>
            <tr>
              <th className="text-primary font-700"><WcIcon /> Giới tính</th>
              <th className="font-500">{studentProfile.gender}</th>
            </tr>
            <tr>
              <th className="text-primary font-700"><CakeIcon /> Ngày sinh</th>
              <th className="font-500">{studentProfile.birthday}</th>
            </tr>
            <tr>
              <th className="text-primary font-700"><AssignmentIndIcon /> Mã sinh viên</th>
              <th className="font-500">{studentProfile.studentCode}</th>
            </tr>
            <tr>
              <th className="text-primary font-700"><WorkOutlineIcon /> Chuyên ngành</th>
              <th className="font-500">{majors}</th>
            </tr>
            <tr>
              <th className="text-primary font-700"><CheckIcon /> Tiến độ chương trình</th>
              <th className="font-500">
                <Progress type="circle" percent={progress} strokeColor={"#1ED760"} />
              </th>
            </tr>
          </tbody>
        </table>
      </div>
    </HomeLayout >
  );
}

export default Profile;