import React from 'react';
import { useParams } from 'react-router-dom';
import componentsData from './componentsData';

const ComponentDetails: React.FC = () => {
  const { componentId } = useParams<{ componentId: string }>(); // Ensure this matches the type in the router
  const component = componentsData.find((comp) => comp.id === componentId); // Access 'id' here

  if (!component) {
    return <p>Component not found!</p>;
  }

  return (
    <div>
      <h1>{component.name}</h1>
      <p>{component.description}</p>
      <pre>{component.code}</pre> {/* Add the code snippet */}
    </div>
  );
};

export default ComponentDetails;
