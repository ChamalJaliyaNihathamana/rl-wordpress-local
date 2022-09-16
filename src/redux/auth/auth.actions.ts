// store
import { AppThunk } from "../store";
import { LOGIN_FAIL, LOGIN_SUCCESS, LOGOUT, REFRESH_TOKEN, REGISTER_FAIL, REGISTER_SUCCESS } from "./auth.types";
// services
import AuthService from "../../api/auth.service";
// models and toaster
import { toast } from "react-toastify";
import { LoginRequestModel } from "../../shared/model/LoginRequest";
import { UserProfileModel } from "../../client/model/UserProfile";

export const refreshToken =
  (accessToken: string): AppThunk =>
  async (dispatch) => {
    // const asyncResp = await exampleAPI()
    dispatch({
      type: REFRESH_TOKEN,
      payload: accessToken,
    });
  };

export const logout =
  (): AppThunk =>
  async (dispatch) => {
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

