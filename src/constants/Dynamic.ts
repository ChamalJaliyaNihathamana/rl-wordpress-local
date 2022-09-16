export interface SelectOption {
  value: string;
  label: string;
}

export const brokerageOptions: SelectOption[] = [
  { value: "kellarWilliams", label: "Kellar Williams" },
  { value: "blue", label: "Blue" },
  { value: "purple", label: "Purple" },
  { value: "red", label: "Red" },
  { value: "jhonDoe", label: "Jhon Doe" },
  { value: "other", label: "Other" },
];

export const marketOptions = [
  { value: "market_1", label: "Market_1" },
  { value: "market_2", label: "Market_2" },
  { value: "market_3", label: "Market_3" },
  { value: "market_4", label: "Market_4" },
];
export const agentOptions = [
  { value: "agent_1", label: "Agent_1" },
  { value: "agent_2", label: "Agent_2" },
  { value: "agent_3", label: "Agent_3" },
  { value: "agent_4", label: "Agent_4" },
];

export const titleCompanyOptions = [
  { value: "titleCompany_1", label: "Title Company_1" },
  { value: "titleCompany_2", label: "Title Company_2" },
  { value: "titleCompany_3", label: "Title Company_3" },
  { value: "titleCompany_4", label: "Title Company_4" },
];

export const orderListData = [
  { title: "The Premier package", price: 174 },
  { title: "*Discount RKt25 applied", price: 25 },
  { title: "Drone photos", price: 75 },
  { title: "Instagram reel", price: 75 },
  { title: "virtual staging", price: 75 },
];

export const orderTotalData = {
  price: 1756,
  title: "Total",
  save: 400,
};
