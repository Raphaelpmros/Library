import fetchApi from "../axios/api";

export const allRents = async () => {
  try {
    response = await fetchApi.get(`/rents`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const newRents = async (rents, config) => {
  try {
    response = await fetchApi.post(`/rents`, rents, config);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const updateRents = async (id, rents, config) => {
  try {
    response = await fetchApi.post(`/rents`, id, rents, config);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const deleteRents = async (id) => {
  try {
    response = await fetchApi.delete(`/rents/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};
