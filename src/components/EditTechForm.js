import React, { useState } from 'react';

function EditTechForm({ tech, onEdit }) {
  const [name, setName] = useState(tech.name);
  const [category, setCategory] = useState(tech.category);
  const [status, setStatus] = useState(tech.status);

  const handleSubmit = (e) => {
    e.preventDefault();
    onEdit({ name, category, status });
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
          disabled
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
      <button type="submit">Save Changes</button>
    </form>
  );
}

export default EditTechForm;
