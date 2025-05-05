import React, { useState } from 'react';
import { useProjectsDispatch } from '../context/ProjectsDispatchContext';

function AddProject() {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const dispatch = useProjectsDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch({ type: 'ADD_PROJECT', name, description });
    setName('');
    setDescription('');
  };

  return (
    <form onSubmit={handleSubmit} className="add-project-form">
      <input
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Tên dự án"
        required
        className="input"
      />
      <input
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Mô tả"
        className="input"
      />
      <button type="submit" className="btn btn-add">Thêm</button>
    </form>
  );
}

export default AddProject;
