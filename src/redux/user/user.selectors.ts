import { createSelector } from "reselect";
import { RootState } from "../store";

const selectUsers = (state: RootState) => state.user;

// export const selectUserStates = createSelector(
//   [selectUsers],
//   (users) => users.userState
// );
// export const selectBrokerages = createSelector(
//   [selectUserStates],
//   (userState) => userState.brokerageState
// );
// export const selectAgents = createSelector(
//   [selectUserStates],
//   (userState) => userState.agentState
// );
// export const selectTitleCompany = createSelector(
//   [selectUserStates],
//   (userState) => userState.titleCompany
// );
// export const selectLinkAccounts = createSelector(
//   [selectUsers],
//   (users) => users.linkedAccountList
// );
