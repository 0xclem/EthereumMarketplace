import React, { Component } from 'react';
import { Switch, Route, BrowserRouter } from 'react-router-dom';
import MarketPlacePage from './pages/marketplace';
import AdminPage from './pages/admin';
import './App.css';

const App = () => (
  <div className="App">
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={MarketPlacePage} />
        <Route path="/mainAdmin" component={AdminPage} />
      </Switch>
    </BrowserRouter>
  </div>
);
export default App;
