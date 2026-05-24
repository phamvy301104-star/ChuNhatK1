import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface Task {
  id: string;
  title: string;
  status: "todo" | "inProgress" | "done";
}

interface TasksState {
  tasks: Task[];
}

const initialState: TasksState = {
  tasks: [
    { id: "1", title: "Learn Redux Toolkit", status: "todo" },
    { id: "2", title: "Learn Context API", status: "inProgress" },
    { id: "3", title: "Master Drag & Drop", status: "done" },
  ],
};

const taskSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    addTask: (state, action: PayloadAction<Task>) => {
      state.tasks.push(action.payload);
    },
    removeTask: (state, action: PayloadAction<string>) => {
      state.tasks = state.tasks.filter((task) => task.id !== action.payload);
    },
    updateTask: (state, action: PayloadAction<Task>) => {
      const index = state.tasks.findIndex((task) => task.id === action.payload.id);
      if (index !== -1) {
        state.tasks[index] = action.payload;
      }
    },
    moveTask: (
      state,
      action: PayloadAction<{ taskId: string; status: "todo" | "inProgress" | "done" }>
    ) => {
      const task = state.tasks.find((t) => t.id === action.payload.taskId);
      if (task) {
        task.status = action.payload.status;
      }
    },
  },
});

export const { addTask, removeTask, updateTask, moveTask } = taskSlice.actions;
export default taskSlice.reducer;
