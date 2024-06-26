import axios from "axios";

export const api = axios.create({
  baseURL: "http://localhost:6000/api",
});

export const userSignUp = (data) => {
  try {
    const response = api.post("/users/createUser", data);
    return response;
  } catch (error) {
    if (error) {
      throw error.response;
    } else {
      throw new Error(error.message);
    }
  }
};
