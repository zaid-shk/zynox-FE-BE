import { apiClient } from "./ApiClient";
import { token } from "../utils/Token";
export const taskApi = async () => {
  const response = await apiClient.get(`/api/v1/task/`, {
    headers: {
      token,
    },
  });

  // console.log(response.data);
  return response.data;
};
export const activeTasksApi = async () => {
  const avtiveTasks = await apiClient.get(`/api/v1/task/activetasks`, {
    headers: {
      token,
    },
  });

  // console.log(response.data);
  return avtiveTasks.data;
};

// export default taskApi;
