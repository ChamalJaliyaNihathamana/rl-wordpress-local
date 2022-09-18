
import axiosInstance from "./main";
import { getLocalAccessToken } from "./token.service";

const marketValidity = async (zip_code: number) => {
  const userToken = getLocalAccessToken();
  const AuthStr = "Bearer " + userToken;
  console.log(userToken);

  const response = await axiosInstance.get(
    `/product/zipcode-price/${zip_code}`,
    {
      headers: { Authorization: AuthStr },
    }
  );

  return response.data;
};

// get markets
const getMarketList = async () => {
  const userToken = getLocalAccessToken();
  const AuthStr = "Bearer " + userToken;
  console.log(userToken);
  const response = await axiosInstance.get("/product/markets", {
    headers: { Authorization: AuthStr },
  });

  return response.data;
};

const MarketService = {
  getMarketList,
  marketValidity,
};
export default MarketService;
