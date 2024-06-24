import { AuthActionTypes } from "../constants/AuthAction.types";

export const setUser = (user) => {
  return {
    type: AuthActionTypes.SET_USER,
    payload: user,
  };
};
