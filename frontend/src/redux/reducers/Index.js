import { combineReducers } from "redux";
import { authReducers } from "./Auth.reducers";

export const userReducer = combineReducers({
  users: authReducers,
});
