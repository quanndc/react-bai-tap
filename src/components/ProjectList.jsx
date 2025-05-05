import React from 'react';
import { useProjects } from '../context/ProjectsContext';
import ProjectItem from './ProjectItem';

function ProjectList() {
  const projects = useProjects();

  if (projects.length === 0) {
    return <p>Chưa có dự án nào được thêm.</p>;
  }

  return (
    <div className="project-list">
      {projects.map(project => (
        <ProjectItem key={project.id} project={project} />
      ))}
    </div>
  );
}

export default ProjectList;
