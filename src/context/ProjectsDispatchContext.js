// ProjectsDispatchContext.js
import { createContext, useContext } from 'react';
export const ProjectsDispatchContext = createContext(null);
export const useProjectsDispatch = () => useContext(ProjectsDispatchContext);
