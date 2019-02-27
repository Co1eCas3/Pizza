import React from 'react';

import './Modal.css';
import themes from '../themes';

const modal = (props) => {
  const styles ={
    open: {
      backgroundColor: themes.colors.main.light.full,
      transform: 'translateY(0)',
      opacity: '1'
    },
    closed: {
      opacity: '0',
      transform: 'translateY(100%)'
    }
  }

  return (
    <div
      className='modal modal-open'
      style={styles.closed}>
      {props.children}
    </div>
  )
};

export default modal;