import React from 'react';
import { createRoot } from 'react-dom/client';

function TestComponent() {
  return (
    <div style={{ padding: '20px', background: 'lightblue', margin: '10px' }}>
      <h2>React is working! 🎉</h2>
      <p>This is a test component to verify React is loading properly.</p>
    </div>
  );
}

export function mountTestComponent(containerId = 'galleryGrid') {
  const container = document.getElementById(containerId);
  if (container) {
    console.log('Found container:', container);
    const root = createRoot(container);
    root.render(<TestComponent />);
    console.log('React component mounted successfully!');
    return root;
  } else {
    console.error('Container not found:', containerId);
  }
  return null;
}

export default TestComponent;