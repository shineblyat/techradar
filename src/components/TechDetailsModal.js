// src/components/TechDetailsModal.js

import React from 'react';
import './TechDetailsModal.css';

function TechDetailsModal({ tech, onClose }) {
  if (!tech) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="close-button" onClick={onClose}>×</button>
        <h2>{tech.name}</h2>
        <p><strong>Category:</strong> {tech.category}</p>
        <p><strong>Status:</strong> {tech.status}</p>
        <p><strong>Votes:</strong> {tech.votes}</p>
        <p><strong>Version:</strong> {tech.version}</p>
        <p><strong>Description:</strong> {tech.description}</p>
        <p><strong>Documentation:</strong> <a href={tech.documentation} target="_blank" rel="noopener noreferrer">{tech.documentation}</a></p>
      </div>
    </div>
  );
}

export default TechDetailsModal;
