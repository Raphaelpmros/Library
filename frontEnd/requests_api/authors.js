import fetchApi from "../axios/api";

export const authors = async () => {
  try {
    const response = await fetchApi.get("/authors");
    return response.data;
  } catch (error) {
    throw error;
  }
};
