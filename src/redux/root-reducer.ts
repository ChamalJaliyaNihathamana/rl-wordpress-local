import { combineReducers } from "redux";
import authReducer from "./auth/auth.reducer";
import marketReducer from "./market/market.reducer";
import userReducer from "./user/user.reducer";

const rootReducer = combineReducers({
  auth: authReducer,
  user: userReducer,
  market:marketReducer
});

export default rootReducer;
