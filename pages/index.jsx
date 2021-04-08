import Header from "components/Header";
import Nav from "components/Nav";
import Profile from "components/Profile";
import Schedule from "components/Schedule";
import authToken from 'modules/authToken';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import styles from "./styles.module.scss";

export default function Home() {
  const router = useRouter()
  const [student, setStudent] = useState();
  const [schedule, setSchedule] = useState();
  const [page, setPage] = useState(0);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const decoded = authToken(token);
    if (decoded) {
      setStudent(decoded.studentProfile);
      setSchedule(decoded.schedule);
    }
    else {
      localStorage.removeItem("token");
      router.push("/auth")
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
          {page === 0 ? <Schedule schedule={schedule} />
            : <Profile student={student} schedule={schedule} />}
        </div>
      }
    </>
  )
}