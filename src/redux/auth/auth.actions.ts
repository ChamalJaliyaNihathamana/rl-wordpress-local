// store
import { AppThunk } from "../store";
import {
  CLEAR_BROKERAGE_ADDRESS,
  CLEAR_REGISTER_ADDRESS,
  CLEAR_UPDATE_PROFILE_ADDRESS,
  EMAIL_VERIFY_SUCCESS,
  GET_BROKERAGE_ADDRESS,
  GET_REGISTER_ADDRESS,
  GET_UPDATE_PROFILE_ADDRESS,
  LOGIN_FAIL,
  LOGIN_SUCCESS,
  LOGOUT,
  REFRESH_TOKEN,
  REGISTER_FAIL,
  REGISTER_SUCCESS,
  RESET_PASSWORD,
  RESET_PASSWORD_REQUEST,
  UPDATE_FAIL,
  UPDATE_PASSWORD_FAIL,
  UPDATE_PASSWORD_SUCCESS,
  UPDATE_SUCCESS,
  UPLOAD_FAIL,
  UPLOAD_LOGO_IMAGE,
} from "./auth.types";
// services
import AuthService from "../../api/auth.service";
import UserService from "../../api/user.service";
import UploadService from "../../api/upload.service";
// models and toaster
import { toast } from "react-toastify";
import { LoginRequestModel } from "../../shared/model/LoginRequest";
import { UserProfileModel } from "../../client/model/UserProfile";
import { ChangePasswordModel } from "../../client/model/ChangePassword";
import { ResetPasswordRequestModel } from "../../shared/model/ResetPasswordRequest";
import { LocationInfoObject } from "../../shared/model/Location";

export const refreshToken =
  (accessToken: string): AppThunk =>
  async (dispatch) => {
    // const asyncResp = await exampleAPI()
    dispatch({
      type: REFRESH_TOKEN,
      payload: accessToken,
    });
  };

export const logout = (): AppThunk => async (dispatch) => {
  AuthService.logout();
  dispatch({
    type: LOGOUT,
  });
  toast.success("User  logged out successfully");
};

export const login =
  (loginData: LoginRequestModel): AppThunk =>
  async (dispatch) => {
    return AuthService.login(loginData).then(
      (response) => {
        console.log(response);
        dispatch({
          type: LOGIN_SUCCESS,
          payload: { currentUser: response.currentUser, token: response.token },
        });
        toast.success(
          "User " + response.currentUser.username + " logged in successfully"
        );

        console.timeEnd("action");

        return Promise.resolve();
      },
      (error) => {
        const message =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();

        dispatch({
          type: LOGIN_FAIL,
        });

        toast.warning(message);
        return Promise.reject();
      }
    );
  };

export const register =
  (data: UserProfileModel): AppThunk =>
  async (dispatch) => {
    return AuthService.register(data).then(
      (response) => {
        dispatch({
          type: REGISTER_SUCCESS,
        });
        toast.success(data.username + " You have successfully registered...!");
        return Promise.resolve();
      },
      (error) => {
        const message =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();
        dispatch({
          type: REGISTER_FAIL,
        });
        toast.warning(message);
        return Promise.reject();
      }
    );
  };

export const update =
  (data: UserProfileModel, id: number): AppThunk =>
  async (dispatch) => {
    return UserService.update(data, id).then(
      (response) => {
        dispatch({
          payload: { currentUser: data, id: id },
          type: UPDATE_SUCCESS,
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
        dispatch({
          type: UPDATE_FAIL,
        });
        toast.warning(message);
        return Promise.reject();
      }
    );
  };

export const updatePassword =
  (data: ChangePasswordModel): AppThunk =>
  async (dispatch) => {
    return UserService.updatePassword(data).then(
      (response) => {
        dispatch({
          payload: { currentUser: data },
          type: UPDATE_PASSWORD_SUCCESS,
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
        dispatch({
          type: UPDATE_PASSWORD_FAIL,
        });
        toast.warning(message);
        return Promise.reject();
      }
    );
  };

export const changePassword =
  (email: string): AppThunk =>
  async (dispatch) => {
    return AuthService.resetPasswordRequest(email).then(
      (response) => {
        dispatch({
          type: RESET_PASSWORD_REQUEST,
          payload: {
            email,
          },
        });
        toast.success(
          "verification email is send to " + email + " successfully"
        );
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

// reset password
export const setNewPassword =
  (data: ResetPasswordRequestModel): AppThunk =>
  async (dispatch) => {
    return AuthService.resetPassword(data).then(
      (response) => {
        dispatch({
          type: RESET_PASSWORD,
        });
        toast.success(data.email + " password changed successfully");
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

  //email verification
export const emailVerification =
(verificationCode: string, userId: number): AppThunk =>
async (dispatch) => {
  return AuthService.verifyEmail(verificationCode, userId).then(
    (response) => {
      dispatch({
        type: EMAIL_VERIFY_SUCCESS,
        payload: {
          userId,
        },
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

// upload image
export const uploadLogoImage =
(data: any): AppThunk =>
async (dispatch) => {
  return UploadService.uploadLogoImage(data).then(
    (response) => {
      dispatch({
        type: UPLOAD_LOGO_IMAGE,
      });
      toast.success(" Image Uploaded Successfully ");
      return Promise.resolve();
    },
    (error) => {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      dispatch({
        type: UPLOAD_FAIL,
      });
      toast.warning(message);
      return Promise.reject();
    }
  );
};


export const getRegisterAddress =
(locationData: LocationInfoObject): AppThunk =>
async (dispatch) => {
  const { formattedAddress, postalCode, state, city } = locationData.address;
  dispatch({
    type: GET_REGISTER_ADDRESS,
    payload: {
      formattedAddress,
      postalCode,
      state,
      city,
    },
  });
};

export const getUpdateProfileAddress =
(Address:any): AppThunk =>
async (dispatch) => {
  dispatch({
    type: GET_UPDATE_PROFILE_ADDRESS,
    payload: {
      address: Address.formattedAddress,
      city: Address.city,
      state: Address.state,
      postalCode: Address.postalCode,
    },
  });
};

export const getRegisterBrokerageAddress =
( locationData: LocationInfoObject): AppThunk =>
async (dispatch) => {
  dispatch({
    type: GET_BROKERAGE_ADDRESS,
    payload: {
      locationData,
    },
  });
};

export const clearRegistrationAddress =
(): AppThunk =>
async (dispatch) => {
  dispatch({
    type: CLEAR_REGISTER_ADDRESS,
  });
};


export const clearRegisterBrokerageAddress =
(): AppThunk =>
async (dispatch) => {
  dispatch({
    type: CLEAR_BROKERAGE_ADDRESS,
  });
};

export const clearUpdateProfileAddress =
(): AppThunk =>
async (dispatch) => {
  dispatch({
    type: CLEAR_UPDATE_PROFILE_ADDRESS,
  });
};
