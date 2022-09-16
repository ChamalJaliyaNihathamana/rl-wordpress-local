import { UserProfileModel } from "../client/model/UserProfile";
import { LoginRequestModel } from "../shared/model/LoginRequest";
import { ResetPasswordRequestModel } from "../shared/model/ResetPasswordRequest";
import { TokenModel } from "../shared/model/Token";
import { splitOnSpace } from "../utils/Split";
import axiosInstance from "./main";
import TokenService from "./token.service";

//  login
const login = async (loginData: LoginRequestModel) => {
  const { username, password } = loginData;
  const response = await axiosInstance.post("/auth/login", {
    username,
    password,
  });
  if (response.data.data.accessToken) {
    TokenService.setUser(response.data.data);
  }

  const {
    id,
    name,
    photo_filename,
    logo_filename,
    phone,
    email,
    referral_from,
    mls_login,
    mls_password,
    password_hash,
    address,
    city,
    state,
    zip_code,
    markets,
    brokerage_id,
    brokerage_name,
    brokerage_city,
    brokerage_state,
  } = response.data.data.user;

  let currentUser: UserProfileModel = {
    id,
    first_name: splitOnSpace(name)[0],
    last_name: splitOnSpace(name)[1],
    photo_filename,
    logo_filename,
    username,
    phone,
    email,
    referral_from,
    mls_login,
    mls_password,
    password_hash,
    address,
    city,
    state,
    zip_code,
    markets,
    brokerage_id,
    brokerage_name,
    brokerage_city,
    brokerage_state,
  };

  const { accessToken, refreshToken } = response.data.data;

  let token: TokenModel = {
    accessToken,
    refreshToken,
  };

  const data = {
    currentUser,
    token,
  };

  return data;
};

// registration
const register = async (data: UserProfileModel) => {
  const {
    first_name,
    last_name,
    photo_filename,
    logo_filename,
    username,
    email,
    phone,
    referral_from,
    address,
    city,
    state,
    zip_code,
    markets,
    brokerage_name,
    brokerage_city,
    brokerage_state,
    brokerage_id,
    password_hash,
  } = data;
  return axiosInstance.post("/auth/register", {
    first_name,
    last_name,
    photo_filename,
    logo_filename,
    username,
    email,
    phone,
    referral_from,
    address,
    city,
    state,
    zip_code,
    markets,
    brokerage_name,
    brokerage_city,
    brokerage_state,
    brokerage_id,
    password_hash,
  });
};

// reset password request
const resetPasswordRequest = async (email: string) => {
  const response = await axiosInstance.post("/auth/reset-password/request", {
    email,
  });
  return response;
};

// reset password
const resetPassword = async (resetPasswordData: ResetPasswordRequestModel) => {
  const { userId, email, newPassword } = resetPasswordData;
  const response = await axiosInstance.post("/auth/reset-password", {
    userId,
    email,
    newPassword,
  });
  return response;
};

// verify email
const verifyEmail = async (verificationCode: string, userId: number) => {
  const response = await axiosInstance.post("/auth/reset-password/verify", {
    verificationCode,
    userId,
  });
  return response;
};

// logout
const logout = async () => {
  TokenService.removeUser();
};

// get currentUser
const getCurrentUser = async () => {
  return await JSON.parse(localStorage.getItem("user") as any);
};

const AuthService = {
  register,
  login,
  logout,
  getCurrentUser,
  resetPassword,
  resetPasswordRequest,
  verifyEmail,
};
export default AuthService;
