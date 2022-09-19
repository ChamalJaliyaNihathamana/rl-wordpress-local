// date filter
export const filterDateParams = {
    comparator: function (filterLocalDateAtMidnight: any, cellValue: any) {
      const dateAsString = cellValue;
      if (dateAsString == null) return -1;
      const dateParts = dateAsString.split("/");
      const cellDate = new Date(
        Number(dateParts[2]),
        Number(dateParts[1]) - 1,
        Number(dateParts[0])
      );
      if (filterLocalDateAtMidnight.getTime() === cellDate.getTime()) {
        return 0;
      }
      if (cellDate < filterLocalDateAtMidnight) {
        return -1;
      }
      if (cellDate > filterLocalDateAtMidnight) {
        return 1;
      }
    },
    browserDatePicker: true,
    minValidYear: 2000,
    maxValidYear: 2022,
  };
  
  // status filter
export const filterStatusParams = {
    filterOptions: ["contains", "notContains"],
    textFormatter: function (r: any) {
      if (r == null) return null;
      return r
        .toLowerCase()
        .replace(/[àáâãäå]/g, "a")
        .replace(/æ/g, "ae")
        .replace(/ç/g, "c")
        .replace(/[èéêë]/g, "e")
        .replace(/[ìíîï]/g, "i")
        .replace(/ñ/g, "n")
        .replace(/[òóôõö]/g, "o")
        .replace(/œ/g, "oe")
        .replace(/[ùúûü]/g, "u")
        .replace(/[ýÿ]/g, "y");
    },
    debounceMs: 200,
    suppressAndOrCondition: true,
  };