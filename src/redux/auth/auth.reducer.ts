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
  resetPasswordEmail: string | null;
  emailVerifySuccess: boolean;
  userId: number | null;
}

const INITIAL_STATE = {
  currentUser: currentUser,
  token: token,
  isLoggedIn: false,
  resetPasswordEmail: "thejack@gmail.com",
  emailVerifySuccess: false,
  userId: null,
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

    case "REGISTER_SUCCESS": {
      return {
        ...state,
        isLoggedIn: false,
      };
    }

    case "REGISTER_FAIL": {
      return {
        ...state,
        isLoggedIn: false,
      };
    }

    case "UPDATE_SUCCESS": {
      return {
        ...state,
        currentUser: payload,
      };
    }

    case "GET_CURRENT_USER": {
      return state;
    }

    case "GET_REGISTER_ADDRESS": {
      return {
        ...state,
        currentUser: {
          address: payload.formattedAddress,
          city: payload.city,
          state: payload.state,
          zip_code: payload.postalCode,
        },
      };
    }

    case "CLEAR_REGISTER_ADDRESS": {
      return {
        ...state,
        currentUser: {
          address: null,
          city: null,
          state: null,
          zip_code: null,
        },
      };
    }
    case "RESET_PASSWORD_REQUEST": {
      return {
        ...state,
        resetPasswordEmail: payload.email,
      };
    }
    case "EMAIL_VERIFY_SUCCESS": {
      return {
        ...state,
        emailVerifySuccess: true,
        userId: payload.userId,
      };
    }

    case "GET_UPDATE_PROFILE_ADDRESS": {
      return {
        ...state,
        currentUser: {
          ...state.currentUser,
          address: payload.address,
          city: payload.city,
          state: payload.state,
          zip_code: payload.postalCode,
        },
      };
    }
    
    case "CLEAR_UPDATE_PROFILE_ADDRESS": {
      return {
        ...state,
        currentUser: {
          ...state.currentUser,
          address: "",
          city: "",
          state: "",
          zip_code: "",
        },
      };
    }
    default:
      return state;
  }
};

export default authReducer;
