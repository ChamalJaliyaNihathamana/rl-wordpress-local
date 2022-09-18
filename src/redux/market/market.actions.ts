// store
import { AppThunk } from "../store";
import { CHECK_MARKET, GET_MARKET_LIST, SET_MARKET } from "./market.types";
// services
import MarketService from "../../api/market.service";
// modal and toaster
import { toast } from "react-toastify";

//get market list
export const getMarketList =
  (): AppThunk =>
  async (dispatch) => {
    return MarketService.getMarketList().then(
      (response) => {
        dispatch({
          type: GET_MARKET_LIST,
          payload: { marketList: response.data.data },
        });
        toast.success("Market List Fetched Successfully ...!");
        return Promise.resolve();
      },
      (error) => {
        const message =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();

        toast.warning(message);
        return Promise.reject();
      }
    );
  };

// market availability
  export const checkMarketValidity =
  (zip_code: number): AppThunk =>
  async (dispatch) => {
    return MarketService.marketValidity(zip_code).then(
      (response) => {
        dispatch({
          type: CHECK_MARKET,
          payload: { distantCharge: response.data.price_modifier },
        });
        // toast.success("Market Checking ...!");
        return Promise.resolve();
      },
      (error) => {
        const message =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();
        dispatch({
          type: SET_MARKET,
        });

        toast.warning("Sorry we aren't Available " + message);
        return Promise.reject();
      }
    );
  };