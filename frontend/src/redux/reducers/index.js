import { combineReducers } from "redux";
import { authReducer } from "./AuthReducers";

const userReducer = combineReducers({
    users: authReducer
});

export default userReducer;