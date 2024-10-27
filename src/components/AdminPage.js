import React, { useState } from 'react';

function AdminPage({ techData }) {
  const [newTechName, setNewTechName] = useState('');
  
  // Функция для добавления новой технологии
  const handleAddTech = async () => {
    const response = await fetch('/api/admin/technologies', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`,  // Токен
      },
      body: JSON.stringify({ name: newTechName }),
    });
    
    if (response.ok) {
      setNewTechName('');
      window.location.reload();  // Обновляем страницу для загрузки новых технологий
    } else {
      console.error('Ошибка при добавлении технологии');
    }
  };

  return (
    <div>
      <h1>Админ панель</h1>
      <h2>Добавить новую технологию</h2>
      <input
        type="text"
        value={newTechName}
        onChange={(e) => setNewTechName(e.target.value)}
        placeholder="Название технологии"
      />
      <button onClick={handleAddTech}>Добавить</button>

      <h2>Управление существующими технологиями</h2>
      <ul>
        {techData.map((tech) => (
          <li key={tech.id}>
            {tech.name}
            <button>Удалить</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default AdminPage;
