import axiosClient from "./axiosClient";

// Login function — saves token to localStorage on success
export const loginUser = async (credentials) => {
  const response = await axiosClient.post("/users/login", credentials);

  // FIX: persist token so axiosClient interceptor can attach it to all future requests
  if (response.data?.token) {
    localStorage.setItem("authToken", response.data.token); // consistent key: "authToken"
  }

  return response;
};
