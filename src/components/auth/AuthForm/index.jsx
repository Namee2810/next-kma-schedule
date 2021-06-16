import { Loading3QuartersOutlined } from "@ant-design/icons";
import FaceIcon from '@material-ui/icons/Face';
import LockOutlinedIcon from "@material-ui/icons/LockOpenOutlined";
import classNames from "classnames";
import React, { useState } from 'react';
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { signIn } from "store/reducer";
import styles from "./styles.module.scss";

function AuthForm(props) {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const dispatch = useDispatch();
  const signInLoading = useSelector(state => state.signInLoading)

  const [showPass, setShowPass] = useState(false);

  const onSubmit = async values => {
    if (signInLoading) return;
    dispatch(signIn({
      username: values.username,
      password: values.password
    }))
  }

  return (
    <div className={styles.container}>
      <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
        <div className={classNames(styles.form_field, { [styles["form_field-error"]]: errors?.username })}>
          <FaceIcon className={[styles["form_field-icon"], "text-30"]} />
          <input type="text"
            maxLength={10}
            className={styles.form_input}
            placeholder="Mã sinh viên"
            {...register('username', { required: true })} />
        </div>
        <div className={classNames(styles.form_field, { [styles["form_field-error"]]: errors?.password })}>
          <LockOutlinedIcon className={[styles["form_field-icon"], "text-30"]} />
          <input type={showPass ? "text" : "password"}
            className={styles.form_input}
            placeholder="Mật khẩu"
            onDoubleClick={() => setShowPass(!showPass)}
            {...register("password", { required: true })} />
        </div>
        <div className="text-14">Nhấn đúp vào ô mật khẩu để ẩn/hiện mật khẩu</div>
        <button id="form_submit" type="submit"
          className={classNames("button", { [styles.form_loading]: signInLoading })}>
          {signInLoading ? <Loading3QuartersOutlined className={styles["form_loading-icon"]} /> : "Đăng nhập"}
        </button>
      </form>
    </div >
  );
};

export default AuthForm;