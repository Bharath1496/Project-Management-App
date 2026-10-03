import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getTasks , createTask as createTaskApi} from "../services/taskService";


const initialState = {
  tasks: [],

  loading: false,
  error: null,

  createLoading: false,
  createError: null
};

// =========================
// GET TASKS
// =========================
export const fetchTasks = createAsyncThunk(
  "tasks/fetchTasks",
  async () => {
    const response = await getTasks();

    return response.data;
  }
);

// =========================
// CREATE TASK
// =========================
export const createTask = createAsyncThunk(
  "tasks/createTask",
  async (form) => {

    const response = await createTaskApi(form);

    return response.data;
  }
);


// =========================
// SLICE
// =========================
const taskSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    // -------------------------
    // FETCH
    // -------------------------
  builder
    .addCase(fetchTasks.pending, (state) => {
      state.loading = true;
      state.error = null;
    })

    .addCase(fetchTasks.fulfilled, (state, action) => {
      state.loading = false;
      state.tasks = action.payload;
    })

    .addCase(fetchTasks.rejected, (state) => {
      state.loading = false;
      state.error = "Failed to fetch tasks";
    })

      // -------------------------
      // CREATE
      // -------------------------

      .addCase(createTask.pending, (state) => {
        state.createLoading = true;
        state.createError = null;
      })

      .addCase(createTask.fulfilled, (state, action) => {
        state.createLoading = false;

        state.tasks.push(action.payload);
      })

      .addCase(createTask.rejected, (state) => {
        state.createLoading = false;
        state.createError = "Failed to create task";
      });
    }
});

export default taskSlice.reducer;