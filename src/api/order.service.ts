import axiosInstance from "./main";
import { getLocalAccessToken } from "./token.service";


const getUserOrderList = async () => {
  const userToken = getLocalAccessToken();
  const AuthStr = "Bearer " + userToken;
  console.log(userToken);
  const response = await axiosInstance.get("/order", {
    headers: { Authorization: AuthStr },
  });

  return response.data.data;
};


const OrderService = {
  getUserOrderList,
};
export default OrderService;
