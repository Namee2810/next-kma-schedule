import CakeIcon from '@material-ui/icons/Cake';
import FaceIcon from '@material-ui/icons/Face';
import FingerprintIcon from '@material-ui/icons/Fingerprint';
import GroupIcon from '@material-ui/icons/Group';
import WorkOutlineIcon from '@material-ui/icons/WorkOutline';
import HomeLayout from "layouts/HomeLayout";
import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import { useSelector } from 'react-redux';
import getAvatarUrl from "utils/getAvatarUrl";
import styles from "./styles.module.scss";

const chartOptions = {
  responsive: true,
  maintainAspectRatio: true,
  aspectRatio: 2,
  scales: {
    x: {
      stacked: true,
    },
    y: {
      stacked: true
    }
  }
}

function getMajorsName(code) {
  let prefix = code.slice(0, 2);
  switch (prefix) {
    case "AT": return "An toàn thông tin"
    case "CT": return "Công nghệ thông tin"
    case "DT": return "Điện tử viễn thông"
    default: return "-"
  }
}
function filterSchedule(schedule) {
  let filterData = {}, currentTime = new Date().getTime();

  schedule.forEach(item => {
    if (!filterData[item.subjectName]) {
      filterData[item.subjectName] = {
        total: 0,
        complete: 0
      }
    }
    filterData[item.subjectName].total++;

    let time = new Date(item.day[2], item.day[1] - 1, item.day[0]).getTime();
    if (currentTime - time > 0) filterData[item.subjectName].complete++;
  })

  return filterData;
}

function Profile(props) {
  const { studentProfile, schedule } = useSelector(state => state);
  const [chartData, setChartData] = useState([])

  useEffect(() => {
    if (schedule) {
      let filterData = filterSchedule(schedule);
      setChartData({
        labels: Object.keys(filterData),
        datasets: [{
          label: "Đã hoàn thành",
          data: Object.values(filterData).map(item => item.complete),
          backgroundColor: "#1DB95480",
          borderColor: "#1DB954",
          borderWidth: 1,
        }, {
          label: "Chưa hoàn thành",
          data: Object.values(filterData).map(item => item.total - item.complete),
          backgroundColor: "#FF000080",
          borderColor: "#FF0000",
          borderWidth: 1,
        }],
      })
    }
  }, [schedule])

  const studentData = [{
    icon: <FaceIcon className="text-primary" fontSize="inherit" />,
    title: "Họ tên",
    value: studentProfile.displayName
  }, {
    icon: <GroupIcon style={{ color: "#499cf5" }} fontSize="inherit" />,
    title: "Giới tính",
    value: studentProfile.gender
  }, {
    icon: <CakeIcon style={{ color: "#F7A7BF" }} fontSize="inherit" />,
    title: "Ngày sinh",
    value: studentProfile.birthday
  }, {
    icon: <FingerprintIcon style={{ color: "#ff3672" }} fontSize="inherit" />,
    title: "Mã sinh viên",
    value: studentProfile.studentCode
  }, {
    icon: <WorkOutlineIcon style={{ color: "#8a1131" }} fontSize="inherit" />,
    title: "Chuyên ngành",
    value: getMajorsName(studentProfile.studentCode)
  }]

  return (
    <HomeLayout title="KMA | Thông tin sinh viên">
      <div className={[styles.container, "fade"].join(" ")}>
        <div className={styles.background}>
          <img src={getAvatarUrl(studentProfile.displayName, 132)} alt="" />
        </div>
        <div className={["px-12 pb-12", styles.content].join(" ")}>
          <div className="background-white px-24 py-16 border-r8 box-shadow">
            <div className="font-700 mb-8">Thông tin cá nhân</div>
            <div className={styles.cards}>
              {studentData.map((item, idx) =>
                <div className="d-flex background-grey px-12 py-8  border-r8" key={idx}>
                  <div className="mr-12 text-26">{item.icon}</div>
                  <div className="d-flex flex-col">
                    <div className="font-500 text-grey">{item.title}</div>
                    <div className="font-700">{item.value}</div>
                  </div>
                </div>)}
            </div>
          </div>
          <div className={["background-white px-24 py-16 border-r8 box-shadow", styles.chart].join(" ")}>
            <div className="font-700 mb-8">Học phần đã đăng kí</div>
            <Bar data={chartData} height={400} width={800} options={chartOptions} />
          </div>
        </div>
      </div>
    </HomeLayout >
  );
}

export default Profile;