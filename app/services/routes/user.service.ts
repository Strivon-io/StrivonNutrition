import axios from "axios";
import api from "~services/api";

export const login = async (data: {
  email: string;
  password: string;
}): Promise<{ accessToken: string; refreshToken: string }> => {
  const response = await axios.post(`http://localhost:8000/auth/signin`, data);
  return response.data;
};

export const createUser = async (
  data: CreateUser
): Promise<{
  accessToken: string;
}> => {
  const response = await axios.post(`http://localhost:8000/users`, {
    ...data,
    role: "user",
  });
  return response.data;
};

export const getProfile = async (): Promise<User> => {
  const response = await api.get("http://localhost:8000/users");

  return response.data;
};

export const deleteUser = async (): Promise<void> => {
  console.log("test");
  await api.delete("http://localhost:8000/users");
};
