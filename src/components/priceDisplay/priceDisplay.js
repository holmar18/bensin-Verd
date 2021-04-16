import React from 'react';
import PropTypes from 'prop-types';
import './priceDisplay.css';

function PriceDisplay(props) {
  console.log('PROPS: ', props);
  return (
    <React.Fragment>
      <div className={'stationItemContainer'}>
        <span className={'iText company'}>{props.station.company}</span>
        <span className={'iText name'}>{props.station.name}</span>
        <span
          className={`iText ${
            props.station.bensin95_discount !== null ? 'disc' : 'discNot'
          }`}>
          {props.station.bensin95_discount !== null
            ? 'Afsláttur'
            : 'Enginn Afsláttur'}
        </span>
        <span className={'iText bensin'}>{props.station.bensin95}</span>
      </div>
    </React.Fragment>
  );
}

PriceDisplay.propTypes = {
  objectType: PropTypes.shape({
    bensin95: PropTypes.number,
    bensin95_discount: PropTypes.number,
    company: PropTypes.string,
    diesel: PropTypes.number,
    diesel_discount: PropTypes.number,
    geo: PropTypes.object,
    name: PropTypes.string,
  }),
};

export default PriceDisplay;
