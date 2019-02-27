import React from 'react';

import './OrderGateway.css';
import themes from '../../../utils/themes';

const gateway = (props) => {
  const contStyle = {
    backgroundColor: themes.colors.pad.full,
    fontFamily: themes.fonts.primary,
    color: themes.colors.main.dark.full,
  }

  return (
    <div className='gateway-cont' style={contStyle}>
      <p style={{borderBottom: `1px solid ${themes.colors.main.light.full}`}}>PICKUP</p>
      <p>DELIVERY</p>
    </div>
  )
};

export default gateway;