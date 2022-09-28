import * as Yup from "yup";

// @adhee why seperate models to discountcode data and discountcode
export interface FormDiscountCodes {
  market: string;
  agent: string;
  brokerage: string;
  titleCompany: string;
  discountCode: string;
  usage: string;
  expireDate: string;
  startDate: string;
}

export const DiscountCodesSchema = Yup.object({
  market: Yup.string(),
  agent: Yup.string(),
  brokerage: Yup.string().required("Please Select an Option"),
  titleCompany: Yup.string(),
  discountCode: Yup.string().required("Please provide a discountCode"),
  usage: Yup.string().required("Please provide a usage"),
  expireDate: Yup.string(),
  startDate: Yup.string(),
});
