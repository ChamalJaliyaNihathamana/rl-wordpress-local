import { createSelector } from "reselect";
import { RootState } from "../store";

const selectUsers = (state: RootState) => state.user;

export const selectBrokerageList = createSelector(
  [selectUsers],
  (user) => user.brokerageList
);
export const selectAgentsList = createSelector(
  [selectUsers],
  (user) => user.userList
);
