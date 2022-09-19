import * as Yup from "yup";

export interface FormResetPassword {
  email: string;
}

export const ResetPasswordSchema = Yup.object({
  email: Yup.string().required("Email is required").email("Email is invalid"),
}).required();

export interface FormSetNewPassword {
  password: string;
  confirmPassword: string;
}

export const NewPasswordSchema = Yup.object({
  password: Yup.string()
    .required("Password is required")
    .min(8, "Password must be at least 8 characters")
    .max(40, "Password must not exceed 40 characters"),
  confirmPassword: Yup.string()
    .required("Confirm Password is required")
    .oneOf([Yup.ref("password"), null], "Confirm Password does not match"),
}).required();
