import fetchApi from "../axios/api";

export const viewCategories = async () => {
  try {
    const response = await fetchApi.get(`/categories`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const newCategories = async (formData) => {
  try {
    const response = await fetchApi.post(`/categories/new`, formData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const updateCategories = async (id, categories, config) => {
  try {
    const response = await fetchApi.post(`/categories/update`, id, categories, config);
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
