import axios from "axios";

const meApi = async () => {
  const API_URL =
    import.meta.env.VITE_BACKEND_API || "http://localhost:3000/api/v1";

  const token = localStorage.getItem("token");

  const me = await fetch(`${API_URL}/user/me`, {
    headers: {
      token,
    },
  });
  return me;
};

export default meApi;
