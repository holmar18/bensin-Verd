import React from 'react';
import PropTypes from 'prop-types';
import './priceDisplay.css';

function PriceDisplay(props) {
  return (
    <React.Fragment>
      <div
        className={`stationItemContainer ${props.handleTheme(
          'stationItemContainerLight'
        )}`}>
        <span className={`${props.handleTheme('iTextLight')} company`}>
          {props.station.company}
        </span>
        <span className={`${props.handleTheme('iTextLight')} name`}>
          {props.station.name}
        </span>
        <span
          className={`${props.handleTheme('iTextLight')} ${
            props.station[`${props.type.disc}`] !== null ? 'discNot' : 'disc'
          }`}>
          {props.station[`${props.type.disc}`] !== null
            ? `${props.translations.discount}: ${
                props.station[`${props.type.disc}`]
              }`
            : `${props.translations.nodiscount}`}
        </span>
        <span className={`${props.handleTheme('iTextLight')} bensin`}>
          {props.station[`${props.type.gas}`]}
        </span>
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
