import { AnyAction } from "redux";
import { UserProfileModel } from "../../client/model/UserProfile";
import { TokenModel } from "../../shared/model/Token";

const user = JSON.parse(localStorage.getItem("user") as any);
let currentUser: any, token: any;
if (user) {
  currentUser = user.currentUser;
  token = user.token;
} else {
  currentUser = null; 
  token = null;
}
export interface AuthState {
  currentUser: UserProfileModel;
  isLoggedIn: boolean;
  token: TokenModel;
}

const INITIAL_STATE = {
  currentUser: currentUser,
  token: token,
  isLoggedIn: false,
};

export const authReducer = (
  state: AuthState = INITIAL_STATE,
  action: AnyAction
): AuthState => {
  
  const { type, payload } = action;

  switch (type) {
    case "LOGIN_SUCCESS": {
      return {
        ...state,
        isLoggedIn: true,
        currentUser: payload.currentUser,
        token: payload.token,
      };
    }

    case "LOGIN_FAILED": {
      return {
        ...state,
        isLoggedIn: false,
        currentUser: null,
        token: null,
      };
    }

    case "LOGOUT": {
      return {
        ...state,
        currentUser: null,
        token: null,
        isLoggedIn: false,
        // user: null,
      };
    }

    case "REFRESH_TOKEN": {
      return {
        ...state,
        token: { ...state.token, accessToken: payload },
      };
    }

    default:
      return state;
  }
};

export default authReducer;
