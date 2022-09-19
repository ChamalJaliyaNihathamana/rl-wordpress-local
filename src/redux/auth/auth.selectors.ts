//current user and auth
import { createSelector } from "reselect";
import { RootState } from "../store";

const selectAuth = (state: RootState) => state.auth;

export const selectAuthState = createSelector([selectAuth], (auth) => auth);
export const selectCurrentUser = createSelector(
  [selectAuth],
  (auth) => auth.currentUser
);
export const selectCurrentUserName = createSelector(
  [selectAuth],
  (auth) => auth.currentUser.first_name + " " + auth.currentUser.last_name
);
export const selectCurrentUserAddress = createSelector(
  [selectAuth],
  (auth) => auth.currentUser.address
);
