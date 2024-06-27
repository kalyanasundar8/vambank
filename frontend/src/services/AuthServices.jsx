import axios from "axios";

export const api = axios.create({
  baseURL: "http://localhost:5000/api",
});

export const userSignUp = (data) => {
  try {
    const response = api.post("/users/createUser", data);
    return response;
  } catch (error) {
    if (error) {
      // The request was made and the server responded with a status code outside the range of 2xx
      throw error.response;
    } else {
      // Something happened in setting up the request that triggered an Error
      throw new Error(error.message);
    }
  }
};
