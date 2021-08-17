import CloseIcon from "@material-ui/icons/Close"
import GetAppIcon from "@material-ui/icons/GetApp"
import KeyboardReturnIcon from "@material-ui/icons/KeyboardReturn"
import MenuIcon from "@material-ui/icons/Menu"
import PhotoCameraIcon from "@material-ui/icons/PhotoCamera"
import { message, Tooltip } from "antd"
import useOnClickOutside from "hooks/useOnClickOutside"
import useWidth from "hooks/useWidth"
import { toPng } from "html-to-image"
import moment from "moment"
import React, { useEffect, useRef, useState } from "react"
import createIcsString from "utils/createIcsString"
import styles from "./styles.module.scss"

const length = 60

function getTransformStyle(idx, max) {
  let angle = ((idx * (90 / (max - 1))) / 180) * Math.PI
  let x = -Math.round(Math.cos(angle) * length) + "px",
    y = -Math.round(Math.sin(angle) * length) + "px"
  return `translate3d(${x}, ${y}, 0)`
}

export default function MenuCircle({ schedule, setDate }) {
  const width = useWidth()
  const ref = useRef()
  useOnClickOutside(ref, () => {
    if (open) setOpen(false)
  })

  const [open, setOpen] = useState(false)
  const items = [
    {
      title: "Chụp ảnh",
      icon: <PhotoCameraIcon />,
      onClick() {
        if (width <= 768)
          return message.info("Xoay ngang thiết bị hoặc dùng thiết bị lớn hơn")
        const calendarElement = document.getElementsByClassName(
          "ant-picker-calendar"
        )[0]
        const date = document.getElementById("calendar-date").textContent

        toPng(calendarElement).then((url) => {
          let downloadLink = document.createElement("a")
          downloadLink.href = url
          downloadLink.download = `${date}`

          document.body.appendChild(downloadLink)
          downloadLink.click()
          document.body.removeChild(downloadLink)
        })
      },
    },
    {
      title: "Tải .ics",
      icon: <GetAppIcon />,
      onClick() {
        let ics = createIcsString(schedule)
        let url = "data:text/calendar;charset=utf-8," + ics

        let downloadLink = document.createElement("a")
        downloadLink.href = url
        downloadLink.download = `thoikhoabieu.ics`

        document.body.appendChild(downloadLink)
        downloadLink.click()
        document.body.removeChild(downloadLink)
      },
    },
    {
      title: "Về hôm nay",
      icon: <KeyboardReturnIcon />,
      onClick() {
        setDate(moment())
      },
    },
  ]

  const handleClickMenuCircle = () => {
    setOpen(!open)
  }
  useEffect(() => {
    const menu_items = document.getElementsByClassName(styles.menu_item)
    if (open)
      [...menu_items].forEach((item, idx) => {
        item.style.opacity = 1
        item.style.transform = getTransformStyle(idx, menu_items.length)
      })
    else
      [...menu_items].forEach((item, idx) => {
        item.style.opacity = 0
        item.style.transform = "translate3d(0,0,0)"
      })
  }, [open])

  return (
    <>
      <div
        className={[styles.menu, "cursor-pointer"].join(" ")}
        ref={ref}
        onClick={handleClickMenuCircle}
      >
        {open ? <CloseIcon /> : <MenuIcon />}
      </div>
      <div className={styles.menu_items}>
        {items.map((item, idx) => (
          <Tooltip
            key={idx}
            trigger="hover"
            title={item.title}
            placement="left"
          >
            <div
              className={[styles.menu_item, "cursor-pointer"]}
              onClick={item.onClick}
              style={{ transitionDelay: idx * 0.1 + "s" }}
            >
              {item.icon}
            </div>
          </Tooltip>
        ))}
      </div>
    </>
  )
}
