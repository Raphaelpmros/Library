import fetchApi from "../axios/api";

export const allRents = async () => {
  try {
    const response = await fetchApi.get(`/rents`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const findRents = async (id) => {
  try {
    const response = await fetchApi.get(`/rents/${id}`)
    return response.data
  } catch (error) {
    throw error
  }
}

export const newRents = async (rentData) => {
  console.log(rentData)
  try {
    const response = await fetchApi.post(`/rents/new`, rentData);
    return response.data;
  } catch (error) {
    console.log("deu erro: ", error)
    throw error;
  }
};

export const updateRents = async (id, rents, renewed) => {
  try {
    const response = await fetchApi.patch(`/rents/update/`, id, rents, renewed);
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
