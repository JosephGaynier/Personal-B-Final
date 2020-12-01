import React from 'react';
import './App.css';
import { Switch, Router, Route } from 'react-router-dom';

import Menu from './Menu/Menu';
import Hero from './Hero/Hero';
import HomePage from './HomePage/HomePage';
import DashboardPage from './DashboardPage/DashboardPage';
import LoginPage from './LoginPage/LoginPage';
import Footer from './Footer/Footer';
import SignUpPage from './SignUpPage/SignUpPage';
import history from './history';

function App() {
  return (
    <Router history={history}>
      <Menu />
      <Hero />
      <div className="mainContainer">
        <Switch>
          <Route path="/dashboard">
            <DashboardPage></DashboardPage>
          </Route>
          <Route path="/login">
            <LoginPage></LoginPage>
          </Route>
          <Route path="/signup">
            <SignUpPage></SignUpPage>
          </Route>
          <Route path="/">
            <HomePage></HomePage>
          </Route>
        </Switch>
      </div>
      <Footer />
    </Router>
  );
}

export default App;
