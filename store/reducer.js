import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  student: {
    displayName: "",
    studentCode: "CT000000",
    gender: "Nam",
    birthday: "01/01/2000"
  },
  schedule: [],
  sign_in: false
}

const slice = createSlice({
  name: "store",
  initialState,
  reducers: {
    SIGN_IN(state, action) {
      const { student, schedule } = action.payload;
      state.schedule = schedule;
      state.student = student;
      state.sign_in = true;
    },
    SIGN_OUT(state, action) {
      state.sign_in = false;
    }
  }
})

const { actions, reducer } = slice;
export const { SIGN_IN, SIGN_OUT } = actions;
export default reducer;