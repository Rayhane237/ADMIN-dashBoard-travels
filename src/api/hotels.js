import adminAxios from "./axiosInstance";

export const getHotels = () => adminAxios.get("/hotels");
export const deleteHotel = (id) => adminAxios.delete(`/hotels/${id}`);