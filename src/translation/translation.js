const language = {
  is: {
    Gastitle: 'Bensínvaktin bensínverð',
    cheap95: "Ódýrasta bensínið '95",
    expen95: "Dýrasta bensínið '95",
    cheapDis: 'Ódýrasta bensínið Dísel',
    expenDis: 'Dýrasta bensínið Dísel',
    discount: 'Afsláttu',
    nodiscount: 'Enginn Afsláttur',
  },
  eng: {
    Gastitle: 'Gasprices in Iceland',
    cheap95: "Cheapest gasoline '95",
    expen95: "Worst prices gasoline '95",
    cheapDis: 'Cheapest diesel',
    expenDis: 'Worst prices diesel',
    discount: 'discount',
    nodiscount: 'no-discount',
  },
};

const currentLang = (lang) => {
  if (lang === 'is') {
    return language.is;
  } else {
    return language.eng;
  }
};

export default currentLang;
