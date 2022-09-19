import { LocationInfoObject } from "../../shared/model/Location";

export interface PickupModel {
  pickupAddress: LocationInfoObject;
  confirmLocation: string;
  direction: string;
}
