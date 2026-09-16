import adminAxios from "./axiosInstance";

export const getHotelListings = () => adminAxios.get("/hotelListings");
export const createHotelListing = (data) =>adminAxios.post("/hotelListings" , data);
export const updateHotelListing = (id, data) => adminAxios.patch(`/hotelListings/${id}`, data);
export const deleteHotelListing = (id) => adminAxios.delete(`/hotelListings/${id}`);