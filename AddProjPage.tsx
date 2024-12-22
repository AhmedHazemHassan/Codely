import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./App.css";

interface Project {
  name: string;
  visibleTo: string;
}

const AddProject: React.FC<{ setProjects: React.Dispatch<React.SetStateAction<Project[]>>; projects: Project[] }> = ({
  setProjects,
  projects,
}) => {
  const [projectName, setProjectName] = useState("");
  const [visibleTo, setVisibleTo] = useState("");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const navigate = useNavigate();

  const addProject = (e: React.FormEvent) => {
    e.preventDefault();

    if (!projectName.trim()) {
      setErrorMessage("Project name is required!");
      return;
    }

    if (!visibleTo) {
      setErrorMessage("Please select a visibility option!");
      return;
    }

    // Clear errors
    setErrorMessage(null);

    // Add the new project to the list
    setProjects([...projects, { name: projectName, visibleTo }]);

    // Redirect back to the homepage
    navigate("/home");
  };

  return (
    <div className="AddProjectPage-container">
      <h1 className="AddProjectPage-title">Add a New Project</h1>
      {errorMessage && <p className="error-message">{errorMessage}</p>}
      <form className="add-project-form" onSubmit={addProject}>
        <div className="form-group">
          <label className="label" htmlFor="projectName">Project Name:</label>
          <input
            id="projectName"
            className="input-field"
            type="text"
            placeholder="Enter project name"
            value={projectName}
            onChange={(e) => setProjectName(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label className="label" htmlFor="visibleTo">Visibility:</label>
          <select
            id="visibleTo"
            className="select-field"
            value={visibleTo}
            onChange={(e) => setVisibleTo(e.target.value)}
            required
          >
            <option value="">Select Visibility</option>
            <option value="Everyone">Everyone</option>
            <option value="Team">Team</option>
            <option value="Private">Private</option>
          </select>
        </div>
        <button className="submit-button" type="submit">Add Project</button>
      </form>
    </div>
  );
};

export default AddProject;