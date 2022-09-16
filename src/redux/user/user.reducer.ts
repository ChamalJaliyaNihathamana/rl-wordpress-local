
export interface UserStateData {
  brokerageList: any[];
}

const INITIAL_STATE = { 
  brokerageList: [],

};
export const userReducer = (
  state: UserStateData = INITIAL_STATE,
  action: any
) => {
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
