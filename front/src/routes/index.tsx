import React from 'react';
import { Routes, Route  } from 'react-router-dom';
import Home from '../pages/Home';
import IssueDetail from '../pages/IssueDetail';
import Issues from '../pages/Issues';

function RoutesComponent() {
  return (
    <Routes>
      <Route path="/" element={<Home/>} />
      <Route path="/issues" element={<Issues/>} />
      <Route path="/issue" element={<IssueDetail/>} />
    </Routes>
  );
}

export default RoutesComponent;
