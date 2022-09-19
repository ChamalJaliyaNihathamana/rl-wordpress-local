// store
import {  AppThunk } from "../store";
import { GET_ORDER_LIST } from "./order.types";
// services
import OrderService from "../../api/order.service";
// model and toaster
import { toast } from "react-toastify";

// Get User Orders
export const getOrderList =
  (): AppThunk =>
  async (dispatch) => {
    return OrderService.getUserOrderList().then(
      (response) => {
        dispatch({
          type: GET_ORDER_LIST,
          payload: { orderList: response.data },
        });
        console.log(response.data);
        // toast.success("Order List Fetched Successfully ...!");
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

