// store
import { AppThunk } from "../store";
import { GET_DISCOUNT_CODES_LIST } from "./discountCode.types";
// services
import DiscountCodeService from "../../api/discount.service";
// models and toaster
import { toast } from "react-toastify";

//get advertisement list
export const getAdvertisementList = (): AppThunk => async (dispatch) => {
  return DiscountCodeService.getDiscountCodesList().then(
    (response) => {
      dispatch({
        type: GET_DISCOUNT_CODES_LIST,
        payload: { discountCodesList: response.data },
      });
      toast.success("Discount Code List Fetched Successfully ...!");
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
