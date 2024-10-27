import React, { useState } from 'react';

function RateTech({ name, onRate }) {
  const [rating, setRating] = useState(5); // Значение по умолчанию - 5
  const [isRated, setIsRated] = useState(false); // Состояние для отслеживания, отправлена ли оценка

  const handleRateChange = (e) => {
    setRating(Number(e.target.value));
  };

  const handleRateSubmit = () => {
    if (rating >= 1 && rating <= 10) { // Проверка валидности оценки
      onRate(name, rating); // Передаем оценку родителю (VotePage)
      setIsRated(true); // Оценка отправлена, блокируем повторное голосование
    } else {
      alert("Ошибка: Оценка должна быть от 1 до 10.");
    }
  };

  return (
    <div>
      <h4>Оцените технологию {name}</h4>
      <select value={rating} onChange={handleRateChange} disabled={isRated}>
        {[...Array(10).keys()].map((i) => (
          <option key={i + 1} value={i + 1}>
            {i + 1}
          </option>
        ))}
      </select>
      <button onClick={handleRateSubmit} disabled={isRated}>
        {isRated ? "Оценка отправлена" : "Оценить"}
      </button>
    </div>
  );
}

export default RateTech;
/*
// для бэка, голосование будет отправляться на бэк и там храниться 
import React, { useState } from 'react';

function RateTech({ name }) {
  const [rating, setRating] = useState(5);

  const handleRateChange = (e) => {
    setRating(Number(e.target.value));
  };

  const handleRateSubmit = async () => {
    const response = await fetch(`/api/technologies/${name}/rate`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
      body: JSON.stringify({ rating }),
    });

    if (response.ok) {
      alert(`Спасибо за оценку ${name}`);
    } else {
      console.error('Ошибка при отправке оценки');
    }
  };

  return (
    <div>
      <h4>Оцените технологию {name}</h4>
      <select value={rating} onChange={handleRateChange}>
        {[...Array(10).keys()].map((i) => (
          <option key={i + 1} value={i + 1}>{i + 1}</option>
        ))}
      </select>
      <button onClick={handleRateSubmit}>Оценить</button>
    </div>
  );
}

export default RateTech;
*/