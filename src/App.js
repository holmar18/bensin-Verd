import React from 'react';
import './App.css';
import {getGasPrices} from './service/gasService';
import PriceDisplay from './components/priceDisplay/priceDisplay';
import {BestPrice, WorsPrice, MostDiscount} from './service/helperService';

function GasApp() {
  const [gasData, setGasData] = React.useState({
    odyrt: [],
    dyrt: [],
  });

  React.useEffect(() => {
    getGasPrices(
      (CB) => {
        let b = BestPrice(CB.results, 'odyrt');
        let c = BestPrice(CB.results, 'dyrt');
        b.sort((a, b) => parseFloat(a.bensin95) - parseFloat(b.bensin95));
        c.sort((a, b) => parseFloat(a.bensin95) - parseFloat(b.bensin95));
        setGasData({odyrt: b, dyrt: c});
      },
      () => {
        console.log('Ekki Tókst að hafa samband');
      }
    );
  }, []);

  return (
    <div className='AppContainer'>
      {/* Lægsta verðið */}
      <div className='outercontainer'>
        <div className='titleContainer'>
          <span className='title'>Ódýrasta bensínið</span>
        </div>
        <div className='innercontainer'>
          {gasData.odyrt.map((station, index) => {
            return <PriceDisplay key={index} station={station} />;
          })}
        </div>
      </div>
      {/* Lægsta verðið - END */}

      {/* Hæðsta verðið */}
      <div className='outercontainer'>
        <div className='titleContainer'>
          <span className='title'>Dýrasta bensínið</span>
        </div>
        <div className='innercontainer'>
          {gasData.dyrt.map((station, index) => {
            return (
              <PriceDisplay
                key={index}
                station={station}
                className='stationItem'
              />
            );
          })}
        </div>
      </div>
      {/* Hæðsta verðið - END*/}
    </div>
  );
}

export default GasApp;
