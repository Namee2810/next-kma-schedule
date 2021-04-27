import { createSlice } from "@reduxjs/toolkit";

const slice = createSlice({
  name: "store",
  initialState: {
    student: {},
    schedule: []
  },
  reducers: {
    SET_STUDENT(state, action) {
      state.student = action.payload.student;
    },
    SET_SCHEDULE(state, action) {
      state.schedule = action.payload.schedule;
    },
  }
});

const { actions, reducer } = slice;
export const { SET_STUDENT, SET_SCHEDULE } = actions;
export default reducer;