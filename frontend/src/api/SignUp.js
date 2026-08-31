import axios from "axios";

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_API || "http://localhost:3000",
});

const signUpApi = async ({ name, username, email, password }) => {
  const response = await apiClient.post("/api/v1/user/signup", {
    name,
    username,
    email,
    password,
  });
  return response.data;
};

export default signUpApi;
