import { createSelector } from "reselect";
import { RootState } from "../store";

const selectAdvertisements = (state: RootState) => state.advertisement;

export const selectAdvertisementList = createSelector(
  [selectAdvertisements],
  (advertisement) => advertisement.advertisementList
);
