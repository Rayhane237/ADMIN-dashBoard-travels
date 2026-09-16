import adminAxios from "./axiosInstance";

export const getFlightListings = () => adminAxios.get("/flightListings");
export const createFlightListing = (data) =>adminAxios.post("/flightListings" , data);
export const updateFlightListing = (id, data) => adminAxios.patch(`/flightListings/${id}`, data);
export const deleteFlightListing = (id) => adminAxios.delete(`/flightListings/${id}`);