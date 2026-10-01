import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  tasks: [
    {
      id: 1,
      title: "Design login page",
      description: "Create UI for login screen",
      status: "TODO",
      priority: "HIGH",
      assignedTo: "Bharath"
    },
    {
      id: 2,
      title: "Create authentication API",
      description: "Implement login REST API",
      status: "IN_PROGRESS",
      priority: "HIGH",
      assignedTo: "Rahul"
    },
    {
      id: 3,
      title: "Create database tables",
      description: "Create PostgreSQL schema",
      status: "COMPLETED",
      priority: "MEDIUM",
      assignedTo: "Bharath"
    },
    {
      id: 4,
      title: "Write documentation",
      description: "Document project APIs",
      status: "TODO",
      priority: "LOW",
      assignedTo: "Anil"
    }
  ],
  loading:false,
  error:null
};

export const fetchTasks = createAsyncThunk(
  "tasks/fetchTasks",
  async () => {
    await new Promise((resolve) => setTimeout(resolve, 2000));

    return [
      {
        id: 101,
        title: "Task from API",
        description: "This is temporary async data",
        status: "TODO",
        priority: "HIGH",
        assignedTo: "Bharath"
      }
    ];
  }
);

const taskSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    addTask: (state, action) => {
    state.tasks.push(action.payload);
  },

  updateTask: (state, action) => {
    const index = state.tasks.findIndex(
      (task) => task.id === action.payload.id
    );

    if (index !== -1) {
      state.tasks[index] = {
        ...state.tasks[index],
        ...action.payload
      };
    }
  },

  deleteTask: (state, action) => {
        state.tasks = state.tasks.filter(
        (task) => task.id !== action.payload
        );
    }
  },
  
  extraReducers: (builder) => {
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
    });
    }
});

export const {
  addTask,
  updateTask,
  deleteTask
} = taskSlice.actions;


export default taskSlice.reducer;