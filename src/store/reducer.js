import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { message } from "antd"
import axios from "axios"
import jwt from "jsonwebtoken"
import verifyToken from "utils/verifyToken"

const initialState = {
  studentProfile: {
    displayName: "",
    studentCode: "CT000000",
    gender: "Nam",
    birthday: "01/01/2000",
  },
  schedule: [],
  signed: false,
  signInLoading: false,
}

export const signIn = createAsyncThunk(
  "user/signIn",
  async ({ username, password }, { rejectWithValue }) => {
    try {
      const res = await (
        await axios.post(
          "https://heroku-kma-schedule-api.herokuapp.com/login",
          { username, password }
        )
      ).data
      return res
    } catch (err) {
      return rejectWithValue(err)
    }
  }
)
export const signInWithToken = createAsyncThunk(
  "user/signInWithToken",
  async (token, { rejectWithValue }) => {
    try {
      const decoded = await verifyToken(token)
      return decoded
    } catch (err) {
      return rejectWithValue()
    }
  }
)

const slice = createSlice({
  name: "user",
  initialState,
  reducers: {
    SIGN_IN(state, { payload }) {
      for (let key in payload) state[key] = payload[key]
      state.signed = true
    },
    SIGN_OUT(state, action) {
      localStorage.removeItem("token")
      for (let key in initialState) state[key] = initialState[key]
    },
  },
  extraReducers: {
    [signIn.pending]: (state, { payload }) => {
      state.signInLoading = true
    },
    [signIn.fulfilled]: (state, { payload }) => {
      state.signInLoading = false
      switch (payload.status) {
        case 400: {
          message.error("Mã sinh viên hoặc mật khẩu không chính xác 😢")
          break
        }
        case 200: {
          const { studentProfile, schedule } = payload
          state.studentProfile = studentProfile
          state.schedule = schedule
          state.signed = true

          const token = jwt.sign(
            { studentProfile, schedule },
            process.env.NEXT_PUBLIC_SECRET_KEY
          )
          localStorage.setItem("token", token)
          message.success("Đăng nhập thành công ✨")
          break
        }
        default: {
          message.error("Đã xảy ra lỗi, vui lòng thử lại sau 😢")
        }
      }
    },
    [signIn.rejected]: (state, { payload }) => {
      state.signInLoading = false
      message.error("Đã xảy ra lỗi, vui lòng thử lại sau 😢")
      console.error("reject", payload)
    },
    [signInWithToken.fulfilled]: (state, { payload }) => {
      const { studentProfile, schedule } = payload
      state.studentProfile = studentProfile
      state.schedule = schedule
      state.signed = true
      message.success("✨")
    },
    [signInWithToken.rejected]: (state, { payload }) => {
      localStorage.removeItem("token")
      message.error("Phiên đăng nhập không hợp lệ")
    },
  },
})

const { actions, reducer } = slice
export const { SIGN_IN, SIGN_OUT } = actions
export default reducer
