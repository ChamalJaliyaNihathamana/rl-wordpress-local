// state
import { AppThunk } from "../store";
import {
  ADD_PICKUP,
  CLEAR_PICKUP_ADDRESS,
  GET_PICKUP_ADDRESS,
} from "./pickup.types";

// service
import UserService from "../../api/user.service";
// model and toast
import { toast } from "react-toastify";
import { InventoryPickupModel } from "../../client/model/InventoryPickup";
import { LocationInfoObject } from "../../shared/model/Location";

//TODO: we need to make every actions async awaitin order to get rid of the app dispatch type errors

export const addPickup =
  (propertyData: InventoryPickupModel): AppThunk =>
  async (dispatch) => {
    return UserService.setInventoryPickup(propertyData).then(
      (response) => {
        dispatch({
          type: ADD_PICKUP,
          payload: { propertyData },
        });
        toast.success(response.data.message);
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

export const getPickupAddress =
  (locationData: LocationInfoObject): AppThunk =>
  async (dispatch) => {
    dispatch({
      type: GET_PICKUP_ADDRESS,
      payload: {
        locationData,
      },
    });
  };

export const clearPickupAddress = (): AppThunk => async (dispatch) => {
  dispatch({
    type: CLEAR_PICKUP_ADDRESS,
  });
};
