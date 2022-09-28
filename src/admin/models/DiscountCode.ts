export interface DiscountCodeModel {
  market: string;
  agent: string;
  brokerage: string;
  titleCompany: string;
  discountCode: string;
  usage: string;
  expireDate: string;
  startDate: string;
  services?: {
    serviceName: string;
    unit: string;
    market: string;
    currentPrice: number;
  }[];
}
