import React from 'react';

import LOGO from '../../assets/logo/logo.svg';

export default function Logo(props) {
  return (
    <img src={LOGO} alt="" className="logo" {...props} />
  );
}