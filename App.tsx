import { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginPage from './LoginPage';
import CreateAccountPage from './CreateAccPage';
import HomePage from './HomePage'; // Make sure it's imported
import AddProject from './AddProjPage';
import ProjectPage from './ProjectPage';
import './App.css';
import ReadyProjectPage from './ReadyProjectPage'; // Import the new component

const sampleProjects = [
  { name: 'Project 1', visibleTo: 'Everyone' },
  { name: 'Project 2', visibleTo: 'Admin' },
];

function App() {
  // State to manage user-created projects
  const [projects, setProjects] = useState(sampleProjects);

  // Function to handle project deletion
  const onDeleteProject = (projectName: string) => {
    setProjects((prevProjects) =>
      prevProjects.filter((project) => project.name !== projectName)
    );
  };

  return (
    <Router>
      <Routes>
        {/* Login and account creation */}
        <Route path="/" element={<LoginPage />} />
        <Route path="/create-account" element={<CreateAccountPage />} />

        {/* Home Page */}
        <Route
          path="/home"
          element={
            <HomePage projects={projects} onDeleteProject={onDeleteProject} /> // Pass the onDeleteProject function
          }
        />

        {/* Add new projects */}
        <Route
          path="/add-project"
          element={<AddProject setProjects={setProjects} projects={projects} />}
        />

        {/* Dynamic project details page */}
        <Route
          path="/project/:projectName"
          element={<ProjectPage projects={projects} />}
        />

        <Route
          path="/ready-project/:projectName"
          element={<ReadyProjectPage />}
        />
      </Routes>
    </Router>
  );
}

export default App;
