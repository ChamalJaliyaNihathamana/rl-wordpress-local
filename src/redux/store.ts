import { TypedUseSelectorHook, useSelector } from "react-redux";
import {
  createStore,
  applyMiddleware,
  compose,
  Dispatch,
  AnyAction,
} from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk, { ThunkAction } from "redux-thunk";

import rootReducer from "./root-reducer";

const middleware = [thunk];

const store = compose(composeWithDevTools(applyMiddleware(...middleware)))(
  createStore
)(rootReducer);

export default store;

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type RootStore = ReturnType<typeof rootReducer>;

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  AnyAction
>;
