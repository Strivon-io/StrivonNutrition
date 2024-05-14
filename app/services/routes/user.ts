import axios from "axios";
import api from "~services/api";

export const login = async (data: {
  email: string;
  password: string;
}): Promise<{ accessToken: string; refreshToken: string }> => {
  const response = await axios.post(`http://localhost:8000/auth/signin`, data);
  return response.data;
};

export const createUser = async (data: {}): Promise<{
  accessToken: string;
}> => {
  const response = await axios.post(`http://localhost:8000/users`, data);
  return response.data;
};

export const getProfile = async (): Promise<User> => {
  const response = await api.get("/users");

  return response.data;
};
