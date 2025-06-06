import { apiClient } from './api';
import { API_ENDPOINTS } from '@/constants/api';
import { 
  CreateProjectDto, 
  UpdateProjectDto,
  InviteProjectMemberDto,
  PaginatedResponse,
  ApiResponse 
} from '@/types/api';
import { Project, ProjectMember, ProjectStats } from '@/types/models';

class ProjectService {
  async getProjects(): Promise<PaginatedResponse<Project>> {
    return apiClient.get<PaginatedResponse<Project>>(API_ENDPOINTS.PROJECTS.BASE);
  }

  async getProjectById(id: string): Promise<Project> {
    const response = await apiClient.get<ApiResponse<Project>>(
      API_ENDPOINTS.PROJECTS.BY_ID(id)
    );
    return response.data;
  }

  async createProject(data: CreateProjectDto): Promise<Project> {
    const response = await apiClient.post<ApiResponse<Project>>(
      API_ENDPOINTS.PROJECTS.BASE,
      data
    );
    return response.data;
  }

  async updateProject(id: string, data: UpdateProjectDto): Promise<Project> {
    const response = await apiClient.put<ApiResponse<Project>>(
      API_ENDPOINTS.PROJECTS.BY_ID(id),
      data
    );
    return response.data;
  }

  async deleteProject(id: string): Promise<void> {
    await apiClient.delete(API_ENDPOINTS.PROJECTS.BY_ID(id));
  }

  async archiveProject(id: string): Promise<Project> {
    const response = await apiClient.post<ApiResponse<Project>>(
      API_ENDPOINTS.PROJECTS.ARCHIVE(id)
    );
    return response.data;
  }

  async unarchiveProject(id: string): Promise<Project> {
    const response = await apiClient.post<ApiResponse<Project>>(
      API_ENDPOINTS.PROJECTS.UNARCHIVE(id)
    );
    return response.data;
  }

  async getProjectMembers(projectId: string): Promise<ProjectMember[]> {
    const response = await apiClient.get<ApiResponse<ProjectMember[]>>(
      API_ENDPOINTS.PROJECTS.MEMBERS(projectId)
    );
    return response.data;
  }

  async inviteMember(
    projectId: string,
    data: InviteProjectMemberDto
  ): Promise<ProjectMember> {
    const response = await apiClient.post<ApiResponse<ProjectMember>>(
      API_ENDPOINTS.PROJECTS.INVITE(projectId),
      data
    );
    return response.data;
  }

  async updateMemberRole(
    projectId: string,
    memberId: string,
    role: 'admin' | 'member'
  ): Promise<ProjectMember> {
    const response = await apiClient.patch<ApiResponse<ProjectMember>>(
      API_ENDPOINTS.PROJECTS.MEMBER_BY_ID(projectId, memberId),
      { role }
    );
    return response.data;
  }

  async removeMember(projectId: string, memberId: string): Promise<void> {
    await apiClient.delete(
      API_ENDPOINTS.PROJECTS.MEMBER_BY_ID(projectId, memberId)
    );
  }

  async getProjectStats(projectId: string): Promise<ProjectStats> {
    const response = await apiClient.get<ApiResponse<ProjectStats>>(
      API_ENDPOINTS.PROJECTS.STATS(projectId)
    );
    return response.data;
  }

  async searchProjects(query: string): Promise<Project[]> {
    const response = await apiClient.get<ApiResponse<Project[]>>(
      API_ENDPOINTS.SEARCH.PROJECTS,
      { params: { q: query } }
    );
    return response.data;
  }
}

export const projectService = new ProjectService();