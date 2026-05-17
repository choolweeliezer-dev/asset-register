import axiosClient from "./axiosClient";

const BASE_URL = "/subscriptions";

export const getSubscriptions = () => {
  return axiosClient.get(BASE_URL);
};

export const createSubscription = (data) => {
  return axiosClient.post(BASE_URL, data);
};

export const updateSubscription = (id, data) => {
  return axiosClient.put(`${BASE_URL}/${id}`, data);
};

export const deleteSubscription = (id) => {
  return axiosClient.delete(`${BASE_URL}/${id}`);
};

export const triggerEmailReminderTest = async () => {
  return axiosClient.post("/email/reminders/test");
};