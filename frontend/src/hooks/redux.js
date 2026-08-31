import { useSelector } from "react-redux";
export const useUser = () => {
  return useSelector((state) => state.auth.user);
};

export const useAuth = () => {
  return useSelector((state) => state.auth.isAuthenticated);
};

export const useProjects = () => {
  return useSelector((state) => state.projects.project);
};

export const useCompleteProject = () => {
  return useSelector((state) => state.projects.completeProjects);
};

export const useTasks = () => {
  return useSelector((state) => state.tasks.tasks);
};

export const useActiveTasks = () => {
  return useSelector((state) => state.tasks.activeTasks);
};
