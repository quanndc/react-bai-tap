import React, { useState } from 'react';
import { useProjects } from '../context/ProjectsContext';
import { useProjectsDispatch } from '../context/ProjectsDispatchContext';

function TaskItem({ task, projectId }) {
  const dispatch = useProjectsDispatch();
  const projects = useProjects();
  const [targetProjectId, setTargetProjectId] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [editedName, setEditedName] = useState(task.name);

  const handleMove = () => {
    if (targetProjectId && targetProjectId !== projectId) {
      dispatch({
        type: 'MOVE_TASK_BETWEEN_PROJECTS',
        fromProjectId: projectId,
        toProjectId: targetProjectId,
        taskId: task.id,
      });
      setTargetProjectId('');
    }
  };

  const handleEditSave = () => {
    if (editedName.trim() !== '') {
      dispatch({
        type: 'EDIT_TASK',
        projectId,
        taskId: task.id,
        name: editedName.trim(),
      });
      setIsEditing(false);
    }
  };

  return (
    <div className="task-item">
      <label className="task-left">
        <input
          type="checkbox"
          checked={task.completed}
          onChange={() =>
            dispatch({ type: 'TOGGLE_TASK', projectId, taskId: task.id })
          }
        />
        {isEditing ? (
          <input
            type="text"
            value={editedName}
            onChange={(e) => setEditedName(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') handleEditSave();
              if (e.key === 'Escape') {
                setEditedName(task.name);
                setIsEditing(false);
              }
            }}
            autoFocus
          />
        ) : (
          <span
            className={`task-name ${task.completed ? 'completed' : ''}`}
            onDoubleClick={() => setIsEditing(true)}
          >
            {task.name}
          </span>
        )}
      </label>

      <div className="task-actions">
        {isEditing ? (
          <button className="btn btn-save" onClick={handleEditSave}>
            Lưu
          </button>
        ) : (
          <button className="btn btn-edit" onClick={() => setIsEditing(true)}>
            Sửa
          </button>
        )}
        <select
          value={targetProjectId}
          onChange={(e) => setTargetProjectId(e.target.value)}
        >
          <option value="">Chuyển tới...</option>
          {projects
            .filter((p) => p.id !== projectId)
            .map((p) => (
              <option key={p.id} value={p.id}>
                {p.name}
              </option>
            ))}
        </select>
        <button className="btn btn-move" onClick={handleMove}>
          Di chuyển
        </button>
        <button
          className="btn btn-delete"
          onClick={() =>
            dispatch({ type: 'DELETE_TASK', projectId, taskId: task.id })
          }
        >
          Xóa
        </button>
      </div>
    </div>
  );
}

export default TaskItem;
