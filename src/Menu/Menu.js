import React from 'react';
import { Link } from 'react-router-dom';

function Menu() {
  return (
    <nav className="menu">
      <ul>
        <li><Link to="">Home</Link></li>
        <li><Link to="/editBudget">Budget</Link></li>
        <li><Link to="/login">Login</Link></li>
        <li><Link to="/logout">Logout</Link></li>
        <li><Link to="/signup">Signup</Link></li>
      </ul>
    </nav>
  );
}

export default Menu;