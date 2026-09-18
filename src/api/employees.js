import adminAxios from "./axiosInstance";

export const getEmployees = () => adminAxios.get("/employees");
export const createEmployee = (data) =>adminAxios.post("/employees" , data);
export const updateEmployee = (id, data) => adminAxios.patch(`/employees/${id}`, data);
export const deleteEmployee = (id) => adminAxios.delete(`/employees/${id}`);