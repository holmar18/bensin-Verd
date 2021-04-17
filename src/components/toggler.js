import React from 'react';
import PropTypes from 'prop-types';
import isFlag from '../assets/icons/is_flag.svg';
import enFlag from '../assets/icons/en_flag.svg';

function Toggler(props) {
  return (
    <div className={`${props.class}`}>
      <button type='button' onClick={() => props.handleSet('0')}>
        {props.para.first.length !== 2 ? (
          <p>{props.para.first}</p>
        ) : (
          <span>
            <img src={isFlag} className='langLogo' alt='translate' />{' '}
          </span>
        )}
      </button>
      <input
        type='range'
        id='theme'
        name='vol'
        min='0'
        max='1'
        value={props.theme}
        onChange={(e) => props.handleChange(e)}
      />
      <button type='button' onClick={() => props.handleSet('1')}>
        {props.para.second.length !== 2 ? (
          <p>{props.para.second}</p>
        ) : (
          <span>
            <img src={enFlag} className='langLogo' alt='translate' />{' '}
          </span>
        )}
      </button>
    </div>
  );
}

Toggler.propTypes = {};

export default Toggler;
