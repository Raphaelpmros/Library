import fetchApi from "../axios/api";

export const allRents = async () => {
  try {
    const response = await fetchApi.get(`/rents`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const newRents = async (rent) => {
  try {
    const response = await fetchApi.post(`/rents/new`, rent.id_book, rent.id_user);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const updateRents = async (id, rents, config) => {
  try {
    const response = await fetchApi.post(`/rents`, id, rents, config);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const deleteRents = async (id) => {
  try {
    const response = await fetchApi.delete(`/rents/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};
