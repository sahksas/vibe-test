import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { Project, ProjectMember, ProjectStats } from '@/types/models';
import { CreateProjectDto, UpdateProjectDto } from '@/types/api';
import { projectService } from '@/services/project.service';

interface ProjectsState {
  projects: Project[];
  currentProject: Project | null;
  projectMembers: ProjectMember[];
  projectStats: ProjectStats | null;
  isLoading: boolean;
  error: string | null;
}

const initialState: ProjectsState = {
  projects: [],
  currentProject: null,
  projectMembers: [],
  projectStats: null,
  isLoading: false,
  error: null,
};

// 非同期アクション
export const fetchProjects = createAsyncThunk(
  'projects/fetchProjects',
  async () => {
    const response = await projectService.getProjects();
    return response.data;
  }
);

export const fetchProjectById = createAsyncThunk(
  'projects/fetchProjectById',
  async (projectId: string) => {
    const response = await projectService.getProjectById(projectId);
    return response;
  }
);

export const createProject = createAsyncThunk(
  'projects/createProject',
  async (projectData: CreateProjectDto) => {
    const response = await projectService.createProject(projectData);
    return response;
  }
);

export const updateProject = createAsyncThunk(
  'projects/updateProject',
  async ({ id, data }: { id: string; data: UpdateProjectDto }) => {
    const response = await projectService.updateProject(id, data);
    return response;
  }
);

export const deleteProject = createAsyncThunk(
  'projects/deleteProject',
  async (projectId: string) => {
    await projectService.deleteProject(projectId);
    return projectId;
  }
);

export const fetchProjectMembers = createAsyncThunk(
  'projects/fetchProjectMembers',
  async (projectId: string) => {
    const response = await projectService.getProjectMembers(projectId);
    return response;
  }
);

export const fetchProjectStats = createAsyncThunk(
  'projects/fetchProjectStats',
  async (projectId: string) => {
    const response = await projectService.getProjectStats(projectId);
    return response;
  }
);

const projectsSlice = createSlice({
  name: 'projects',
  initialState,
  reducers: {
    setCurrentProject: (state, action: PayloadAction<Project | null>) => {
      state.currentProject = action.payload;
    },
    clearProjectError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    // プロジェクト一覧取得
    builder
      .addCase(fetchProjects.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchProjects.fulfilled, (state, action) => {
        state.isLoading = false;
        state.projects = action.payload;
      })
      .addCase(fetchProjects.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || 'プロジェクトの取得に失敗しました';
      });

    // プロジェクト詳細取得
    builder
      .addCase(fetchProjectById.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchProjectById.fulfilled, (state, action) => {
        state.isLoading = false;
        state.currentProject = action.payload;
      })
      .addCase(fetchProjectById.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || 'プロジェクトの取得に失敗しました';
      });

    // プロジェクト作成
    builder
      .addCase(createProject.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(createProject.fulfilled, (state, action) => {
        state.isLoading = false;
        state.projects.push(action.payload);
        state.currentProject = action.payload;
      })
      .addCase(createProject.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || 'プロジェクトの作成に失敗しました';
      });

    // プロジェクト更新
    builder
      .addCase(updateProject.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(updateProject.fulfilled, (state, action) => {
        state.isLoading = false;
        const index = state.projects.findIndex(p => p.id === action.payload.id);
        if (index !== -1) {
          state.projects[index] = action.payload;
        }
        if (state.currentProject?.id === action.payload.id) {
          state.currentProject = action.payload;
        }
      })
      .addCase(updateProject.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || 'プロジェクトの更新に失敗しました';
      });

    // プロジェクト削除
    builder
      .addCase(deleteProject.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(deleteProject.fulfilled, (state, action) => {
        state.isLoading = false;
        state.projects = state.projects.filter(p => p.id !== action.payload);
        if (state.currentProject?.id === action.payload) {
          state.currentProject = null;
        }
      })
      .addCase(deleteProject.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || 'プロジェクトの削除に失敗しました';
      });

    // プロジェクトメンバー取得
    builder
      .addCase(fetchProjectMembers.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchProjectMembers.fulfilled, (state, action) => {
        state.isLoading = false;
        state.projectMembers = action.payload;
      })
      .addCase(fetchProjectMembers.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || 'メンバーの取得に失敗しました';
      });

    // プロジェクト統計取得
    builder
      .addCase(fetchProjectStats.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchProjectStats.fulfilled, (state, action) => {
        state.isLoading = false;
        state.projectStats = action.payload;
      })
      .addCase(fetchProjectStats.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || '統計情報の取得に失敗しました';
      });
  },
});

export const { setCurrentProject, clearProjectError } = projectsSlice.actions;
export default projectsSlice.reducer;