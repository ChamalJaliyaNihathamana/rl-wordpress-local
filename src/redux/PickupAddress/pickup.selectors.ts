import { createSelector } from "reselect";
import { RootState } from "../store";

const selectPickUp = (state: RootState) => state.pickup;

export const selectPickUpState = createSelector(
  [selectPickUp],
  (pickup) => pickup.pickupState
);
export const selectPickUpAddress = createSelector(
  [selectPickUpState],
  (pickupState) => pickupState.pickupAddress
);
