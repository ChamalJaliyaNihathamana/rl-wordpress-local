import axiosInstance from "./main";

// get brokerage list
const getBrokerageList = async () => {
  const response = await axiosInstance.get("/user/brokerage")
  return response.data;
};

const BrokerageService = {
  getBrokerageList,
};
export default BrokerageService;
