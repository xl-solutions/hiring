import React from 'react';
import { Routes, Route  } from 'react-router-dom';
import Home from '../pages/Home';
import Issues from '../pages/Issues';

function RoutesComponent() {
  return (
    <Routes>
      <Route path="/" element={<Home/>} />
      <Route path="/issues" element={<Issues/>} />
    </Routes>
  );
}

export default RoutesComponent;
