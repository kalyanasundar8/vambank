import { AuthActionTypes } from "../constants/Auth.action.types";

const initialState = {
  users: null,
};

export const authReducers = (state = initialState, { type, payload }) => {
  switch (type) {
    case AuthActionTypes.SET_USER:
      return { ...state, users: payload };
    default:
      return state;
  }
};
