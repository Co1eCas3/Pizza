import React from 'react';

import './User_Sidebar.css';
import themes from '../../../utils/themes';
import CartIcon from './CartIcon';

const sbTab = (props) => {
  const tabStyles = {
    backgroundColor: themes.colors.pad.full
  }

  return (
    <div className='sb-tab' style={tabStyles}>
      <CartIcon />
      <p style={{color: themes.colors.main.light.full}}><strong>$0.00</strong></p>
    </div>
  )
};

export default sbTab;