import React, { useEffect, useState } from 'react';
import './Notification.css';

function Notification({ message, type, onClose }) {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      onClose(); // Закрытие уведомления после таймера
    }, 3000); // Уведомление исчезнет через 3 секунды

    return () => clearTimeout(timer); // Очистка таймера при демонтировании компонента
  }, [onClose]);

  if (!isVisible) return null;

  return (
    <div className={`notification ${type}`}>
      {message}
    </div>
  );
}

export default Notification;
