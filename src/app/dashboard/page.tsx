'use client';

import { useEffect } from 'react';
import { 
  Box, 
  Grid, 
  Typography, 
  Card, 
  CardContent,
  Skeleton,
  Paper,
  List,
  ListItem,
  ListItemText,
  Chip,
  LinearProgress
} from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '@/store';
import { useRequireAuth } from '@/hooks/useAuth';
import { fetchProjects } from '@/store/projects/projectsSlice';
import { fetchTasks } from '@/store/tasks/tasksSlice';
import { 
  TASK_STATUS_LABELS, 
  TASK_PRIORITY_LABELS,
  TASK_STATUS
} from '@/constants/app';
import { formatCalendarDate, getDueDateStatus } from '@/utils/date';
import { getPriorityColor, getStatusColor } from '@/utils/format';
import MainLayout from '@/components/layouts/MainLayout';

export default function DashboardPage() {
  const dispatch = useDispatch<AppDispatch>();
  const { user } = useRequireAuth();
  
  const { projects, isLoading: projectsLoading } = useSelector(
    (state: RootState) => state.projects
  );
  const { tasks, isLoading: tasksLoading } = useSelector(
    (state: RootState) => state.tasks
  );

  useEffect(() => {
    if (user) {
      // プロジェクトとタスクを取得
      dispatch(fetchProjects());
    }
  }, [dispatch, user]);

  useEffect(() => {
    if (user && projects.length > 0) {
      // TODO: 実際のAPIが実装されたら、今日のタスクを取得するように修正
      dispatch(fetchTasks({ 
        projectId: projects[0].id,
        params: { assigneeId: user.id, limit: 10, page: 1 }
      }));
    }
  }, [dispatch, user, projects]);

  // タスクの統計を計算
  const taskStats = {
    total: tasks.length,
    completed: tasks.filter(t => t.status === TASK_STATUS.COMPLETED).length,
    inProgress: tasks.filter(t => t.status === TASK_STATUS.IN_PROGRESS).length,
    notStarted: tasks.filter(t => t.status === TASK_STATUS.NOT_STARTED).length,
  };

  const completionRate = taskStats.total > 0 
    ? Math.round((taskStats.completed / taskStats.total) * 100) 
    : 0;

  const todayTasks = tasks.filter(task => {
    const dueDateStatus = getDueDateStatus(task.dueDate);
    return dueDateStatus === 'dueSoon' || dueDateStatus === 'overdue';
  });

  return (
    <MainLayout>
      <Box>
        <Typography variant="h4" component="h1" gutterBottom>
          ダッシュボード
        </Typography>
      
      <Typography variant="h6" color="text.secondary" gutterBottom>
        {user ? `ようこそ、${user.displayName}さん` : 'ようこそ'}
      </Typography>

      <Grid container spacing={3} sx={{ mt: 2 }}>
        {/* 統計カード */}
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Typography color="text.secondary" gutterBottom>
                全タスク
              </Typography>
              <Typography variant="h3">
                {projectsLoading ? <Skeleton width={60} /> : taskStats.total}
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Typography color="text.secondary" gutterBottom>
                進行中
              </Typography>
              <Typography variant="h3" color="primary">
                {projectsLoading ? <Skeleton width={60} /> : taskStats.inProgress}
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Typography color="text.secondary" gutterBottom>
                完了済み
              </Typography>
              <Typography variant="h3" color="success.main">
                {projectsLoading ? <Skeleton width={60} /> : taskStats.completed}
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Typography color="text.secondary" gutterBottom>
                完了率
              </Typography>
              <Typography variant="h3" color="success.main">
                {projectsLoading ? <Skeleton width={60} /> : `${completionRate}%`}
              </Typography>
              <LinearProgress 
                variant="determinate" 
                value={completionRate}
                color="success"
                sx={{ mt: 1 }}
              />
            </CardContent>
          </Card>
        </Grid>

        {/* 今日のタスク */}
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              今日のタスク
            </Typography>
            {tasksLoading ? (
              <Box>
                <Skeleton height={60} sx={{ mb: 1 }} />
                <Skeleton height={60} sx={{ mb: 1 }} />
                <Skeleton height={60} />
              </Box>
            ) : todayTasks.length > 0 ? (
              <List>
                {todayTasks.map((task) => (
                  <ListItem 
                    key={task.id} 
                    sx={{ 
                      border: 1, 
                      borderColor: 'divider',
                      borderRadius: 1,
                      mb: 1
                    }}
                  >
                    <ListItemText
                      primary={task.title}
                      secondary={
                        <Box sx={{ display: 'flex', gap: 1, mt: 0.5 }}>
                          <Chip
                            label={TASK_STATUS_LABELS[task.status]}
                            size="small"
                            sx={{
                              backgroundColor: getStatusColor(task.status),
                              color: 'white',
                            }}
                          />
                          <Chip
                            label={TASK_PRIORITY_LABELS[task.priority]}
                            size="small"
                            sx={{
                              backgroundColor: getPriorityColor(task.priority),
                              color: 'white',
                            }}
                          />
                          {task.dueDate && (
                            <Chip
                              label={formatCalendarDate(task.dueDate)}
                              size="small"
                              variant="outlined"
                            />
                          )}
                        </Box>
                      }
                    />
                  </ListItem>
                ))}
              </List>
            ) : (
              <Typography color="text.secondary">
                今日のタスクはありません
              </Typography>
            )}
          </Paper>
        </Grid>

        {/* 最近のプロジェクト */}
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              最近のプロジェクト
            </Typography>
            {projectsLoading ? (
              <Box>
                <Skeleton height={60} sx={{ mb: 1 }} />
                <Skeleton height={60} sx={{ mb: 1 }} />
                <Skeleton height={60} />
              </Box>
            ) : projects.length > 0 ? (
              <List>
                {projects.slice(0, 5).map((project) => (
                  <ListItem 
                    key={project.id}
                    sx={{ 
                      border: 1, 
                      borderColor: 'divider',
                      borderRadius: 1,
                      mb: 1,
                      cursor: 'pointer',
                      '&:hover': {
                        backgroundColor: 'action.hover',
                      }
                    }}
                  >
                    <Box
                      sx={{
                        width: 8,
                        height: 40,
                        backgroundColor: project.color,
                        borderRadius: 1,
                        mr: 2,
                      }}
                    />
                    <ListItemText
                      primary={project.name}
                      secondary={project.description}
                    />
                  </ListItem>
                ))}
              </List>
            ) : (
              <Typography color="text.secondary">
                プロジェクトがまだありません
              </Typography>
            )}
          </Paper>
        </Grid>
      </Grid>
      </Box>
    </MainLayout>
  );
}