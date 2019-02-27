import React from 'react';

import './Home.css';
import themes from '../../../utils/themes';
import OrderGateway from '../order/OrderGateway';
import Modal from '../../../utils/modal/Modal';

import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css'; 

const home = (props) => {
  const styles = {
    slider: {
      borderTop: `2px solid ${themes.colors.main.light.full}`,
      borderBottom: `2px solid ${themes.colors.main.light.full}`
    },
    subtitle: {
      fontFamily: themes.fonts.primary,
      fontSize: themes.fonts.sizes.subtitle,
      color: themes.colors.main.dark.full,
      // textShadow: themes.fonts.shadow,
      paddingRight: '12px',
      height: 'auto',
      textAlign: 'right',
      position: 'absolute',
      bottom: '-55px', right: '0',
      background: 'linear-gradient(90deg, rgba(193,56,56,0) 20%, rgba(1,18,4,.6) 100%)'
    },
    span: {
      color: themes.colors.accent_alt.full
    },
    c2a: {
      backgroundColor: themes.colors.pad.full,
      color: themes.colors.main.dark.full,
      fontFamily: themes.fonts.primary,
      marginBottom: props.view !== 'portrait' ? '50px' : null
    }
  };

  const slickSettings = {
    arrows: false,
    className: 'slider',
    lazyload: true,
    fade: true,
    infinite: true,
    speed: 600,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000
  };

  const phoneInPortrait = (view) => {
    if(view !== 'portrait') return <OrderGateway />;

    return (
      <Modal>
        <OrderGateway />
      </Modal>
    )
  };

  return (
    <div className='home'>
      <div className='slider-cont' style={styles.slider}>
        <Slider {...slickSettings}>
          <div>
            <div className='slide slide-1'>
              <h2 style={styles.subtitle}>
                TOP NOTCH<br/>
                <span style={styles.span}>PIZZA</span>
              </h2>
            </div>
          </div>
          <div>
            <div className='slide slide-2'>
              <h2 style={styles.subtitle}>
                DAILY<br/>
                <span style={styles.span}>DEALS</span>
              </h2>
            </div>
          </div>
          <div>
            <div className='slide slide-3'>
              <h2 style={styles.subtitle}>
                HOMEMADE<br/>
                <span style={styles.span}>PASTA</span>
              </h2>
            </div>
          </div>
          <div>
            <div className='slide slide-4'>
              <h2 style={styles.subtitle}>
                THE FRESHEST<br/>
                <span style={styles.span}>INGREDIENTS</span>
              </h2>
            </div>
          </div>
        </Slider>
      </div>
      <div className='callToAction-cont' >
        <p className='callToAction' style={styles.c2a}><strong>ORDER NOW</strong></p>
        {phoneInPortrait(props.view)}
      </div>
    </div>
  )
}

export default home;