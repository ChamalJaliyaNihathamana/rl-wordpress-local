import * as Yup from "yup";
import { BrokerageModel } from "../../model/Brokerage";


export interface FormBrokerageInfo extends BrokerageModel {}

export const BrokerageInfoSchema = Yup.object({
  name: Yup.string().required("Brokerage Name is required"),
});
