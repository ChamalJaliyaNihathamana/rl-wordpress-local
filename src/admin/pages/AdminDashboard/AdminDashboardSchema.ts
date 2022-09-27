import * as Yup from "yup";
import { AdminModel } from "../../models/Admin";
export interface FormAdmin extends AdminModel {}

export const AdminSchema = Yup.object({}).required();
