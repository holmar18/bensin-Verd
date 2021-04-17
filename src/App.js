import React from 'react';
import './App.css';
import {getGasPrices} from './service/gasService';
import PriceDisplay from './components/priceDisplay/priceDisplay';
import {BestPrice} from './service/helperService';
import PetrolLogo from './assets/icons/PetrolStation_240x240.svg';
import PetrolLogoLight from './assets/icons/PetrolStationLight_240x240.svg';

function GasApp() {
  const [gasData, setGasData] = React.useState({
    odyrt95: [],
    dyrt95: [],
    odyrtDis: [],
    dyrtDis: [],
  });
  const [theme, setTheme] = React.useState('0');

  React.useEffect(() => {
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

  const handleChange = (e) => {
    setTheme(e.target.value);
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

  return (
    <div className={`AppContainer ${handleTheme('AppContainer')}`}>
      {/* Theme Picker */}
      <div className='themeContainer'>
        <button type='button' onClick={() => setTheme('0')}>
          <p>☀</p>
        </button>
        <input
          type='range'
          id='theme'
          name='vol'
          min='0'
          max='1'
          value={theme}
          onChange={(e) => handleChange(e)}
        />
        <button type='button' onClick={() => setTheme('1')}>
          <p>☾</p>
        </button>
      </div>
      {/* Theme Picker - END */}

      {/* Bensín Partur Titill */}
      <div className='outercontainerFlexTitle'>
        <div className={`outercontainer ${handleTheme('outercontainer')}`}>
          <span className={`gasSectionTitle ${handleTheme('gasSectionTitle')}`}>
            Bensínvaktin bensínverð
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
              Ódýrasta bensínið '95
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
              Dýrasta bensínið '95
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
              Ódýrasta bensínið Dísel
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
              Dýrasta bensínið Dísel
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
