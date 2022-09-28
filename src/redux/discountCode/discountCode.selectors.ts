import { createSelector } from "reselect";
import { RootState } from "../store";

const selectDiscountCodes = (state: RootState) => state.discountCode;

export const selectDiscountCodesList = createSelector(
  [selectDiscountCodes],
  (discountCodes) => discountCodes.discountCodesList
);
