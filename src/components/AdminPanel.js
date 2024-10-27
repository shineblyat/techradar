// src/components/AdminPanel.js
import React, { useState } from 'react';
import AddTechForm from './AddTechForm';
import EditTechForm from './EditTechForm';

function AdminPanel({ techData, onAddTech, onEditTech, onDeleteTech }) {
  const [editTech, setEditTech] = useState(null);

  return (
    <div>
      <h1>Админ-панель</h1>
      <section className="admin-section">
        {editTech ? (
          <EditTechForm tech={editTech} onEdit={onEditTech} />
        ) : (
          <AddTechForm onAdd={onAddTech} />
        )}
      </section>
      <section className="list-section">
        <h2>Управление технологиями</h2>
        <ul>
          {techData.map((tech) => (
            <li key={tech.name}>
              <span>
                {tech.name} - {tech.category} - {tech.status}
              </span>
              <div className="action-buttons">
                <button onClick={() => setEditTech(tech)}>Редактировать</button>
                <button onClick={() => onDeleteTech(tech.name)}>Удалить</button>
              </div>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}

export default AdminPanel;
