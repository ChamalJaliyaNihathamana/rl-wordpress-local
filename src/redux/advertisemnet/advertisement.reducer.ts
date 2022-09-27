import { AnyAction } from "redux";
import { AdvertisementModel } from "../../shared/model/Advertisement";

export interface AdvertisementState {
  advertisementList: AdvertisementModel[];
}

const INITIAL_STATE = {
  advertisementList: [
    {
      id: "1",
      image:
        "https://images.unsplash.com/photo-1525869432193-0609caba6d2d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80",
      description: "ATTENTION CUSTOMERS: HOLIDAY HOURS!",
      title: "LIMITED TIME OFFER",
      startDate: "25/09/2022",
      endDate: "30/09/2022",
      className: "custom-title",
    },
    {
      id: "2",
      image:
        "https://images.unsplash.com/photo-1525869432193-0609caba6d2d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80",
      description: "ATTENTION CUSTOMERS: HOLIDAY HOURS!",
      title: "LIMITED TIME OFFER",
      startDate: "25/09/2022",
      endDate: "30/09/2022",
      className: "custom-title",
    },
    {
      id: "3",
      image:
        "https://images.unsplash.com/photo-1525869432193-0609caba6d2d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80",
      description: "ATTENTION CUSTOMERS: HOLIDAY HOURS!",
      title: "LIMITED TIME OFFER",
      startDate: "25/09/2022",
      endDate: "30/09/2022",
      className: "custom-title",
    },
  ],
};

export const advertisementReducer = (
  state: AdvertisementState = INITIAL_STATE,
  action: AnyAction
): AdvertisementState => {
  const { type, payload } = action;
  switch (type) {
    case "GET_ADVERTISEMENT_LIST": {
      return { ...state, advertisementList: payload.advertisementList };
    }
    default:
      return state;
  }
};

export default advertisementReducer;
