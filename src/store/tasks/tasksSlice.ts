import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { Task, TaskStatus } from '@/types/models';
import { CreateTaskDto, UpdateTaskDto, TaskFilterParams } from '@/types/api';
import { taskService } from '@/services/task.service';

interface TasksState {
  tasks: Task[];
  currentTask: Task | null;
  isLoading: boolean;
  error: string | null;
  filter: Partial<TaskFilterParams>;
  totalTasks: number;
}

const initialState: TasksState = {
  tasks: [],
  currentTask: null,
  isLoading: false,
  error: null,
  filter: {},
  totalTasks: 0,
};

// 非同期アクション
export const fetchTasks = createAsyncThunk(
  'tasks/fetchTasks',
  async ({ projectId, params }: { projectId: string; params?: TaskFilterParams }) => {
    const response = await taskService.getTasksByProject(projectId, params);
    return response;
  }
);

export const fetchTaskById = createAsyncThunk(
  'tasks/fetchTaskById',
  async (taskId: string) => {
    const response = await taskService.getTaskById(taskId);
    return response;
  }
);

export const createTask = createAsyncThunk(
  'tasks/createTask',
  async ({ projectId, data }: { projectId: string; data: CreateTaskDto }) => {
    const response = await taskService.createTask(projectId, data);
    return response;
  }
);

export const updateTask = createAsyncThunk(
  'tasks/updateTask',
  async ({ taskId, data }: { taskId: string; data: UpdateTaskDto }) => {
    const response = await taskService.updateTask(taskId, data);
    return response;
  }
);

export const updateTaskStatus = createAsyncThunk(
  'tasks/updateTaskStatus',
  async ({ taskId, status }: { taskId: string; status: TaskStatus }) => {
    const response = await taskService.updateTaskStatus(taskId, status);
    return response;
  }
);

export const deleteTask = createAsyncThunk(
  'tasks/deleteTask',
  async (taskId: string) => {
    await taskService.deleteTask(taskId);
    return taskId;
  }
);

export const assignTask = createAsyncThunk(
  'tasks/assignTask',
  async ({ taskId, userId }: { taskId: string; userId: string | null }) => {
    const response = await taskService.assignTask(taskId, userId);
    return response;
  }
);

const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    setCurrentTask: (state, action: PayloadAction<Task | null>) => {
      state.currentTask = action.payload;
    },
    setFilter: (state, action: PayloadAction<Partial<TaskFilterParams>>) => {
      state.filter = action.payload;
    },
    clearTaskError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    // タスク一覧取得
    builder
      .addCase(fetchTasks.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchTasks.fulfilled, (state, action) => {
        state.isLoading = false;
        state.tasks = action.payload.data;
        state.totalTasks = action.payload.pagination.total;
      })
      .addCase(fetchTasks.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || 'タスクの取得に失敗しました';
      });

    // タスク詳細取得
    builder
      .addCase(fetchTaskById.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchTaskById.fulfilled, (state, action) => {
        state.isLoading = false;
        state.currentTask = action.payload;
      })
      .addCase(fetchTaskById.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || 'タスクの取得に失敗しました';
      });

    // タスク作成
    builder
      .addCase(createTask.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(createTask.fulfilled, (state, action) => {
        state.isLoading = false;
        state.tasks.unshift(action.payload);
        state.totalTasks += 1;
      })
      .addCase(createTask.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || 'タスクの作成に失敗しました';
      });

    // タスク更新
    builder
      .addCase(updateTask.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(updateTask.fulfilled, (state, action) => {
        state.isLoading = false;
        const index = state.tasks.findIndex(t => t.id === action.payload.id);
        if (index !== -1) {
          state.tasks[index] = action.payload;
        }
        if (state.currentTask?.id === action.payload.id) {
          state.currentTask = action.payload;
        }
      })
      .addCase(updateTask.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || 'タスクの更新に失敗しました';
      });

    // タスクステータス更新
    builder
      .addCase(updateTaskStatus.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(updateTaskStatus.fulfilled, (state, action) => {
        state.isLoading = false;
        const index = state.tasks.findIndex(t => t.id === action.payload.id);
        if (index !== -1) {
          state.tasks[index] = action.payload;
        }
        if (state.currentTask?.id === action.payload.id) {
          state.currentTask = action.payload;
        }
      })
      .addCase(updateTaskStatus.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || 'ステータスの更新に失敗しました';
      });

    // タスク削除
    builder
      .addCase(deleteTask.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(deleteTask.fulfilled, (state, action) => {
        state.isLoading = false;
        state.tasks = state.tasks.filter(t => t.id !== action.payload);
        state.totalTasks -= 1;
        if (state.currentTask?.id === action.payload) {
          state.currentTask = null;
        }
      })
      .addCase(deleteTask.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || 'タスクの削除に失敗しました';
      });

    // タスク担当者割り当て
    builder
      .addCase(assignTask.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(assignTask.fulfilled, (state, action) => {
        state.isLoading = false;
        const index = state.tasks.findIndex(t => t.id === action.payload.id);
        if (index !== -1) {
          state.tasks[index] = action.payload;
        }
        if (state.currentTask?.id === action.payload.id) {
          state.currentTask = action.payload;
        }
      })
      .addCase(assignTask.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || '担当者の割り当てに失敗しました';
      });
  },
});

export const { setCurrentTask, setFilter, clearTaskError } = tasksSlice.actions;
export default tasksSlice.reducer;