import { UserProfileModel } from "../client/model/UserProfile";
import { LoginRequestModel } from "../shared/model/LoginRequest";
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


// logout
const logout = async () => {
  TokenService.removeUser();
};

const AuthService = {

  login,
  logout,

};
export default AuthService;
