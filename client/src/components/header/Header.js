import React from 'react';
import './Header.css';

import Logo from '../../assets/imgs/PIzza.png';
import themes from '../../utils/themes';
import SbTab from './user_sidebar/SideBar_Tab';

const header = (props) => {
  const headerStyles = {
    borderBottom: `2px solid ${themes.colors.pad.half}`,
    backgroundColor: themes.colors.main.light.full
    // will have to change z-index for:
    //  contact
    //  account settings
    //  side menu
  }

  const titleStyles = {
    fontFamily: themes.fonts.accent,
    fontSize: themes.fonts.sizes.title,
    color: themes.colors.accent.full,
    marginLeft: '70px',
    textShadow: themes.fonts.shadow
  }

  return (
    <header 
      className = 'header'
      style = {headerStyles}>
      <div className = 'logo' style = {{backgroundImage: `url('${Logo}')`}}></div>
      <p style = {titleStyles}>Hot Pizza</p>
      <SbTab />
    </header>
  )
};

export default header;