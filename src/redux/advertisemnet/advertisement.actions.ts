// store
import { AppThunk } from "../store";
import { GET_ADVERTISEMENT_LIST } from "./advertisment.types";
// services
import AdvertisementService from "../../api/advertisemnet.service";
// models and toaster
import { toast } from "react-toastify";


//get advertisement list
export const getAdvertisementList =
  (): AppThunk =>
  async (dispatch) => {
    return AdvertisementService.getAdvertisementList().then(
      (response) => {
        dispatch({
          type: GET_ADVERTISEMENT_LIST,
          payload: { advertisementList: response.data },
        });
        toast.success("Advertisement List Fetched Successfully ...!");
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


