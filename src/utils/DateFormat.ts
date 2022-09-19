import { format } from "date-fns";
import { enGB } from "date-fns/locale";

export const shortDate = (date: string) => {
  var result = format(new Date(date), "MM/dd/yyyy");
  return result;
};

export const getMonths = () => {
  let i:number;
  const months = [];
  for (i = 0; i < 12; i++) {
    months.push(enGB.localize.month(i, { width: "abbreviated" }));
  }
  return months;
};
