import React from 'react';
import axios from 'axios';
import history from '../history';

function login(username, password) {
  const data = {
    username,
    password
  };
  axios.post('https://personal-budget-final-ednzw.ondigitalocean.app/personal-b-final-server:8080/login', data)
      .then(res => {
          console.log(res);
          if (res && res.data && res.data.success) {
              localStorage.setItem('jwt', res.data.token);
              localStorage.setItem('userId', res.data.userId);
              history.push("/dashboard");
          }
      });
}

function LoginPage() {
  return (
    <div>
      <div>
        <h1>Login</h1>

        <div>
          <label for="username">Username</label>
          <input type="text" name="username" id="username"></input>
        </div>

        <div>
          <label for="password">Password</label>
          <input type="password" name="password" id="password"></input>
        </div>

        <button onClick={() => login(document.getElementById('username').value, document.getElementById('password').value)}>Login</button>
      </div>
    </div>
  );
}

export default LoginPage;