import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './App.css';

interface Project {
  name: string;
  visibleTo: string;
}

interface ProjectPageProps {
  projects: Project[];
}

const ProjectPage: React.FC<ProjectPageProps> = ({ projects }) => {
  const { projectName } = useParams<{ projectName: string }>(); // Get the projectName from the URL
  const navigate = useNavigate();

  // Find the project that matches the projectName from the URL
  const project = projects.find((p) => p.name === projectName);

  if (!project) {
    return <p>Project not found!</p>; // If the project does not exist, show a message
  }

  return (
    <div className="project-page-container">
      <button onClick={() => navigate('/home')} className="back-button">
        Back to Projects
      </button>
      <div className="project-details">
        <h1 className="project-name">{project.name}</h1>
        <p className="project-visibility">Visibility: {project.visibleTo}</p>
      </div>
    </div>
  );
};

export default ProjectPage;
