import React, { useState } from 'react';
import { useProjectsDispatch } from '../context/ProjectsDispatchContext';
import TaskList from './TaskList';

function ProjectItem({ project }) {
  const dispatch = useProjectsDispatch();
  const [editing, setEditing] = useState(false);
  const [name, setName] = useState(project.name);
  const [description, setDescription] = useState(project.description);
  const [collapsed, setCollapsed] = useState(false);

  const handleEdit = () => {
    dispatch({ type: 'EDIT_PROJECT', id: project.id, name, description });
    setEditing(false);
  };

  const handleDelete = () => {
    dispatch({ type: 'DELETE_PROJECT', id: project.id });
  };

  const totalTasks = project.tasks.length;
  const doneTasks = project.tasks.filter(task => task.completed).length;
  const pendingTasks = totalTasks - doneTasks;

  return (
    <div className={`project-card ${collapsed ? 'collapsed' : ''}`}>
      <div className="project-header" onClick={() => setCollapsed(!collapsed)}>
        <h3>
          <input type="checkbox" readOnly checked={doneTasks === totalTasks && totalTasks > 0} />
          &nbsp;{project.name}
        </h3>
        <span className="task-stats">
          Total: {totalTasks} | Done: {doneTasks} | Pending: {pendingTasks}
        </span>
      </div>

      {!collapsed && (
        <div className="project">
          {editing ? (
            <div className="edit-form">
              <input value={name} onChange={e => setName(e.target.value)} />
              <input value={description} onChange={e => setDescription(e.target.value)} />
              <button onClick={handleEdit} className="btn btn-save">Lưu</button>
            </div>
          ) : (
            <>
              <p>{project.description}</p>
              <div className="action-buttons">
                <button onClick={() => setEditing(true)} className="btn btn-edit">Sửa</button>
                <button onClick={handleDelete} className="btn btn-delete">Xóa</button>
              </div>
            </>
          )}

          <TaskList project={project} />
        </div>
      )}
    </div>
  );
}

export default ProjectItem;
