import fetchApi from "../axios/api";

export const viewAuthors = async () => {
  try {
    const response = await fetchApi.get(`/authors`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const newAuthor = async (authors, config) => {
  try {
    const response = await fetchApi.post(`/authors/new`, authors, config);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const updateAuthor = async (id, authors, config) => {
  try {
    const response = await fetchApi.post(
      `/authors/update`,
      id,
      authors,
      config
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const deleteAuthor = async (id) => {
  try {
    const response = await fetchApi.delete(`/authors/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};
