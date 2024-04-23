import fetchApi from "../axios/api";

export const allReviews = async (id_books) => {
  try {
    const response = await fetchApi.get(`/reviews/${id_books}`);
    return response.data
  } catch (error) {
    throw error;
  }
};

export const newReviews = async (id, formData) => {
  try {
    const response = await fetchApi.post(`/reviews/${id}`, formData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const deleteReviews = async (id, id_books) => {
  try {
    console.log("rota", id, id_books)
    const response = await fetchApi.delete(`/reviews/${id_books}/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};
