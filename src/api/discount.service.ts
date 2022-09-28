import axiosInstance from "./main";

// get discount codes list
const getDiscountCodesList = async () => {
  const response = await axiosInstance.get("/user/discount-code")
  return response.data;
};

const DiscountCodeService = {
    getDiscountCodesList,
};
export default DiscountCodeService;
