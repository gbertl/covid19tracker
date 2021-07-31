export const sortData = (data) => {
  const sortedData = [...data];

  sortedData.sort((a, b) => {
    return b.cases - a.cases;
    // if (a.cases > b.cases) {
    //   return -1;
    // }
    //
    // if (a.cases < b.cases) {
    //   return 1;
    // }
    //
    // return 0;
  });

  return sortedData;
};
