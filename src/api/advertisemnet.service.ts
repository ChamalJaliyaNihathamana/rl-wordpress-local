
import axiosInstance from "./main";
import { getLocalAccessToken } from "./token.service";

// get advertisemnet
const getAdvertisementList = async () => {
  const userToken = getLocalAccessToken();
  const AuthStr = "Bearer " + userToken;
  console.log(userToken);
  const response = await axiosInstance.get("/advertisement", {
    headers: { Authorization: AuthStr },
  });

  return response.data;
};

const AdvertisementService = {
  getAdvertisementList,

};
export default AdvertisementService;
