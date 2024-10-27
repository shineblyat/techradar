/*
import React, { useState } from 'react';

function LoginPage({ setUserRole }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    const response = await fetch('/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
    });

    if (response.ok) {
      const data = await response.json();
      localStorage.setItem('token', data.token);  // Сохраняем токен
      const decodedToken = jwt_decode(data.token);
      setUserRole(decodedToken.role);  // Устанавливаем роль пользователя
    } else {
      console.error('Ошибка авторизации');
    }
  };

  return (
    <div>
      <h1>Войти</h1>
      <form onSubmit={handleLogin}>
        <div>
          <label>Имя пользователя:</label>
          <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} required />
        </div>
        <div>
          <label>Пароль:</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        </div>
        <button type="submit">Войти</button>
      </form>
    </div>
  );
}

export default LoginPage;
*/