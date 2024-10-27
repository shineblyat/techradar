import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom'; 
import TechRadarChart from './components/TechRadarChart';
import AddTechForm from './components/AddTechForm';
import EditTechForm from './components/EditTechForm';
import TechDetailsModal from './components/TechDetailsModal'; 
import VotePage from './components/VotePage'; 
import './App.css'; 

function App() {
  const [techData, setTechData] = useState(() => {
    const savedData = localStorage.getItem('techData');
    return savedData
      ? JSON.parse(savedData)
      : [
          {
            name: 'JavaScript',
            category: 'Languages',
            status: 'Adopt',
            version: 1,
            isArchived: false,
            votes: 0,
            ratings: [],
            description: 'JavaScript is a versatile scripting language used primarily on the web.',
            documentation: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript',
          },
          {
            name: 'Python',
            category: 'Languages',
            status: 'Adopt',
            version: 1,
            isArchived: false,
            votes: 0,
            ratings: [],
            description: 'Python is a high-level, interpreted programming language known for its readability.',
            documentation: 'https://docs.python.org/3/',
          },
          // остальные технологии...
        ];
  });

  const [categoryFilter, setCategoryFilter] = useState('All');
  const [statusFilter, setStatusFilter] = useState('All');
  const [sortOrder, setSortOrder] = useState('name'); 
  const [editTech, setEditTech] = useState(null);
  const [notifications, setNotifications] = useState([]);
  const [selectedTech, setSelectedTech] = useState(null); 

  useEffect(() => {
    localStorage.setItem('techData', JSON.stringify(techData));
  }, [techData]);

  // Добавление уведомления
  const addNotification = (message, type) => {
    const id = Date.now();
    setNotifications([...notifications, { id, message, type }]);
    setTimeout(() => {
      setNotifications((prev) => prev.filter((notification) => notification.id !== id));
    }, 3000);
  };

  // Добавление новой технологии
  const handleAddTech = (newTech) => {
    setTechData([...techData, { ...newTech, version: 1, isArchived: false, votes: 0, ratings: [] }]);
    addNotification('Технология добавлена!', 'success');
  };

  // Редактирование технологии с версионированием
  const handleEditTech = (updatedTech) => {
    setTechData(
      techData.map((tech) =>
        tech.name === updatedTech.name ? { ...updatedTech, version: tech.version + 1 } : tech
      )
    );
    setEditTech(null);
    addNotification('Технология обновлена!', 'info');
  };

  // Архивирование технологии
  const handleArchiveTech = (name) => {
    setTechData(
      techData.map((tech) => (tech.name === name ? { ...tech, isArchived: true } : tech))
    );
    addNotification('Технология архивирована!', 'info');
  };

  // Удаление технологии
  const handleDeleteTech = (name) => {
    setTechData(techData.filter((tech) => tech.name !== name));
    addNotification('Технология удалена!', 'error');
  };

  // Оценка технологии
  const handleRateTech = (name, rating) => {
    setTechData(
      techData.map((tech) =>
        tech.name === name
          ? { ...tech, ratings: [...tech.ratings, rating] } 
          : tech
      )
    );
    addNotification(`Вы оценили ${name} на ${rating} баллов!`, 'success');
  };

  // Открытие модального окна
  const openDetails = (tech) => {
    setSelectedTech(tech);
  };

  // Закрытие модального окна
  const closeDetails = () => {
    setSelectedTech(null);
  };

  // Фильтрация данных
  const filteredTechData = techData.filter((tech) => {
    return (
      !tech.isArchived && 
      (categoryFilter === 'All' || tech.category === categoryFilter) &&
      (statusFilter === 'All' || tech.status === statusFilter)
    );
  });

  // Сортировка данных
  const sortedTechData = [...filteredTechData].sort((a, b) => {
    if (a[sortOrder] < b[sortOrder]) return -1;
    if (a[sortOrder] > b[sortOrder]) return 1;
    return 0;
  });

  return (
    <Router>
      <div className="App">
        {/* Обновленный блок с шапкой */}
        <header>
          <div className="header-left">
            <h1>Tech Radar</h1>
          </div>
          <nav>
            <Link to="/">Главная</Link>
            <Link to="/vote">Голосование</Link>
          </nav>
        </header>

        {/* Обновленный блок с фильтрами */}
        <section className="filter-section">
          <label>Категория:</label>
          <select value={categoryFilter} onChange={(e) => setCategoryFilter(e.target.value)}>
            <option value="All">Все</option>
            <option value="Languages">Языки</option>
            <option value="Tools">Инструменты</option>
            <option value="Techniques">Техники</option>
            <option value="Platforms">Платформы</option>
          </select>

          <label>Статус:</label>
          <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
            <option value="All">Все</option>
            <option value="Adopt">Внедрить</option>
            <option value="Trial">Тестировать</option>
            <option value="Assess">Оценить</option>
            <option value="Hold">Отложить</option>
          </select>

          <label>Сортировка по:</label>
          <select value={sortOrder} onChange={(e) => setSortOrder(e.target.value)}>
            <option value="name">Название</option>
            <option value="category">Категория</option>
            <option value="status">Статус</option>
            <option value="votes">Голоса</option>
          </select>
        </section>

        <Routes>
          {/* Главная страница */}
          <Route path="/" element={
            <>
              <section className="chart-section">
                <TechRadarChart data={sortedTechData} onOpenDetails={openDetails} />
              </section>

              <section className="form-section">
                {editTech ? (
                  <EditTechForm tech={editTech} onEdit={handleEditTech} />
                ) : (
                  <AddTechForm onAdd={handleAddTech} />
                )}
              </section>

              <section className="list-section">
                <h2>Текущие технологии</h2>
                <ul>
                  {sortedTechData.map((tech) => (
                    <li key={tech.name}>
                      <span>
                        {tech.name} - {tech.category} - {tech.status} - Голоса: {tech.votes}
                      </span>
                      <div className="action-buttons">
                        <button onClick={() => setEditTech(tech)}>Редактировать</button>
                        <button onClick={() => handleArchiveTech(tech.name)}>Архивировать</button>
                        <button onClick={() => handleDeleteTech(tech.name)}>Удалить</button>
                        <button onClick={() => openDetails(tech)}>Подробнее</button>
                      </div>
                    </li>
                  ))}
                </ul>
              </section>

              {selectedTech && <TechDetailsModal tech={selectedTech} onClose={closeDetails} />}
            </>
          } />

          {/* Страница голосования */}
          <Route path="/vote" element={<VotePage techData={techData} onRate={handleRateTech} />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
