import axiosInstance from "./main";
import { getLocalAccessToken } from "./token.service";
import { AdminModel } from "../admin/models/Admin";

// get adminList
const getAdminList = async () => {
  const userToken = getLocalAccessToken();
  const AuthStr = "Bearer " + userToken;
  // console.log(userToken);
  const response = await axiosInstance.get("/admin", {
    headers: { Authorization: AuthStr },
  });

  return response.data;
};
// admin create
const createAdmin = async (data: AdminModel) => {
  const userToken = getLocalAccessToken();
  const AuthStr = "Bearer " + userToken;
  const { name, username, password_hash, email, ext, role, contactPhone } =
    data;
  return axiosInstance.post(
    "/admin/create",
    {
      name,
      username,
      password_hash,
      email,
      ext,
      role,
      contactPhone,
    },
    {
      headers: { Authorization: AuthStr },
    }
  );
};
const AdminService = {
  getAdminList,
  createAdmin,
};
export default AdminService;
