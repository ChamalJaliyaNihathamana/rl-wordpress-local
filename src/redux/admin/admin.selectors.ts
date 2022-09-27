import { createSelector } from "reselect";
import { RootState } from "../store";

const selectAdmin = (state: RootState) => state.admin;

export const selectAdminList = createSelector(
  [selectAdmin],
  (admin) => admin.adminList
);