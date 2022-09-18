import { AnyAction } from "redux";

export interface UserState {
  brokerageList: any[];
}

const INITIAL_STATE = {
  brokerageList: [],
};
export const userReducer = (
  state: UserState = INITIAL_STATE,
  action: AnyAction
): UserState => {
  const { type, payload } = action;
  switch (type) {
    case "GET_BROKERAGES_LIST": {
      return { ...state, brokerageList: payload.brokerageList };
    }

    default:
      return state;
  }
};

export default userReducer;
