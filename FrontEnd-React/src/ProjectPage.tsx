import React, { useState } from "react";
import { useParams } from "react-router-dom";
import "./App.css";

// Define interfaces
interface Project {
  name: string;
  visibleTo: string;
}

interface Component {
  type: string;
  pin: string;
  mode: string;
}

const MICROPROCESSORS = {
  Arduino: ["D0", "D1", "D2", "D3", "D4", "D5", "D6", "D7", "D8", "D9", "D10", "D11", "D12", "D13", "A0"],
  ESP32: ["GPIO0", "GPIO1", "GPIO2", "GPIO3", "GPIO4", "GPIO5", "GPIO12", "GPIO13", "GPIO14", "GPIO15", "GPIO16", "GPIO17", "GPIO18", "GPIO19", "GPIO21", "GPIO22", "GPIO23", "GPIO25", "GPIO26", "GPIO27", "GPIO32", "GPIO33", "GPIO34", "GPIO35", "GPIO36", "GPIO39"],
};

const ProjectPage: React.FC<{ projects: Project[] }> = ({ projects }) => {
  const { projectName } = useParams<{ projectName: string }>();
  const project = projects.find((proj) => proj.name === projectName);

  const [selectedMicroprocessor, setSelectedMicroprocessor] = useState<keyof typeof MICROPROCESSORS | null>(null);
  const [components, setComponents] = useState<Component[]>([]);
  const [newComponent, setNewComponent] = useState<Component>({
    type: "",
    pin: "",
    mode: "",
  });
  const [generatedCode, setGeneratedCode] = useState<string>("");
  const [customCode, setCustomCode] = useState<string>("");

  // Add component to the list
  const addComponent = () => {
    if (newComponent.type && newComponent.pin && newComponent.mode) {
      setComponents((prevComponents) => [
        ...prevComponents,
        { ...newComponent },
      ]);
      setNewComponent({ type: "", pin: "", mode: "" }); // Reset the form after adding
    }
  };

  // Handle changes in the custom code input textbox
  const handleCustomCodeChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setCustomCode(event.target.value);
  };

  // Generate code based on components and custom description
  const generateCode = () => {
    let code = `// Auto-generated code for ${project?.name}\n\n`;
    code += `void setup() {\n`;

    // Generate component setup code
    components.forEach((component) => {
      code += `  pinMode(${component.pin}, ${component.mode.toUpperCase()}); // ${component.type}\n`;
    });

    code += `}\n\nvoid loop() {\n`;

    // Generate behavior for components (e.g., LED behavior for output mode)
    components.forEach((component) => {
      if (component.type === "LED" && component.mode === "Output") {
        code += `  digitalWrite(${component.pin}, HIGH); // ${component.type} behavior\n`;
        code += `  delay(5000); // Wait for 5 seconds\n`;
        code += `  digitalWrite(${component.pin}, LOW); // Turn off LED\n`;
        code += `  delay(5000); // Wait for 5 seconds\n`;
      }
    });

    // Add custom code provided by the user
    if (customCode) {
      code += `\n// Custom code from user\n`;
      code += customCode;
    }

    code += `\n}`;

    setGeneratedCode(code); // Save the generated code to display in the textbox
  };

  if (!project) {
    return <h1>Project "{projectName}" not found</h1>;
  }

  return (
    <div className="project-page">
      <h1>Project: {project.name}</h1>

      {/* Microprocessor Selection */}
      <div className="microprocessor-selection">
        <h2>Select Microprocessor</h2>
        <select
          value={selectedMicroprocessor || ""}
          onChange={(e) => setSelectedMicroprocessor(e.target.value as keyof typeof MICROPROCESSORS)}
        >
          <option value="">Select Microprocessor</option>
          <option value="Arduino">Arduino</option>
          <option value="ESP32">ESP32</option>
        </select>
      </div>

      {/* Only show component form and custom code form after selecting a microprocessor */}
      {selectedMicroprocessor && (
        <>
          {/* Component Form */}
          <div className="component-form">
            <h2>Add Component</h2>
            <label>
              Component Type:
              <select
                value={newComponent.type}
                onChange={(e) =>
                  setNewComponent({ ...newComponent, type: e.target.value })
                }
              >
                <option value="">Select</option>
                <option value="LED">LED</option>
                <option value="Sensor">Sensor</option>
                <option value="Button">Button</option>
                <option value="Buzzer">Buzzer</option>
              </select>
            </label>
            <label>
              Pin:
              <select
                value={newComponent.pin}
                onChange={(e) =>
                  setNewComponent({ ...newComponent, pin: e.target.value })
                }
              >
                <option value="">Select Pin</option>
                {MICROPROCESSORS[selectedMicroprocessor].map((pin) => (
                  <option key={pin} value={pin}>
                    {pin}
                  </option>
                ))}
              </select>
            </label>
            <label>
              Mode:
              <select
                value={newComponent.mode}
                onChange={(e) =>
                  setNewComponent({ ...newComponent, mode: e.target.value })
                }
              >
                <option value="">Select Mode</option>
                <option value="Input">Input</option>
                <option value="Output">Output</option>
              </select>
            </label>
            <button onClick={addComponent}>Add Component</button>
          </div>

          {/* List of added components */}
          {components.length > 0 && (
            <div className="components-list">
              <h2>Components Added</h2>
              <ul>
                {components.map((component, index) => (
                  <li key={index}>
                    {component.type} (Pin {component.pin}, {component.mode})
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Textbox for custom circuit description */}
          <div className="custom-code">
            <h2>Enter Your Custom Circuit Code:</h2>
            <textarea
              rows={10}
              cols={80}
              value={customCode}
              onChange={handleCustomCodeChange}
              placeholder="Write your circuit code or description here..."
            />
            <button onClick={generateCode}>Generate Code</button>
          </div>

          {/* Display generated code in a large textbox */}
          {generatedCode && (
            <div className="generated-code">
              <h2>Generated Code:</h2>
              <textarea
                rows={20}
                cols={80}
                value={generatedCode}
                readOnly
              />
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default ProjectPage;
