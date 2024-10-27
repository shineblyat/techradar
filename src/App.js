import React, { useState } from 'react';
import TechRadarChart from './components/TechRadarChart';
import AddTechForm from './components/AddTechForm';

function App() {
  const [techData, setTechData] = useState([
    { name: "JavaScript", category: "Languages", status: "Adopt" },
    { name: "Python", category: "Languages", status: "Adopt" },
    { name: "GraphQL", category: "Tools", status: "Trial" },
    { name: "Docker", category: "Platforms", status: "Adopt" },
    { name: "Kubernetes", category: "Platforms", status: "Adopt" },
    { name: "Rust", category: "Languages", status: "Hold" },
    { name: "Flink", category: "Tools", status: "Assess" }
  ]);

  const handleAddTech = (newTech) => {
    setTechData([...techData, newTech]);
  };

  return (
    <div className="App">
      <h1>Tech Radar</h1>
      <TechRadarChart data={techData} />
      <AddTechForm onAdd={handleAddTech} />
    </div>
  );
}

export default App;
