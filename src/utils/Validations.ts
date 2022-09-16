export const phoneRegExp = /^\D*(\d\D*){10}$/;

export const zipCodeExp = /^[0-9]{5}(?:-[0-9]{4})?$/;

export const dateExp = /^\d{4}-(0[1-9]|1[012])-(0[1-9]|[12][0-9]|3[01])$/;

export const normalizeInput = (value: any, previousValue: any) => {
  if (!value) return value;
  const currentValue = value.replace(/[^\d]/g, "");
  const cvLength = currentValue.length;

  if (!previousValue || value.length > previousValue.length) {
    if (cvLength < 4) return currentValue;
    if (cvLength < 7)
      return `(${currentValue.slice(0, 3)}) ${currentValue.slice(3)}`;
    return `(${currentValue.slice(0, 3)}) ${currentValue.slice(
      3,
      6
    )}-${currentValue.slice(6, 10)}`;
  }
};

export const getFormattedPhone = (input: any) => {
  let output = "(";
  input.replace(
    /^\D*(\d{0,3})\D*(\d{0,3})\D*(\d{0,4})/,
    function (match: any, g1: any, g2: any, g3: any) {
      if (g1.length) {
        output += g1;
        if (g1.length == 3) {
          output += ")";
          if (g2.length) {
            output += " " + g2;
            if (g2.length == 3) {
              output += " - ";
              if (g3.length) {
                output += g3;
              }
            }
          }
        }
      }
    }
  );
  return output;
};
