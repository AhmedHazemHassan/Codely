import React, { useState } from "react";
import { useParams, Link } from "react-router-dom";
import componentsData from "./componentsData";
import "./App.css";

const ReadyProjectPage: React.FC = () => {
  const { projectName } = useParams<{ projectName: string }>();
  const [hardwareStatus, setHardwareStatus] = useState<string>("Not Connected");

  const project = componentsData.find(
    (component) => component.name === projectName
  );

  if (!project) {
    return <div className="error-message">Project not found.</div>;
  }

  const handleHardwareConnection = () => {
    // Simulate checking hardware connection
    const isConnected = Math.random() > 0.2; // Simulate 80% success rate
    if (isConnected) {
      setHardwareStatus("Connected and Ready");
    } else {
      setHardwareStatus("Connection Failed. Please try again.");
    }
  };

  const handleCodeUpload = () => {
    // Simulate uploading code to hardware
    if (hardwareStatus === "Connected and Ready") {
      alert("Code successfully uploaded to hardware!");
    } else {
      alert("Please connect your hardware first!");
    }
  };

  return (
    <div className="ready-project-container">
      <h1 className="ready-project-title">{project.name}</h1>
      <p className="ready-project-description">{project.description}</p>

      <h2>Hardware Status:</h2>
      <div className={`hardware-status ${hardwareStatus.toLowerCase()}`}>
        {hardwareStatus}
      </div>
      <button
        className="connect-hardware-button"
        onClick={handleHardwareConnection}
      >
        Check Hardware Connection
      </button>

      <h2>Preloaded Code:</h2>
      <pre className="code-block">
        <code>{project.code}</code>
      </pre>
      <button
        className="upload-code-button"
        onClick={handleCodeUpload}
        disabled={hardwareStatus !== "Connected and Ready"}
      >
        Upload Code to Hardware
      </button>

      <Link to="/home">
        <button className="back-button" aria-label="Back to Home">
          Back to Home
        </button>
      </Link>
    </div>
  );
};

export default ReadyProjectPage;
