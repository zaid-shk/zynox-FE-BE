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

export const completeProjectApi = async () => {
  const complete = await apiClient.get(`/api/v1/project/complete`, {
    headers: {
      token,
    },
  });

  //   console.log(response.data);
  return complete.data.complete;
};

// export default {
//   projectApi,
//   completeProjectApi,
// };
