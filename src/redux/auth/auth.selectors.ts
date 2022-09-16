//current user and auth
import { createSelector } from "reselect";
import { RootState } from "../store";

const selectAuth = (state: RootState) => state.auth;

export const selectCurrentUser = createSelector(
    [selectAuth],
    (auth) => auth.currentUser
  );