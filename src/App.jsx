import React, { useReducer } from 'react';
import { ProjectsContext } from './context/ProjectsContext';
import { ProjectsDispatchContext } from './context/ProjectsDispatchContext';
import { projectsReducer, initialProjects } from './reducers/projectsReducer';
import './App.css';
import AddProject from './components/AddProject';
import ProjectList from './components/ProjectList';

function App() {
  const [projects, dispatch] = useReducer(projectsReducer, initialProjects);

  return (
    <ProjectsContext.Provider value={projects}>
      <ProjectsDispatchContext.Provider value={dispatch}>
        <div className="container">
          <h1 className="app-title">Quản lý Dự án & Nhiệm vụ</h1>

          <section className="card">
            <h2 className="section-title">Thêm Dự án</h2>
            <AddProject />
          </section>

          <section className="card">
            <h2 className="section-title">📋 Danh sách Dự án</h2>
            <ProjectList />
          </section>
        </div>
      </ProjectsDispatchContext.Provider>
    </ProjectsContext.Provider>
  );
}

export default App;
