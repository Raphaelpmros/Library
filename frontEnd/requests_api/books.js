import fetchApi from "../axios/api";

export const viewBooks = async () => {
  try {
    const response = await fetchApi.get(`/books`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const findBooks = async (id) => {
  try {
    const response = await fetchApi.get(`/books/${id}`);
    if (!response.data) {
      throw new Error("No book found for the given ID"); // Lançar erro se a resposta estiver vazia ou nula
    }
    return response.data; // Retornar os dados do livro encontrado
  } catch (error) {
    console.error("Error in findBooks:", error); // Registrar o erro no console
    throw error; // Lançar o erro para ser tratado pelo código que chama essa função
  }
};

export const newBook = async (books, config) => {
  try {
    const response = await fetchApi.post(`/books`, books, config);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const updateBook = async (id, books, config) => {
  try {
    const response = await fetchApi.post(`/books/update`, id, books, config);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const deleteBooks = async (id, config) => {
  try {
    const response = await fetchApi.delete(`/books/${id}`, config);
    return response.data;
  } catch (error) {
    throw error;
  }
};
