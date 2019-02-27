import React from 'react';

import './Nav.css';
import HomeIcon from './navItems/HomeIcon';
import CouponIcon from './navItems/CouponIcon';
import OrderIcon from './navItems/OrderIcon';
import ContactIcon from './navItems/ContactIcon';
import AccountSettingsIcon from './navItems/AccountSettingsIcon';
import themes from '../../utils/themes';

const nav = (props) => {
  const bgStyles = {
    backgroundColor: themes.colors.pad.half
  };

  const cur = props.cur;

  const navItemStyle = {
    backgroundColor: themes.colors.main.light.full,
    fill: themes.colors.pad.full,
    fontFamily: themes.fonts.primary,
    color: themes.colors.accent.full,
    textShadow: themes.fonts.shadow
  };

  const curNavItemStyle = {...navItemStyle};

  curNavItemStyle.fill = themes.colors.accent.full;

  return (
    <nav className = 'nav' style={bgStyles}>
      <ul>
        <li className='nav-item'
          style={cur === 'home' ? curNavItemStyle :  navItemStyle}
          onClick={() => props.navHandler('home')}>
          <HomeIcon />
        </li>
        <li className='nav-item'
          style={cur === 'coupons' ? curNavItemStyle :  navItemStyle}
          onClick={() => props.navHandler('coupons')}>
          <CouponIcon />
        </li>
        <li className='nav-item order'
          style={cur === 'order' ? curNavItemStyle :  navItemStyle}
          onClick={() => props.navHandler('order')}>
          <OrderIcon />
        </li>
        <li className='nav-item'
          style={cur === 'contact' ? curNavItemStyle :  navItemStyle}
          onClick={() => props.navHandler('contact')}>
          <ContactIcon />
        </li>
        <li className='nav-item'
          style={cur === 'details' ? curNavItemStyle :  navItemStyle}
          onClick={() => props.navHandler('details')}>
          <AccountSettingsIcon />
        </li>
      </ul>
    </nav>
  )
};

export default nav;