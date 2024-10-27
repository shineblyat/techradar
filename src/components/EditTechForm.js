import React, { useState } from 'react';

function EditTechForm({ tech, onEdit }) {
  const [category, setCategory] = useState(tech.category);
  const [status, setStatus] = useState(tech.status);
  const [description, setDescription] = useState(tech.description);
  const [documentation, setDocumentation] = useState(tech.documentation);

  const handleSubmit = (e) => {
    e.preventDefault();
    onEdit({ 
      name: tech.name, 
      category, 
      status, 
      description, 
      documentation 
    }); // Имя технологии остается прежним
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Technology Name:</label>
        <input
          type="text"
          value={tech.name}
          disabled // Имя не редактируемое
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
      <button type="submit">Save Changes</button>
    </form>
  );
}

export default EditTechForm;
