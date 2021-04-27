import { LoadingOutlined } from "@ant-design/icons";
import FaceIcon from '@material-ui/icons/Face';
import LockOutlinedIcon from "@material-ui/icons/LockOpenOutlined";
import { notification } from 'antd';
import axios from 'axios';
import classNames from "classnames";
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { useForm } from "react-hook-form";
import styles from "./styles.module.scss";

function AuthForm(props) {
  const router = useRouter();
  const { register, handleSubmit, formState: { errors } } = useForm();

  const [checking, setChecking] = useState(false);
  const [showPass, setShowPass] = useState(false);

  const onSubmit = async values => {
    if (!checking) {
      setChecking(true);
      await axios.post("https://heroku-kma-schedule-api.herokuapp.com/login", {
        username: values.username,
        password: values.password
      })
        .then(async res => {
          res = res.data;
          switch (res.status) {
            case 400: {
              notification.error({
                message: "Mã sinh viên hoặc mật khẩu không chính xác 😢",
              });
              setTimeout(() => {
                setChecking(false);
              }, 500);
              break
            }
            case 200: {
              notification.success({
                message: "Đăng nhập thành công 🎉",
              });
              localStorage.setItem("schedule", res.schedule);
              //Cookies.set("token", res.token);

              router.push("/");

              break;
            }
            default: {
              notification.error({
                message: "Đã xảy ra lỗi, vui lòng thử lại sau 😢",
              });
              setTimeout(() => {
                setChecking(false);
              }, 500);
            }
          }
        })
        .catch(err => {
          notification.error({
            message: "Đã xảy ra lỗi, vui lòng thử lại sau 😢 !",
          });
          console.log(err)
          setTimeout(() => {
            setChecking(false);
          }, 500);
        });
    }
  }

  return (
    <div className={styles.AuthForm} id="AuthForm">
      <form onSubmit={handleSubmit(onSubmit)} className={styles.form} autoComplete="off">
        <div className={classNames(styles.form_field, { [`${styles["form_field-error"]}`]: errors?.username })}>
          <FaceIcon className={styles["form_field-icon"]} style={{ fontSize: "30px" }} />
          <input type="text"
            className={styles.form_input}
            placeholder="Mã sinh viên"
            {...register('username', { required: true })} />
        </div>
        <div className={classNames(styles.form_field, { [`${styles["form_field-error"]}`]: errors?.password })}>
          <LockOutlinedIcon className={styles["form_field-icon"]} style={{ fontSize: "30px" }} />
          <input type={showPass ? "text" : "password"}
            className={styles.form_input}
            placeholder="Mật khẩu"
            onDoubleClick={() => setShowPass(!showPass)}
            {...register("password", { required: true })} />
        </div>
        <div style={{ fontSize: "14px" }}>Nhấn đúp vào ô mật khẩu để ẩn/hiện mật khẩu</div>
        <button type="submit" className={classNames("button", { [`${styles["form-checking"]}`]: checking })}>
          {checking ? <LoadingOutlined /> : "Đăng nhập"}
        </button>
      </form>
    </div >
  );
};

export default AuthForm;