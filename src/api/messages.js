import adminAxios from "./axiosInstance";

export const getMessages = () => adminAxios.get("/messages");
export const deleteMessage = (id) => adminAxios.delete(`/messages/${id}`);