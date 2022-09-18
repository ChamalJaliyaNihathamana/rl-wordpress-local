import { createSelector } from "reselect";
import { RootState } from "../store";

const selectMarkets = (state: RootState) => state.market;

export const selectMarketList = createSelector(
  [selectMarkets],
  (market) => market.marketList
);

export const selectMarketAvailability = createSelector(
  [selectMarkets],
  (market) => market.marketAvailability
);

export const selectDistantCharge = createSelector(
  [selectMarkets],
  (market) => market.distantCharge
);
