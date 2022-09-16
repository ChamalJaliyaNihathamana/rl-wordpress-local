import * as Yup from "yup";
import { LoginRequestModel } from "../../model/LoginRequest";


export interface FormLogin extends LoginRequestModel {}

export const SigninSchema = Yup.object({
  // username: Yup.string().required("Email is required").email("Email is invalid"),
  password: Yup.string()
    .required("Password is required")
    .min(6, "Password must be at least 6 characters")
    .max(40, "Password must not exceed 40 characters"),
}).required();
