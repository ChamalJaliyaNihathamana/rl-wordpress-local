import { PopOverModel } from "./PopOver";

export interface AddOnModel {
    special?:string;
    id: string;
    code?: string;
    name: string;
    description?: string;
    is_addon?:any;
    more_information?: string;
    nice_name?: string;
    isFeatured?: boolean;
    isEssential?: boolean;
    price: number;
    counter?: boolean;
    priceDescription?: string;
    popover?: PopOverModel;
    visibility?: boolean;
    checked?: boolean;
    images?: string[];
    market?: string;
    time?: number;
    unit?: any;
    range?: SqftRangeModel;
    agentVisibility?: boolean;
    type?: string; 
  }
  
  export type AddOnType =
    | ""
    | "essential"
    | "featured"
    | "other"
    | "videography"
    | "photography"
    | "luxury";
  
  export type AddOnUnitType = "flatFee" | "perPhoto" | "sqftRange";
  
  export interface SqftRangeModel {
    to: number;
    from: number;
  }
  