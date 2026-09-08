import adminAxios from "./axiosInstance";

export const getUsers = () => adminAxios.get("/users");
export const deleteUser = (id) => adminAxios.delete(`/users/${id}`);
export const updateUserRole = (id, role) => adminAxios.patch(`/users/${id}/role`, { role });