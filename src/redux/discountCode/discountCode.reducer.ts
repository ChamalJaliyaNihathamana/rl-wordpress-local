import { AnyAction } from "redux";
import { DiscountCodeModel } from "../../admin/models/DiscountCode";

export interface DiscountCodeState {
  discountCodesList: DiscountCodeModel[];
}

const INITIAL_STATE = {
  discountCodesList: [
    {
      market: "Market_1",
      discountCode: "D001",
      startDate: "06/05/2022",
      expireDate: "05/06/2022",
      usage: "Recurring",
      brokerage: "Brokerage_1",
      titleCompany: "TitleCompany_1",
      agent: "Agent_1",
      services: [
        {
          serviceName: "Drone Community Video",
          unit: "0-1500 Sq Ft",
          market: "Vegas",
          currentPrice: 150,
        },
        {
          serviceName: "Pics and Post Package",
          unit: "Flat Fee",
          market: "Vegas",
          currentPrice: 45,
        },
        {
          serviceName: "Luxury Daytime Photos",
          unit: "0-3000 Sq Ft",
          market: "Denver",
          currentPrice: 175,
        },
      ],
    },
    {
      market: "Market_2",
      discountCode: "D002",
      startDate: "06/03/2022",
      expireDate: "06/05/2022",
      usage: "One Time",
      brokerage: "Brokerage_2",
      titleCompany: "TitleCompany_2",
      agent: "Agent_2",
      services: [
        {
          serviceName: "Drone Community Video",
          unit: "0-1500 Sq Ft",
          market: "Vegas",
          currentPrice: 150,
        },
        {
          serviceName: "Pics and Post Package",
          unit: "Flat Fee",
          market: "Vegas",
          currentPrice: 45,
        },
        {
          serviceName: "Luxury Daytime Photos",
          unit: "0-3000 Sq Ft",
          market: "Denver",
          currentPrice: 175,
        },
      ],
    },
    {
      market: "Market_3",
      discountCode: "D003",
      startDate: "17/04/2022",
      expireDate: "05/05/2022",
      usage: "Recurring",
      brokerage: "Brokerage_3",
      titleCompany: "TitleCompany_3",
      agent: "Agent_3",services: [
        {
          serviceName: "Drone Community Video",
          unit: "0-1500 Sq Ft",
          market: "Vegas",
          currentPrice: 150,
        },
        {
          serviceName: "Pics and Post Package",
          unit: "Flat Fee",
          market: "Vegas",
          currentPrice: 45,
        },
        {
          serviceName: "Luxury Daytime Photos",
          unit: "0-3000 Sq Ft",
          market: "Denver",
          currentPrice: 175,
        },
      ],
    },
    {
      market: "Market_4",
      discountCode: "D004",
      startDate: "01/05/2022",
      expireDate: "06/06/2022",
      usage: "One Time",
      brokerage: "Brokerage_4",
      titleCompany: "TitleCompany_4",
      agent: "Agent_4",services: [
        {
          serviceName: "Drone Community Video",
          unit: "0-1500 Sq Ft",
          market: "Vegas",
          currentPrice: 150,
        },
        {
          serviceName: "Pics and Post Package",
          unit: "Flat Fee",
          market: "Vegas",
          currentPrice: 45,
        },
        {
          serviceName: "Luxury Daytime Photos",
          unit: "0-3000 Sq Ft",
          market: "Denver",
          currentPrice: 175,
        },
      ],
    },
  ],
};

export const discountCodeReducer = (
  state: DiscountCodeState = INITIAL_STATE,
  action: AnyAction
): DiscountCodeState => {
  const { type, payload } = action;
  switch (type) {
    case "GET_DISCOUNT_CODES_LIST": {
      return { ...state, discountCodesList: payload.discountCodesList };
    }
    default:
      return state;
  }
};

export default discountCodeReducer;
