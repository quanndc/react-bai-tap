// ProjectsContext.js
import { createContext, useContext } from 'react';
export const ProjectsContext = createContext(null);
export const useProjects = () => useContext(ProjectsContext);
