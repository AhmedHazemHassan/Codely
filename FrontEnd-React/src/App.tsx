import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginPage from './LoginPage';
import CreateAccountPage from './CreateAccPage';
import HomePage from './HomePage';
import AddProject from './AddProjPage'; 
import ProjectPage from './ProjectPage';
import { useState } from 'react';
import "./App.css";

const sampleProjects = [
  { name: 'Project 1', visibleTo: 'Everyone' },
  { name: 'Project 2', visibleTo: 'Admin' },
];

function App() {
  const [projects, setProjects] = useState(sampleProjects); 
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/create-account" element={<CreateAccountPage />} />
        <Route path="/home" element={<HomePage projects={projects} />} />
        <Route path="/add-project" element={<AddProject setProjects={setProjects} projects={projects} />}  />
        <Route path="/project/:projectName" element={<ProjectPage projects={projects} />} />
        <Route path="/add-project" element={<AddProject setProjects={setProjects} projects={projects} />}  />      
      </Routes>
    </Router>
  );
}

export default App;
