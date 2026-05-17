import axiosClient from "./axiosClient";
import { authService } from "./authService";

// Login function — saves token to localStorage on success
export const loginUser = async (credentials) => {
  const response = await axiosClient.post("/users/login", credentials);

   authService.setSession(response.data); // centralised handling

  return response;
};
