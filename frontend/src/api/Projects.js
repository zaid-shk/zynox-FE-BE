import { apiClient } from "./ApiClient";
import { token } from "../utils/Token";
export const projectApi = async () => {
  const response = await apiClient.get(`/api/v1/project/`, {
    headers: {
      token,
    },
  });

  //   console.log(response.data);
  return response.data.projects;
};

export const createProject = async (formData) => {
  const response = await apiClient.post("/api/v1/project/", formData, {
    headers: {
      token,
    },
  });

  // console.log(formData);

  return response.data;
};
export const completeProjectApi = async () => {
  const complete = await apiClient.get(`/api/v1/project/complete`, {
    headers: {
      token,
    },
  });

  //   console.log(response.data);
  return complete.data.complete;
};

export const isFavorite = async (projectId, fav) => {
  const favorite = await apiClient.patch(
    `/api/v1/project/${projectId}/favorite`,

    {
      fav: fav,
    },
    {
      headers: { token },
    },
  );

  return favorite.data;
};

export const deleteProjectApi = async (projectId) => {
  const deleteProject = await apiClient.delete(`/api/v1/project/${projectId}`, {
    headers: { token },
  });
  console.log(deleteProject);

  return deleteProject;
};

export const editProjectApi = async (projectId, formData) => {
  const editProject = await apiClient.put(
    `/api/v1/project/${projectId}`,
    {
      title: formData.title,
      description: formData.description,
      status: formData.status,
      color: formData.color,
    },

    {
      headers: { token },
    },
  );

  console.log(editProject.data.project);

  return editProject.data.project;
};

// export default {
//   projectApi,
//   completeProjectApi,
// };
