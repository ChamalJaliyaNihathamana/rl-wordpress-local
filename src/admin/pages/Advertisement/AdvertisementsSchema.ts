import * as Yup from "yup";
import { AdvertisementModel } from "../../../shared/model/Advertisement";


export interface FormAdvertisement extends AdvertisementModel {
}

export const AdvertisementSchema = Yup.object({
  image: Yup.mixed()
    .test("required", "You need to provide a file", (value) => {
      return value && value.length;
    })
    .test("fileSize", "The file is too large", (value, context) => {
      return value && value[0] && value[0].size <= 200000;
    })
    .test("type", "We only support jpeg", function (value) {
      return value && value[0] && value[0].type === "image/jpeg";
    }),
  description: Yup.string(),
  title: Yup.string().required("Please provide a title"),
});
