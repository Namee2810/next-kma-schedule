import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import { Badge, Calendar, Popover } from 'antd';
import useWidth from 'hooks/useWidth';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import getTimeFromLesson from 'utils/getTimeFromLessons';
import styles from "./styles.module.scss";

export default function Schedule({ schedule, date, setDate }) {
  const width = useWidth();
  const [mode, setMode] = useState("month")
  const [fullScreen, setFullScreen] = useState(width > 768);
  const [subjectsToday, setSubjectsToday] = useState([]);

  useEffect(() => {
    setSubjectsToday(getSubjects(date))
  }, [])
  useEffect(() => {
    if (width <= 768) {
      if (fullScreen) setFullScreen(false);
    }
    else if (!fullScreen) setFullScreen(true);
  }, [width])

  const handleClickPrevMonth = () => {
    let prevMonth = date.get("month") - 1, year = date.get("year");
    setDate(moment({ month: prevMonth < 0 ? 11 : prevMonth, year: prevMonth < 0 ? year - 1 : year }))
  }
  const handleClickNextMonth = () => {
    let nextMonth = date.get("month") + 1, year = date.get("year");
    setDate(moment({ month: nextMonth > 11 ? 0 : nextMonth, year: nextMonth > 11 ? year + 1 : year }))
  }
  const handleClickDate = () => {
    setMode(mode === "month" ? "year" : "month")
  }
  const handleSelect = (value) => {
    setDate(value)
    if (mode === "year") setMode("month")
    const subjects = getSubjects(value)
    setSubjectsToday(subjects);
  }

  const getSubjects = (value) => {
    return schedule.filter(item => item.day?.[0] === value.get("date") && item.day?.[1] === value.get("month") + 1 && item.day?.[2] === value.get("year"))
  }

  const headerRender = () => {
    return (
      <div className={[styles.calendar_header, "d-flex justify-center align-center"].join(" ")}>
        <div className="cursor-pointer mt-5" onClick={handleClickPrevMonth}><ChevronLeftIcon /></div>
        <div className="font-700 mx-24 text-20 text-primary cursor-pointer"
          onClick={handleClickDate} id="calendar-date"
        >
          {date.format('MMM, YYYY')}
        </div>
        <div className="cursor-pointer mt-5" onClick={handleClickNextMonth}><ChevronRightIcon /></div>
      </div>
    )
  }
  const dateCellRender = (value) => {
    const subjects = getSubjects(value)
    if (subjects) {
      return fullScreen ? subjects.map((item, idx) =>
        <div key={item.subjectCode + item.day[0]} className="text-center fade">
          <Popover placement="right" trigger="hover"
            title={<b>{item.subjectName} ({item.subjectCode})</b>}
            content={<>
              <div>
                <b className="text-underline text-primary">Thời gian:</b>
                <span className="font-500 ml-8">{item.day.join("/")} {getTimeFromLesson([item.lesson[0], item.lesson[2]])}</span>
              </div>
              <div className="mt-5">
                <b className="text-underline text-primary">Phòng:</b>
                <span className="font-500 ml-8">{item.room || "-"}</span>
              </div>
              <div className="mt-5">
                <b className="text-underline text-primary">Giáo viên:</b>
                <span className="font-500 ml-8">{item.teacher || "-"}</span>
              </div>
            </>}
          >
            <b className="text-primary text-underline">{getTimeFromLesson([item.lesson[0]])}</b>
            <span className="ml-8 font-500">{item.subjectName}</span>
          </Popover>
        </div>
      )
        : <Badge count={subjects.length} />
    }
  }
  return (
    <>
      <Calendar
        value={date}
        headerRender={headerRender}
        mode={mode}
        onSelect={handleSelect}
        dateCellRender={dateCellRender}
        fullscreen={fullScreen}
      />
      {!fullScreen && (subjectsToday.length ? <div className="my-16 d-flex flex-col align-center">
        {subjectsToday.map((item, idx) =>
          <div
            key={item.subjectCode + item.day[0]}
            style={{ animationDelay: idx * 0.15 + "s" }}
            className={[styles.calendar_item, "fadeToLeft"].join(" ")}
          >
            <div className={styles.calendar_item_time}>
              <div>
                <div>{item.day.join("/")}</div>
                <div>{getTimeFromLesson([item.lesson[0], item.lesson[2]])}</div>
              </div>
            </div>
            <div className={styles.calendar_item_detail}>
              <div>
                <div className={styles.calendar_item_key}>Môn học</div>
                <div className={styles.calendar_item_value}>{item.subjectName}</div>
              </div>
              <div>
                <div className={styles.calendar_item_key}>Phòng</div>
                <div className={styles.calendar_item_value}>{item.room ? item.room : "-"}</div>
              </div>
              <div>
                <div className={styles.calendar_item_key}>Giáo viên</div>
                <div className={styles.calendar_item_value}>{item.teacher ? item.teacher : "-"}</div>
              </div>
            </div>
          </div>)}
      </div>
        : <div className="my-16"><span className="background-red text-white border-r20 p-8 fade">Không có tiết học trong ngày này</span></div>)}
    </>
  )
}
