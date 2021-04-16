export const getGasPrices = (CB, ERR) => {
  fetch('https://apis.is/petrol')
    .then((res) => res.json())
    .then(
      (resJson) => {
        CB(resJson);
      },
      () => {
        ERR();
      }
    );
};
