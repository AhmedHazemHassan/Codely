import React from 'react';
import { Link } from 'react-router-dom';
import './App.css';

interface Project {
  name: string;
  visibleTo: string;
}

interface HomePageProps {
  projects: Project[];
}

const HomePage: React.FC<HomePageProps> = ({ projects }) => {
  return (
    <div className="homepage-container">
      <h1 className="homepage-title">Project List</h1>
      <ul className="project-list">
        {projects.map((project, index) => (
          <li key={index} className="project-item">
            <Link
              to={`/project/${project.name}`} // Dynamic link for individual project page
              className="project-link"
            >
              <span className="project-name">{project.name}</span>
            </Link>
            <span className="project-visibility"> - Visible to: {project.visibleTo}</span>
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
  );
};

export default HomePage;
