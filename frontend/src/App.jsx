import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import Authentication from './components/auth/authentication';

const App = () => (
  <Router>
    <h1>DevSays homepage</h1>
    <Authentication />
  </Router>
);

export default App;
