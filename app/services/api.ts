import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const api = axios.create({
  baseURL: "http://localhost:3000",
});

api.interceptors.request.use(
  async (config) => {
    const token = await AsyncStorage.getItem("accessToken");

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
  (response) => response,
  async (error) => {
    console.log("error :", error);
    const originalRequest = error.config;

    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        const refreshToken = await AsyncStorage.getItem("refreshToken");
        const response = await api.post("/auth/refreshToken", {
          refreshToken,
        });

        await AsyncStorage.setItem(
          "accessToken",
          response.data.jwtAuthenticated
        );
        await AsyncStorage.setItem("refreshToken", response.data.refreshToken);

        api.defaults.headers.common[
          "Authorization"
        ] = `Bearer ${response.data.accessToken}`;
        return api(originalRequest);
      } catch (refreshError) {
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default api;
