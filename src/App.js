import React from 'react';
import ReactGa from 'react-ga';
import './App.css';
import {getGasPrices} from './service/gasService';
import PriceDisplay from './components/priceDisplay/priceDisplay';
import {BestPrice} from './service/helperService';
import PetrolLogo from './assets/icons/PetrolStation_240x240.svg';
import PetrolLogoLight from './assets/icons/PetrolStationLight_240x240.svg';
import currentLang from './translation/translation';
import Toggler from './components/toggler';

function GasApp() {
  const [gasData, setGasData] = React.useState({
    odyrt95: [],
    dyrt95: [],
    odyrtDis: [],
    dyrtDis: [],
  });
  const [theme, setTheme] = React.useState('0');
  const [lang, setLang] = React.useState({
    code: 'is',
    bin: '0',
  });

  React.useEffect(() => {
    ReactGa.initialize('G-V2MBYNFFZN');
    ReactGa.pageview(window.location.pathname + window.location.search);
    getGasPrices(
      (CB) => {
        let b = BestPrice(CB.results, 'odyrt', 'bensin95').sort(
          (a, b) => parseFloat(a.bensin95) - parseFloat(b.bensin95)
        );
        let c = BestPrice(CB.results, 'dyrt', 'bensin95').sort(
          (a, b) => parseFloat(b.bensin95) - parseFloat(a.bensin95)
        );
        let d = BestPrice(CB.results, 'odyrt', 'diesel').sort(
          (a, b) => parseFloat(a.diesel) - parseFloat(b.diesel)
        );
        let e = BestPrice(CB.results, 'dyrt', 'diesel').sort(
          (a, b) => parseFloat(b.diesel) - parseFloat(a.diesel)
        );
        setGasData({odyrt95: b, dyrt95: c, odyrtDis: d, dyrtDis: e});
      },
      () => {
        console.log('Ekki Tókst að hafa samband');
      }
    );
  }, []);

  const handleChangeDragTheme = (e) => {
    setTheme(e.target.value);
  };

  const handleChangeDragLang = (e) => {
    e.target.value === '0'
      ? setLang({code: 'is', bin: '0'})
      : setLang({code: '', bin: '1'});
  };

  const handleTheme = (type) => {
    if (type === 'AppContainer') {
      return theme === '0' ? 'AppContainerLight' : 'AppContainerDark';
    } else if (type === 'outercontainer') {
      return theme === '0' ? 'outercontainerLight' : 'outercontainerDark';
    } else if (type === 'gasSectionTitle') {
      return theme === '0' ? 'gasSectionTitleLight' : 'gasSectionTitleDark';
    } else if (type === 'iTextLight') {
      return theme === '0' ? 'iTextLight' : 'iTextDark';
    } else if (type === 'titleLight') {
      return theme === '0' ? 'titleLight' : 'titleDark';
    } else if (type === 'stationItemContainerLight') {
      return theme === '0'
        ? 'stationItemContainerLight'
        : 'stationItemContainerDark';
    }
  };

  const handleSetTheme = (value) => {
    setTheme(value);
  };

  const handleSetLang = (language) => {
    language === '0'
      ? setLang({code: 'is', bin: '0'})
      : setLang({code: '', bin: '1'});
  };

  return (
    <div className={`AppContainer ${handleTheme('AppContainer')}`}>
      {/* Theme Picker */}
      {/* Theme Picker - END */}
      <Toggler
        handleSet={handleSetTheme}
        handleChange={handleChangeDragTheme}
        para={{first: '☀', second: '☾'}}
        theme={theme}
        class={'themeContainer'}
      />
      {/* Language Picker */}
      <Toggler
        handleSet={handleSetLang}
        handleChange={handleChangeDragLang}
        para={{first: 'IS', second: 'EN'}}
        theme={lang.bin}
        class={'themeContainerLang'}
      />
      {/* Language Picker - END */}

      {/* Bensín Partur Titill */}
      <div className='outercontainerFlexTitle'>
        <div className={`outercontainer ${handleTheme('outercontainer')}`}>
          <span className={`gasSectionTitle ${handleTheme('gasSectionTitle')}`}>
            {currentLang(lang.code).Gastitle}
            <img
              src={theme === '0' ? PetrolLogo : PetrolLogoLight}
              style={{height: '2rem', width: '2rem', marginLeft: '0.8rem'}}
              alt='bensinvaktin logo'
              className='pumpIcon'
            />
          </span>
        </div>
      </div>
      {/* Bensín Partur Titill - END */}

      {/* Lægsta verðið '95*/}
      <div className='outercontainerFlex'>
        <div className={`outercontainer ${handleTheme('outercontainer')}`}>
          <div className='titleContainer'>
            <span className={`${handleTheme('titleLight')}`}>
              {currentLang(lang.code).cheap95}
            </span>
          </div>
          <div className='innercontainer'>
            {gasData.odyrt95.map((station, index) => {
              return (
                <PriceDisplay
                  key={index}
                  station={station}
                  type={{gas: 'bensin95', disc: 'bensin95_discount'}}
                  theme={theme}
                  handleTheme={handleTheme}
                  translations={currentLang(lang.code)}
                />
              );
            })}
          </div>
        </div>
      </div>
      {/* Lægsta verðið '95 - END */}

      {/* Hæðsta verðið '95 */}
      <div className='outercontainerFlex'>
        <div className={`outercontainer ${handleTheme('outercontainer')}`}>
          <div className='titleContainer'>
            <span className={`${handleTheme('titleLight')}`}>
              {currentLang(lang.code).expen95}
            </span>
          </div>
          <div className='innercontainer'>
            {gasData.dyrt95.map((station, index) => {
              return (
                <PriceDisplay
                  key={index}
                  station={station}
                  type={{gas: 'bensin95', disc: 'bensin95_discount'}}
                  theme={theme}
                  handleTheme={handleTheme}
                  translations={currentLang(lang.code)}
                />
              );
            })}
          </div>
        </div>
      </div>
      {/* Hæðsta verðið '95 - END*/}

      {/* Lægsta verðið Dísel */}
      <div className='outercontainerFlex'>
        <div className={`outercontainer ${handleTheme('outercontainer')}`}>
          <div className='titleContainer'>
            <span className={`${handleTheme('titleLight')}`}>
              {currentLang(lang.code).cheapDis}
            </span>
          </div>
          <div className='innercontainer'>
            {gasData.odyrtDis.map((station, index) => {
              return (
                <PriceDisplay
                  key={index}
                  station={station}
                  type={{gas: 'diesel', disc: 'diesel_discount'}}
                  theme={theme}
                  handleTheme={handleTheme}
                  translations={currentLang(lang.code)}
                />
              );
            })}
          </div>
        </div>
      </div>
      {/* Lægsta verðið 'Dísel - END*/}

      {/* Hæðsta verðið Dísel */}
      <div className='outercontainerFlex'>
        <div className={`outercontainer ${handleTheme('outercontainer')}`}>
          <div className='titleContainer'>
            <span className={`${handleTheme('titleLight')}`}>
              {currentLang(lang.code).expenDis}
            </span>
          </div>
          <div className='innercontainer'>
            {gasData.dyrtDis.map((station, index) => {
              return (
                <PriceDisplay
                  key={index}
                  station={station}
                  type={{gas: 'diesel', disc: 'diesel_discount'}}
                  theme={theme}
                  handleTheme={handleTheme}
                  translations={currentLang(lang.code)}
                />
              );
            })}
          </div>
        </div>
      </div>
      {/* Hæðsta verðið 'Dísel - END*/}
    </div>
  );
}

export default GasApp;
