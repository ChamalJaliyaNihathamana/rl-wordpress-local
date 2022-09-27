// store
import { AppThunk } from "../store";
import { CREATE_ADMIN, GET_ADMIN_LIST } from "./admin.types";
// services
import AdminService from "../../api/admin.service";
// models and toaster
import { toast } from "react-toastify";
import { AdminModel } from "../../admin/models/Admin";

//get admin list
export const getAdminList = (): AppThunk => async (dispatch) => {
  return AdminService.getAdminList().then(
    (response) => {
      dispatch({
        type: GET_ADMIN_LIST,
        payload: { adminData: response.data },
      });
      toast.success("Admin List Fetched Successfully!");
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
    }
  );
};

// create admin
export const registerAdmin =
  (data: AdminModel): AppThunk =>
  async (dispatch) => {
    return AdminService.createAdmin(data).then(
      (response) => {
        dispatch({
          type: CREATE_ADMIN,
        });
        toast.success(data.username + " have successfully created...!");
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
      }
    );
  };
