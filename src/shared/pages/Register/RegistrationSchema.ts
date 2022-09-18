import * as Yup from "yup";
import { UserProfileModel } from "../../../client/model/UserProfile";
import { zipCodeExp } from "../../../utils/Validations";

export interface FormRegister extends UserProfileModel {}

export const SignupSchema = Yup.object({
  first_name: Yup.string()
    .required("First name is required")
    .min(6, "First name must be at least 6 characters")
    .max(20, "First name must not exceed 20 characters"),
  last_name: Yup.string()
    .required("Last name is required")
    .min(6, "Last name must be at least 6 characters")
    .max(20, "Last name must not exceed 20 characters"),
  username:  Yup.string().required("Email is required").email("Email is invalid"),
  password_hash: Yup.string()
    .required("Password is required")
    .min(6, "Password must be at least 6 characters")
    .max(40, "Password must not exceed 40 characters"),
  confirmPassword: Yup.string()
    .required("Confirm Password is required")
    .oneOf([Yup.ref("password_hash"), null], "Confirm Password does not match"),
  // brokerage: Yup.object()
  //   .shape({
  //     label: Yup.string().required("Required"),
  //     value: Yup.string().required("Required"),
  //   })
  //   .required("Brokerage is required"),
  // brokerageCity: Yup.string().required("city is required"),
  // market: Yup.object()
  //   .shape({
  //     label: Yup.string().required("Required"),
  //     value: Yup.string().required("Required"),
  //   })
  //   .required("Market is required"),
  phone: Yup.string().required("Mobile is required"),
  // userAddress: Yup.object({
  //   address: Yup.object({
  //     city: Yup.string().required("City is required"),
  //     state: Yup.string().required("State  is required"),
  //     postalCode: Yup.string()
  //       .required("Zip Code is required")
  //       .matches(zipCodeExp, "Zip Code is not valid"),
  //   }),
  // }),
  acceptTerms: Yup.bool()
    .required("Accept Terms is required")
    .oneOf([true], "Check Accept Terms to Proceed"),
});
