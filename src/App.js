import './App.scss';
import HomePage from './container/home-page/home-page.js';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import AscendaNavBar from './components/nav-bar';
import React from 'react';

function App() {
  return (
    <div className="App">
      <AscendaNavBar title="Ascenda" />
      <Router>
        <Route path='/' exact={true} component={HomePage} />
        <Route path='/home-page' exact={true} component={HomePage} />
      </Router>
    </div>
  );
}
export default App;

