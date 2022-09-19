import * as Yup from "yup";

export interface FormAddress {
  //   pickupAddress: string;
  city: string;
  unitNumber: string;
  state: string;
  zipcode: string;
  //   confirmLocation: string;
  //   direction: string;
}

export const AddressSchema = Yup.object({
  //   pickupAddress: Yup.string().required("mailing address is required"),
  city: Yup.string().required("city is required"),
  unitNumber: Yup.string(),
  state: Yup.string().required("state is required"),
  zipcode: Yup.string().required("zipcode is required"),
  //   direction: Yup.string(),
  //   confirmLocation: Yup.string().required("confirm location is required"),
}).required();
