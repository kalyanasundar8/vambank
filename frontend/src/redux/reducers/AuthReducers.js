import { AuthActionTypes } from "../constants/AuthAction.types";

const initialState = {
  users: null,
};

export const authReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case AuthActionTypes.SET_USER:
      return { ...state, users: payload };
    default:
      return state;
  }
};
