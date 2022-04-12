import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "store";

interface State {
  projectModalOpen: boolean;
}

const initialState: State = {
  projectModalOpen: false,
};

export const projectListSlice = createSlice({
  name: "projectListSlice",
  initialState,
  reducers: {
    // reducer必须是纯函数，此处是因为immer这个库处理了下面的函数
    openProjectModal(state) {
      state.projectModalOpen = true;
    },
    closeProjectModal(state) {
      state.projectModalOpen = false;
    },
  },
});

export const projectListActions = projectListSlice.actions;
export const selectProjectModalOpen = (state: RootState) =>
  state.projectList.projectModalOpen;
