import { AppThunk } from "../store";
import {
  ADD_BROKERAGE,
  GET_BROKERAGES_LIST,
  GET_LINKED_ACCOUNTS_LIST,
  GET_USERS_LIST,
} from "./user.types";
// services
import BrokerageService from "../../api/brokerage.service";
import UserService from "../../api/user.service";
// models and toaster
import { toast } from "react-toastify";
import { BrokerageModel } from "../../shared/model/Brokerage";

// get brokerage list
export const getBrokerageList = (): AppThunk => async (dispatch) => {
  return BrokerageService.getBrokerageList().then(
    (response) => {
      dispatch({
        type: GET_BROKERAGES_LIST,
        payload: { brokerageList: response.data },
      });
      // toast.success("Brokerage List Fetched Successfully ...!");
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

export const getLinkedAccountList = (): AppThunk => async (dispatch) => {
  return UserService.getLinkedAccountList().then(
    (response) => {
      dispatch({
        type: GET_LINKED_ACCOUNTS_LIST,
        payload: { linkedAccountList: response.data },
      });
      toast.success("LinkedAccounts List Fetched Successfully ...!");
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

export const addBrokerage =
  (brokerage: BrokerageModel): AppThunk =>
  async (dispatch) => {
    dispatch({
      type: ADD_BROKERAGE,
      payload: { brokerage },
    });
    toast.success(brokerage.name + " Added Successfully !");
  };

  // get agents list
export const getUserList =
  (): AppThunk =>
  async (dispatch) => {
    return UserService.getUserList().then(
      (response) => {
        dispatch({
          type: GET_USERS_LIST,
          payload: { userList: response.data },
        });
        toast.success("user List Fetched Successfully ...!");
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
        //return Promise.reject();
      }
    );
  };

