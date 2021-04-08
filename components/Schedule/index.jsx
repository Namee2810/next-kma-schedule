import { Badge, Popover } from 'antd';
import Calendar from 'components/ui/Calendar';
import useWidth from 'hooks/useWidth';
import formatLessons from 'modules/formatLesson';
import React, { useEffect, useState } from 'react';
import styles from "./styles.module.scss";

function Schedule(props) {
  const { schedule } = props;
  const width = useWidth();
  const [fullscreen, setFullscreen] = useState(true);
  const getSubjects = (value) => {
    let listSubjects = [];
    if (schedule.length > 0)
      schedule.forEach(item => {
        let day = item.day.split("/");
        if (value.date === Number(day[0])
          && value.month + 1 === Number(day[1])
          && value.year === Number(day[2])) listSubjects.push(item);
      });

    return listSubjects;
  }
  const dateCellRender = (value) => {
    const listSubjects = getSubjects(value);
    if (listSubjects.length > 0)
      return (
        fullscreen ?
          <div className={styles.Schedule_events}>
            {listSubjects.map(item => (
              <Popover placement="right" trigger="hover"
                title={<b>{item.subjectName} ({item.subjectCode})</b>}
                content={
                  <div className={styles.Schedule_event}>
                    <div>
                      <span className={styles["Schedule_event-key"]}>Thời gian:</span>
                      <span className={styles["Schedule_event-value"]}>
                        {item.day} {formatLessons(item.lesson, 1)}
                      </span>
                    </div>
                    <div>
                      <span className={styles["Schedule_event-key"]}>Phòng:</span>
                      <span className={styles["Schedule_event-value"]}>
                        {item.room ? (item.room === "san bai San" ? "Sân tập" : item.room) : "-"}
                      </span>
                    </div>
                    <div>
                      <span className={styles["Schedule_event-key"]}>Giáo viên:</span>
                      <span className={styles["Schedule_event-value"]}>
                        {item.teacher ? item.teacher : "-"}
                      </span>
                    </div>
                  </div>
                }
                key={item.subjectCode + item.day}
              >
                <div className={styles.Schedule_event}>
                  <span className={styles["Schedule_event-key"]}>{formatLessons(item.lesson, 2)[0]}</span>
                  <span className={styles["Schedule_event-value"]}>{item.subjectName}</span>
                </div>
              </Popover>
            ))}
          </div>
          : <div><Badge count={listSubjects.length} /></div>
      );
  }

  useEffect(() => {
    if (width > 768) {
      if (!fullscreen) setFullscreen(true);
    }
    else {
      if (fullscreen) setFullscreen(false);
    }

  }, [width, fullscreen]);

  const onSelect = (value) => {
    setSubjects(getSubjects(value));
    setTimeout(() => {
      const schedule_mobile = document.getElementById("Schedule_mobile");
      if (schedule_mobile) schedule_mobile.scrollIntoView(false);
    }, 500);
  }

  const [subjects, setSubjects] = useState(getSubjects((() => {
    const date = new Date();
    return { date: date.getDate(), month: date.getMonth(), year: date.getFullYear() }
  })()));

  return (
    <div className={styles.Schedule}>
      <Calendar
        className={styles.Schedule_calendar}
        fullscreen={fullscreen}
        dateCellRender={dateCellRender}
        onSelect={onSelect} />
      {
        !fullscreen && <div className={styles.Schedule_mobile} id="Schedule_mobile">
          {subjects.length > 0
            ? <div>
              {subjects.map(item => (
                <div className={styles.Schedule_item} key={item.subjectCode + item.day}>
                  <div className={styles["Schedule_item-time"]}>
                    <div>
                      <div>{item.day}</div>
                      <div>{formatLessons(item.lesson, 1)}</div>
                    </div>
                  </div>
                  <div className={styles["Schedule_item-detail"]}>
                    <div>
                      <div className={styles["Schedule_item-key"]}>Môn học</div>
                      <div className={styles["Schedule_item-value"]}>{item.subjectName}</div>
                    </div>
                    <div>
                      <div className={styles["Schedule_item-key"]}>Phòng</div>
                      <div className={styles["Schedule_item-value"]}>{item.room ? item.room : "-"}</div>
                    </div>
                    <div>
                      <div className={styles["Schedule_item-key"]}>Giáo viên</div>
                      <div className={styles["Schedule_item-value"]}>{item.teacher ? item.teacher : "-"}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            : <div style={{
              background: "red", color: "white",
              padding: "10px", borderRadius: "20px"
            }}>
              Không có tiết học trong ngày này
            </div>}
        </div>
      }
    </div>
  );
}

export default Schedule;