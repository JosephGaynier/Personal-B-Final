import React from 'react';
import './App.css';
import { Switch, Router, Route } from 'react-router-dom';

import Menu from './Menu/Menu';
import Hero from './Hero/Hero';
import HomePage from './HomePage/HomePage';
import EditBudgetPage from './EditBudgetPage/EditBudgetPage';
import LoginPage from './LoginPage/LoginPage';
import LogoutPage from './LogoutPage/LogoutPage';
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
          <Route path="/editBudget">
            <EditBudgetPage></EditBudgetPage>
          </Route>
          <Route path="/login">
            <LoginPage></LoginPage>
          </Route>
          <Route path="/logout">
            <LogoutPage></LogoutPage>
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
