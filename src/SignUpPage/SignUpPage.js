import React from 'react';
import axios from 'axios';
import history from '../history';

function signUp(username, password) {
  const data = {
    username,
    password,
  };
  console.log(data);
  axios.post('http://localhost:3000/signup', data)
      .then(res => {
          console.log(res);
          if (res && res.data) {
              //localStorage.setItem('jwt', res.data.token);
              history.push("/login");
              console.log("Success!");
          }
      });
}

function SignUpPage() {
  return (
    <div>
      <div>
        <h1>Sign Up</h1>

        <div>
          <label for="username">Enter Username</label>
          <input type="text" name="username" id="username"></input>
        </div>

        <div>
          <label for="password">Enter Password</label>
          <input type="password" name="password" id="password"></input>
        </div>

        <button onClick={() => signUp(document.getElementById('username').value, document.getElementById('password').value)}>Sign Up</button>
      </div>
    </div>
  );
}

export default SignUpPage;