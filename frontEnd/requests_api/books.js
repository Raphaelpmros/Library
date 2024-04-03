import fetchApi from "../axios/api";

export const viewBooks = async () => {
  try {
    response = await fetchApi.get(`/books`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const newBook = async (books, config) => {
  try {
    response = await fetchApi.post(`/books`, books, config);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const updateBook = async (id, books, config) => {
    try {
        response = await fetchApi.post(`/books/update`, id, books, config);
        return response.data;
      } catch (error) {
        throw error;
      }
}

export const deleteBooks = async (id, config) => {
    try {
        response = await fetchApi.delete(`/books/${id}`, config);
        return response.data;
      } catch (error) {
        throw error;
      }
}