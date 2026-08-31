import axios from "axios";
import { useUser } from "../hooks/redux";

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_API || "http://localhost:3000",
});

const signInApi = async ({ name, username, email, password }) => {
  const response = await apiClient.post("/api/v1/user/signin", {
    email,
    password,
  });

  if (response.data.token) {
    localStorage.setItem("token", response.data.token);
  }
  if (response.success === true) {
    const data = await response.json();

    const user = await useUser(data);
    console.log(`user sss`, data);
  }
  return response.data;
};

export default signInApi;
