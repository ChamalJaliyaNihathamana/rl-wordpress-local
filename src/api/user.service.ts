
import { ChangePasswordModel } from "../client/model/ChangePassword";
import { InventoryPickupModel } from "../client/model/InventoryPickup";
import { UserProfileModel } from "../client/model/UserProfile";
import axiosInstance from "./main";
import { getLocalAccessToken } from "./token.service";

// update customer
const update = async (data: UserProfileModel, userId: number) => {
  const userToken = getLocalAccessToken();
  const AuthStr = "Bearer " + userToken;
  const {
    first_name,
    last_name,
    photo_filename,
    logo_filename,
    username,
    email,
    phone,
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
    mls_login,
    mls_password,
  } = data;
  return axiosInstance.put(
    `/auth/customer/update`,
    {
      first_name,
      last_name,
      photo_filename,
      logo_filename,
      username,
      email,
      phone,
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
      mls_login,
      mls_password,
    },
    {
      headers: { Authorization: AuthStr },
      params: {
        userId,
      },
    }
  );
};
// user inventory pickup address
const setInventoryPickup = async (data: InventoryPickupModel) => {
  const userToken = getLocalAccessToken();
  const AuthStr = "Bearer " + userToken;
  const {
    property_address,
    unit,
    city,
    state,
    customer_id,
    zip_code,
    direction_discription,
    lat,
    lng,
  } = data;
  return axiosInstance.post(
    "user/inventory/pickup",
    {
      property_address,
      unit,
      city,
      state,
      customer_id,
      zip_code,
      direction_discription,
      lat,
      lng,
    },
    {
      headers: { Authorization: AuthStr },
    }
  );
};

// update password
const updatePassword = async (data: ChangePasswordModel) => {
  const userToken = getLocalAccessToken();
  const AuthStr = "Bearer " + userToken;
  const { old_password, new_password, user_name } = data;
  return axiosInstance.post(
    `/auth/update-password`,
    {
      old_password,
      new_password,
      user_name,
    },
    {
      headers: { Authorization: AuthStr },
    }
  );
};
// get linked accounts
const getLinkedAccountList = async () => {
  const userToken = getLocalAccessToken();
  const AuthStr = "Bearer " + userToken;
  console.log(userToken);
  const response = await axiosInstance.get("/user/customer/linkaccount/", {
    headers: { Authorization: AuthStr },
  });

  return response.data;
};

const UserService = {
  update,
  setInventoryPickup,
  getLinkedAccountList,
  updatePassword,
};
export default UserService;
