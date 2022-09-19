import * as Yup from "yup";
import { InventoryPickupModel } from "../../model/InventoryPickup";


export interface FormPickUp extends InventoryPickupModel {}

export const PickUpSchema = Yup.object({

  // pickupState: Yup.object({
  //   pickupAddress: Yup.object({
  //     address: Yup.object({
  //       city: Yup.string().required("City is required"),
  //       state: Yup.string().required("State  is required"),
  //       postalCode: Yup.string()
  //         .required("Zip Code is required")
  //         .matches(zipCodeExp, "Zip Code is not valid"),
  //       unit: Yup.string(),
  //     }),
  //   }),
  //   direction: Yup.string(),
  //   confirmLocation: Yup.string().required("Please confirm the location"),
  // }),
  // time: Yup.string(),
  // date:Yup.string(),
  // instructions: Yup.string(),
  // confirmLocation: Yup.string().required("Please confirm the location"),
});
