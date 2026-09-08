 import adminAxios from "./axiosInstance";

 export const getFlights =  () => adminAxios.get("/flights");
 export const deleteFlight = (id) => adminAxios.delete(`/flights/${id}`);