import React, { useState } from 'react';
import { useUser } from '../context/UserContext';
import '../css/Login.css'

function Login() {
  const { login } = useUser();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    login(username, password);
  };

  return (
    <div className='login-container'>
      <h2>Login</h2>
      <div className='login-input-container'>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className='login-input'
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className='login-input'
        />
      </div>
        <button className='login-button' onClick={handleLogin}>Login</button>
    </div>
  );
}

export default Login;
