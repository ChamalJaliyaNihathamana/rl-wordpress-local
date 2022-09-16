//GLOBAL INTERFACES
export interface SelectOption {
  value: string;
  label: string;
  fillColor?: string;
}

//GLOBAL DROP DOWNS
export const accessOptions: SelectOption[] = [
  { value: "owner", label: "Owner/Occupant" },
  { value: "agent", label: "Agent" },
  { value: "vacant", label: "Vacant" },
];

export const propTypeOptions: SelectOption[] = [
  { value: "sfr", label: "SFR" },
  { value: "townhouse", label: "Townhouse/Condo" },
  { value: "apartment", label: "Apartment" },
  { value: "commercial", label: "Commercial" },
  { value: "land", label: "Land" },
  { value: "other", label: "Other" },
];
export const postColors: SelectOption[] = [
  { value: "white", fillColor: "#dcdcdc", label: "White" },
  { value: "black", fillColor: "black", label: "Black" },
  // { value: "red", fillColor: "red", label: "Red" },
  { value: "orange", fillColor: "orange", label: "Orange" },
  // { value: "green", fillColor: "green", label: "Green" },
  { value: "blue", fillColor: "blue", label: "Blue" },
];
export const riderOptions = [
  { value: "forSale", label: "For Sale" },
  { value: "pool", label: "Pool" },
  { value: "sold", label: "Sold" },
  { value: "pending", label: "Pending" },
  { value: "custom", label: "Custom" },
];
export const agentOptions = [
  { value: "forSale", label: "For Sale" },
  { value: "pool", label: "Pool" },
  { value: "sold", label: "Sold" },
  { value: "pending", label: "Pending" },
  { value: "custom", label: "Custom" },
];
export const currentOccupantOptions = [
  { value: "1", label: " 1" },
  { value: "2", label: "2" },
  { value: "3", label: "3" },
  { value: "4", label: "4" },
  { value: "5", label: "5" },
];
export const behalfOfOptions = [
  { value: "agent", label: " Agent" },
  { value: "brokerage", label: "Brokerage" },
  { value: "owner", label: "Owner" },
  { value: "title-company", label: "TitleCompany" },
];
export const primaryContactOptions = [
  { value: "agent", label: " Contact Agent" },
  { value: "assistant", label: "Contact Assistant/TC" },
  { value: "occupant", label: "Contact Occupant" },
  ,
];
export const yesNoOptions = [
  { value: "yes", label: " Yes" },
  { value: "no", label: "No" },
];
export const yesNoMapOptions = [
  { value: "yes", label: " Yes, the location above is correct" },
  { value: "no", label: "No, the location above is not correct" },
];

export const dayTimeOptions = [
  { value: "anytime", label: " Anytime" },
  { value: "morning", label: "Morning (9am - 1pm)" },
  { value: "afternoon", label: "Afternoon(1pm - Sunset)" },
];

export const acceptTerms = [
  { value: "true", label: "I agree to terms of use & service." },
];

export const agentSignOptions = [{ value: "true", label: "Add Agent's Sign" }];
export const agentWillInstallSignOptions = [
  { value: "true", label: "Agent will install own sign" },
];
export const windChainOptions = [{ value: true, label: "Windchain" }];

export const mySelfOptions = [{ value: true, label: "Myself" }];
export const otherAgentsOptions = [{ value: true, label: "Other Agents" }];
export const noneOptions = [{ value: true, label: "None" }];
export const MLSforOptions = [
  { value: true, label: "Myself" },
  { value: true, label: "Other Agents" },
  { value: true, label: "None" },
];

export const fullMLSEntryOptions = [{ value: true, label: "Full MLS Entry" }];
export const descriptionOnlyOptions = [
  { value: true, label: "Description Only" },
];
export const uploadPhotosOnlyOptions = [
  { value: true, label: "Upload Photos Only" },
];
export const rentSaleOptions = [
  { value: "rent", label: " Rent" },
  { value: "sale", label: "Sale" },
];

export const postData = [
  {
    id: "1",
    name: "Regular",
    counter: true,
    price: 30,
    image:
      "https://images.unsplash.com/photo-1465198901163-2d15b88fecea?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80",
  },
  {
    id: "2",
    price: 30,
    counter: true,
    name: "H Frame/Luxury",
    image:
      "https://images.unsplash.com/photo-1493499797817-4476054d48bd?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=928&q=80",
  },
  {
    id: "3",
    price: 30,
    counter: true,
    name: "Over the wall",
    image:
      "https://images.unsplash.com/photo-1608461111675-7bb43edcbac3?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=826&q=80",
  },
];

export const riderOptionsRadio = [
  {
    value: "on-top",
    label: "On top of sign",
  },
  { value: "below", label: "Below sign" },
];

export const mslEntryOptions = [
  { value: "myself", label: "Myself" },
  { value: "other", label: "Other Agents" },
  { value: "none", label: "Do Not Enter my MLS" },
];

export const mslType = [
  {
    value: "full",
    label: "Full MLS Entry (Details, Description, Upload Photos)",
  },
  { value: "description", label: "Description Only" },
  { value: "photo", label: "Upload Photos Only" },
];
export const rememberPayment = [
  { value: "true", label: "Remember payment method for future use" },
];

export const creditCardOptions = [
  { value: false, label: " Existing Credit Card" },
  { value: true, label: "New Credit Card" },
];
export const creditCardOptionsModal = [{ value: false, label: "" }];

export const monthOptions = [
  { value: "jan", label: " January" },
  { value: "feb", label: "February" },
  { value: "mar", label: "March" },
  { value: "apr", label: "April" },
  { value: "may", label: "May" },
];
export const yearOptions = [
  { value: "2020", label: " 2020" },
  { value: "2021", label: "2021" },
  { value: "2022", label: "2022" },
  { value: "2023", label: "2023" },
  { value: "2024", label: "2024" },
];

export const tagOptions = [
  { value: "luxury", label: "Luxury" },
  { value: "standard", label: "Standard" },
];

export const serviceOptions = [
  { value: "luxury", label: "Luxury" },
  { value: "standard", label: "Standard" },
];
export const serviceChargeTypesOptions = [
  { value: "sqftRange", label: "Sq Ft Range" },
  { value: "flatRate", label: "Flat Rate" },
  { value: "perPhoto", label: "Per Photo" },
];

export const refByOptions = [
  { value: "agent", label: "Another Agent" },
  { value: "broker", label: "Broker" },
  { value: "empireWestTitleAgency", label: "Empire West Title Agency" },
  { value: "facebook", label: "Facebook" },
  { value: "instagram", label: "Instagram" },
  { value: "officePresentation", label: "Office Presentation" },
  { value: "otherTitleCompany", label: "Other Title Company" },
  { value: "magnusTitleCompany", label: "Magnus Title Company" },
  { value: "securityTitleCompany", label: "Security Title Company" },
  { value: "chicagoTitleOfColorado", label: "Chicago Title of Colorado" },
  { value: "other", label: "Other" },
];
export const postSignLockBoxDateOptions = [
  { value: "postSign", label: "Install Post/Sign on Different Date" },
  {
    value: "postSignAndLockbox",
    label: "Install Post/Sign and Lockbox on Different Date",
  },
  { value: "lockBox", label: "Install LockBox on Different Date" },
];
