import React from 'react';
import RateTech from './RateTech';

// Функция для расчета среднего рейтинга
const calculateAverageRating = (ratings) => {
  if (!ratings || ratings.length === 0) return 0; // Проверка на наличие массива
  const sum = ratings.reduce((a, b) => a + b, 0);
  return (sum / ratings.length).toFixed(1); // Возвращаем средний рейтинг с округлением до одного знака
};

function VotePage({ techData, onRate }) {
  return (
    <div>
      <h1>Голосование за технологии</h1>
      <ul>
        {techData.map((tech) => (
          <li key={tech.name}>
            <strong>{tech.name}</strong> - {tech.category} ({tech.status}) <br />
            Средний рейтинг: {calculateAverageRating(tech.ratings)} / 10 <br />
            {/* Компонент для оценки технологии */}
            <RateTech name={tech.name} onRate={onRate} />
          </li>
        ))}
      </ul>
    </div>
  );
}

export default VotePage;
/*
// переделанный компонент голосования для админки
import React from 'react';
import RateTech from './RateTech';

// Функция для расчета среднего рейтинга
const calculateAverageRating = (ratings) => {
  if (!ratings || ratings.length === 0) return 0; // Проверка на наличие массива
  const sum = ratings.reduce((a, b) => a + b, 0);
  return (sum / ratings.length).toFixed(1); // Возвращаем средний рейтинг с округлением до одного знака
};

function VotePage({ techData, onRate }) {
  return (
    <div>
      <h1>Голосование за технологии</h1>
      <ul>
        {techData.map((tech) => (
          <li key={tech.name}>
            <strong>{tech.name}</strong> - {tech.category} ({tech.status}) <br />
            Средний рейтинг: {calculateAverageRating(tech.ratings)} / 10 <br />
            //{ Компонент для оценки технологии }/*
            <RateTech name={tech.name} onRate={onRate} />
          </li>
        ))}
      </ul>
    </div>
  );
}

export default VotePage;
*/