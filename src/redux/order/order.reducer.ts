import { AnyAction } from "redux";

// import model for Order
export interface OrderState {
  orderList: any[];
}

const INITIAL_STATE = {
  orderList: [],
};

export const orderReducer = (
  state: OrderState = INITIAL_STATE,
  action: AnyAction
): OrderState => {
  
  const { type, payload } = action;
  switch (type) {
    case "GET_ORDER_LIST": {
      return {
        ...state,
        orderList: payload.orderList,
      };
    }

    default:
      return state;
  }
};

export default orderReducer;
