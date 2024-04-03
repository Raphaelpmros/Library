import fetchApi from "../axios/api";

export const allReviews = async () => {
  try {
    response = await fetchApi.get(`/reviews`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const newReviews = async (reviews, config) => {
  try {
    response = await fetchApi.post(`/reviews`, reviews, config);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const deleteReviews = async (id) => {
  try {
    response = await fetchApi.delete(`/reviews/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};
