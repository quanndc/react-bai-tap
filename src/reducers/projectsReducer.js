export const initialProjects = [];

export const projectsReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_PROJECT':
      return [...state, { id: Date.now(), name: action.name, description: action.description, tasks: [] }];

    case 'EDIT_PROJECT':
      return state.map(project =>
        project.id === action.id
          ? { ...project, name: action.name, description: action.description }
          : project
      );

    case 'DELETE_PROJECT':
      return state.filter(project => project.id !== action.id);

    case 'ADD_TASK':
      return state.map(project =>
        project.id === action.projectId
          ? {
              ...project,
              tasks: [...project.tasks, { id: Date.now(), name: action.name, completed: false }]
            }
          : project
      );

    case 'EDIT_TASK':
      return state.map(project =>
        project.id === action.projectId
          ? {
              ...project,
              tasks: project.tasks.map(task =>
                task.id === action.taskId ? { ...task, name: action.name } : task
              )
            }
          : project
      );

    case 'TOGGLE_TASK':
      return state.map(project =>
        project.id === action.projectId
          ? {
              ...project,
              tasks: project.tasks.map(task =>
                task.id === action.taskId ? { ...task, completed: !task.completed } : task
              )
            }
          : project
      );

    case 'DELETE_TASK':
      return state.map(project =>
        project.id === action.projectId
          ? {
              ...project,
              tasks: project.tasks.filter(task => task.id !== action.taskId)
            }
          : project
      );

      case 'MOVE_TASK_BETWEEN_PROJECTS': {
        const { fromProjectId, toProjectId, taskId } = action;
      
        let taskToMove = null;
      
        // Tách dự án nguồn và lấy task
        const newState = state.map(project => {
          if (String(project.id) === String(fromProjectId)) {
            const task = project.tasks.find(t => String(t.id) === String(taskId));
            if (task) {
              taskToMove = { ...task }; // Sao chép tránh tham chiếu
            }
      
            return {
              ...project,
              tasks: project.tasks.filter(t => String(t.id) !== String(taskId)),
            };
          }
          return project;
        });
      
        // Nếu không tìm thấy task, không làm gì
        if (!taskToMove) return state;
      
        // Thêm task vào dự án đích
        return newState.map(project => {
          if (String(project.id) === String(toProjectId)) {
            return {
              ...project,
              tasks: [...project.tasks, taskToMove],
            };
          }
          return project;
        });
      }
      
      
      

    default:
      return state;
  }
};
