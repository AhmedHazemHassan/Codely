interface ComponentData {
    id: string;
    name: string;
    description: string;
    code: string;
    instructions: string[];
  }
  
  const componentsData: ComponentData[] = [
    {
      id: '1', // Ensure this exists
      name: 'Header',
      description: 'This is a header component.',
      code: '<header>Header Content</header>',
      instructions: ['Import the component', 'Use it in your app'],
    },
    {
      id: '2',
      name: 'Footer',
      description: 'This is a footer component.',
      code: '<footer>Footer Content</footer>',
      instructions: ['Import the component', 'Add it to the bottom of your app'],
    },
  ];
  
  export default componentsData;
  