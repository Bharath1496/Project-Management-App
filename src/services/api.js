import axios from "axios";

const api = axios.create({
  baseURL: "/api",
  timeout: 10000
});

api.interceptors.request.use(
  (config) => {

    console.log("Request interceptor:", config);

    const token = localStorage.getItem("token");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },

  (error) => {
    return Promise.reject(error);
  }
);


api.interceptors.response.use(
  (response) => {
    console.log("Response interceptor:", response);

    return response;
  },

  (error) => {
    console.log("Response error:", error);
    
    if (error.response?.status === 401) {
        console.log("Unauthorized - token may be expired");
    }

    return Promise.reject(error);
  }
);

export default api;