import React, { useState } from 'react';
import { useProjectsDispatch } from '../context/ProjectsDispatchContext';
import TaskItem from './TaskItem';

function TaskList({ project }) {
  const dispatch = useProjectsDispatch();
  const [taskName, setTaskName] = useState('');

  const handleAddTask = (e) => {
    e.preventDefault();
    if (!taskName.trim()) return;

    dispatch({
      type: 'ADD_TASK',
      projectId: project.id,
      name: taskName,
    });

    setTaskName('');
  };

  return (
    <div className="task-list-container">
      <div className="project-header">
        <h2>Nhiệm vụ</h2>
      </div>

      <form className="task-form" onSubmit={handleAddTask}>
        <input
          className="task-input"
          placeholder="Thêm nhiệm vụ..."
          value={taskName}
          onChange={(e) => setTaskName(e.target.value)}
        />
        <button className="btn btn-add" type="submit">Thêm</button>
      </form>

      <div className="task-list">
        {project.tasks.map((task) => (
          <TaskItem key={task.id} task={task} projectId={project.id} />
        ))}
      </div>
    </div>
  );
}

export default TaskList;
