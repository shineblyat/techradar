import React, { useState } from 'react';

function AddTechForm({ onAdd }) {
  const [name, setName] = useState('');
  const [category, setCategory] = useState('Languages');
  const [status, setStatus] = useState('Adopt');
  const [description, setDescription] = useState('');
  const [documentation, setDocumentation] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name.trim() === '') return;

    onAdd({ name, category, status, description, documentation });

    // Очистим форму после добавления
    setName('');
    setCategory('Languages');
    setStatus('Adopt');
    setDescription('');
    setDocumentation('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Technology Name:</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Category:</label>
        <select value={category} onChange={(e) => setCategory(e.target.value)}>
          <option value="Languages">Languages</option>
          <option value="Tools">Tools</option>
          <option value="Techniques">Techniques</option>
          <option value="Platforms">Platforms</option>
        </select>
      </div>
      <div>
        <label>Status:</label>
        <select value={status} onChange={(e) => setStatus(e.target.value)}>
          <option value="Adopt">Adopt</option>
          <option value="Trial">Trial</option>
          <option value="Assess">Assess</option>
          <option value="Hold">Hold</option>
        </select>
      </div>
      <div>
        <label>Description:</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Documentation URL:</label>
        <input
          type="url"
          value={documentation}
          onChange={(e) => setDocumentation(e.target.value)}
          required
        />
      </div>
      <button type="submit">Add Technology</button>
    </form>
  );
}

export default AddTechForm;
