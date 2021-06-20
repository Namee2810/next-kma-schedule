import MenuCircle from "components/home/MenuCircle";
import Schedule from 'components/home/Schedule';
import HomeLayout from "layouts/HomeLayout";
import moment from "moment";
import { useState } from "react";
import { useSelector } from 'react-redux';

export default function Home() {
  const schedule = useSelector(state => state.schedule);
  const [date, setDate] = useState(moment());

  return (
    <HomeLayout title="KMA | Thời khóa biểu">
      <div className="fade">
        <Schedule schedule={schedule} date={date} setDate={setDate} />
        <MenuCircle schedule={schedule} setDate={setDate} />
      </div>
    </HomeLayout>
  )
}