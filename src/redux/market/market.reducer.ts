import { AnyAction } from "redux";
import { MarketModel } from "../../shared/model/Market";

export interface MarketState {
  marketList: MarketModel[];
  marketAvailability: boolean;
  distantCharge: number;
}

const INITIAL_STATE = {
  marketList: [],
  marketAvailability: false,
  distantCharge: 0,
};
export const marketReducer = (
  state: MarketState = INITIAL_STATE,
  action: AnyAction
): MarketState => {
  const { type, payload } = action;
  switch (type) {
    case "GET_MARKET_LIST": {
      return { ...state, marketList: payload.marketList };
    }
    case "CHECK_MARKET": {
      return {
        ...state,
        marketAvailability: true,
        distantCharge: payload.distantCharge,
      };
    }
    case "SET_MARKET": {
      return { ...state, marketAvailability: false };
    }
    default:
      return state;
  }
};

export default marketReducer;
