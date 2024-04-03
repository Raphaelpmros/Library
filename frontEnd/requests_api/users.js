import fetchApi from "../axios/api";

export const allUsers = async () => {
    try {
      response = await fetchApi.get(`/users`);
      return response.data;
    } catch (error) {
      throw error;
    }
  };
  
  export const newUsers = async (users, config) => {
    try {
      response = await fetchApi.post(`/users`, users, config);
      return response.data;
    } catch (error) {
      throw error;
    }
  };

  export const loginUser = async (users, config) => {
    try {
        const response = await apiFecth.post(`/users/login`, users, config);
        return response.data;
    } catch {
        console.log(error)
        throw error;
    }
}
  
  export const updateUsers = async (id, users, config) => {
    try {
      response = await fetchApi.post(`/users`, id, users, config);
      return response.data;
    } catch (error) {
      throw error;
    }
  };
  
  export const deleteUsers = async (id) => {
    try {
      response = await fetchApi.delete(`/users/${id}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  };