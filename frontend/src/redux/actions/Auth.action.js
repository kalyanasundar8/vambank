import { AuthActionTypes } from "../constants/Auth.action.types";

export const setUser = (user) => {
  return {
    type: AuthActionTypes.SET_USER,
    payload: user,
  };
};
