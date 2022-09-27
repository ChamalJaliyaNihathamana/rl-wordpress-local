import { AnyAction } from "redux";

export interface AdminState {
  adminList: any[];
}

const INITIAL_STATE = {
  adminList: [],
};

export const adminReducer = (
  state: any = INITIAL_STATE,
  action: AnyAction
): AdminState => {
  const { type, payload } = action;

  switch (type) {
    case "GET_ADMIN_LIST": {
      return {
        ...state,
        adminList: payload.adminData,
      };
    }

    default:
      return state;
  }
};

export default adminReducer;
