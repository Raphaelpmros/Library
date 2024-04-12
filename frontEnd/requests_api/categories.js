import fetchApi from "../axios/api";

export const allCategories = async () => {
  try {
    const response = await fetchApi.get(`/categories`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const newCategories = async (categories, config) => {
  try {
    const response = await fetchApi.post(`/categories`, categories, config);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const updateCategories = async (id, categories, config) => {
  try {
    const response = await fetchApi.post(`/categories`, id, categories, config);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const deleteCategories = async (id) => {
  try {
    const response = await fetchApi.delete(`/categories/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};
