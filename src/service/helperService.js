const stations = [
  'Atlantsolía',
  'Costco Iceland',
  'Dælan',
  'N1',
  'ÓB',
  'Olís',
  'Orkan',
];

const evaluate = (tmpCurr, gasData, operator, gasType) => {
  return operator === 'odyrt'
    ? tmpCurr[`${gasType}`] > gasData[`${gasType}`]
    : tmpCurr[`${gasType}`] < gasData[`${gasType}`];
};

export const BestPrice = (gasData, operator, gasType) => {
  let tmp = [];
  var cn = 0;
  let tmpCurr = gasData[0];
  stations.forEach((station) => {
    for (var i = cn; i < gasData.length - 1; i++) {
      if (
        gasData[i].company === station &&
        evaluate(tmpCurr, gasData[i], operator, gasType)
      ) {
        tmpCurr = gasData[i];
      } else if (gasData[i].company !== station) {
        cn = i;
        break;
      }
    }
    tmp.push(tmpCurr);
    tmpCurr = gasData[cn];
  });

  return tmp;
};

export const MostDiscount = (gasData) => {
  console.log('MostDicount', gasData);
};
