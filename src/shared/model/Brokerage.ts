import { LocationInfoObject } from "./Location";

export interface BrokerageModel {
  id: string;
  name: string;
  profileImage?: string;
  website?: string;
  contactNumber?: number;
  contactEmail?: string;
  brokerageAddress: LocationInfoObject;
  market?: string;
  notificationEmails?: string[];
}
