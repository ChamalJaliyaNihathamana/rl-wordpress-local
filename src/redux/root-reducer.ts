import { combineReducers } from "redux";
import advertisementReducer from "./advertisemnet/advertisement.reducer";
import authReducer from "./auth/auth.reducer";
import marketReducer from "./market/market.reducer";
import orderReducer from "./order/order.reducer";
import pickupReducer from "./PickupAddress/pickup.reducers";
import userReducer from "./user/user.reducer";
import adminReducer from "./admin/admin.reducer";

const rootReducer = combineReducers({
  auth: authReducer,
  user: userReducer,
  market: marketReducer,
  advertisement: advertisementReducer,
  order: orderReducer,
  pickup: pickupReducer,
  admin: adminReducer,
});

export default rootReducer;
