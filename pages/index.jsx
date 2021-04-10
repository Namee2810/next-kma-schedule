import { notification } from "antd";
import Header from "components/Header";
import Nav from "components/Nav";
import Profile from "components/Profile";
import Schedule from "components/Schedule";
import Cookies from "js-cookie";
import authToken from 'modules/authToken';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import styles from "./styles.module.scss";

export default function Home() {
  const router = useRouter();
  const [student, setStudent] = useState();
  const [schedule, setSchedule] = useState();
  const [page, setPage] = useState(0);

  useEffect(async () => {
    const local = localStorage.getItem("schedule");
    if (!local) return router.push("/auth");

    const decoded = authToken(local);
    if (decoded) {
      setStudent(decoded.studentProfile);
      setSchedule(decoded.schedule);
    }
    else {
      notification.warn({ message: "Phiên đăng nhập không hợp lệ" });
      localStorage.removeItem("schedule");
      Cookies.remove("token");
      router.push("/auth");
    }
  }, [])

  return (
    <>
      <Head>
        <title>Thời khóa biểu KMA</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {
        (student && schedule) &&
        <div className={styles.MainPage}>
          <Header student={student} />
          <Nav studentCode={student.studentCode} schedule={schedule} setPage={setPage} />
          {page === 0 ?
            <>
              <Schedule schedule={schedule} />
            </>
            : <Profile student={student} schedule={schedule} />}
        </div>
      }
    </>
  )
}

// export async function getServerSideProps({ req, res }) {
//   const token = req.cookies.token;
//   if (!token)
//     return {
//       redirect: {
//         destination: '/auth',
//         permanent: false,
//       },
//     }
//   else if (!authToken(token))
//     return {
//       redirect: {
//         destination: '/auth',
//         permanent: false,
//       },
//     }
//   return {
//     props: {}
//   }
// }