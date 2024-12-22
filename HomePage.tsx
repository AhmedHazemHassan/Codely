import React from 'react';
import { Link } from 'react-router-dom';
import './App.css';

// Define Project type to use consistently
interface Project {
  name: string;
  visibleTo: string; // 'visibleTo' is required
  description?: string; // Optional, for ready-to-use projects
}

// Ready-to-use projects with descriptions and visibility set to 'Everyone'
const readyToUseProjects: Project[] = [
  { name: 'LED Controller', description: 'Code to control an LED.', visibleTo: 'Everyone' },
  { name: 'Servo Motor', description: 'Code to control a servo motor.', visibleTo: 'Everyone' },
  { name: 'DHT11 Sensor', description: 'Code to read temperature and humidity.', visibleTo: 'Everyone' },
];

interface HomePageProps {
  projects: Project[]; // Props passed for custom projects
  onDeleteProject: (projectName: string) => void; // Callback for deleting a project
}

const HomePage: React.FC<HomePageProps> = ({ projects, onDeleteProject }) => {
  return (
    <div className="homepage-container">
      {/* Main Content for Custom Projects */}
      <div className="main-content">
        <h1 className="homepage-title">Project List</h1>
        <ul className="project-list">
          {projects.map((project, index) => (
            <li key={index} className="project-item">
              <Link
                to={`/project/${project.name}`} // Dynamic link for individual custom project page
                className="project-link"
              >
                <span className="project-name">{project.name}</span>
              </Link>
              <span className="project-visibility"> - Visible to: {project.visibleTo}</span>
              <button
                className="delete-project-button"
                onClick={() => onDeleteProject(project.name)}
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
        <Link to="/add-project">
          <button className="add-project-button">Add New Project</button>
        </Link>
        <Link to="/">
          <button className="logout-button">Logout</button>
        </Link>
      </div>

      {/* Sidebar for Ready-to-Use Projects */}
      <div className="sidebar">
        <h2 className="sidebar-title">Ready-to-Use Projects</h2>
        <ul className="ready-projects-list">
          {readyToUseProjects.map((project, index) => (
            <li key={index} className="ready-project-item">
              <Link
                to={`/ready-project/${project.name}`} // Dynamic link for ready-to-use project page
                className="ready-project-link"
              >
                <span className="ready-project-name">{project.name}</span>
              </Link>
              {project.description && <p className="ready-project-description">{project.description}</p>}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default HomePage;
