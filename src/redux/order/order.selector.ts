import { createSelector } from "reselect";
import { RootState } from "../store";

const selectOrder = (state: RootState) => state.order;

export const selectOrdersList = createSelector(
  [selectOrder],
  (order) => order.orderList
);

