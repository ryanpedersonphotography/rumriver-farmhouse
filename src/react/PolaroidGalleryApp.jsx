import React from 'react';
import { createRoot } from 'react-dom/client';
import PolaroidGallery from './components/PolaroidGallery.jsx';
import './styles/PolaroidGallery.css';

function PolaroidGalleryApp() {
  return (
    <div className="polaroid-gallery-app">
      <PolaroidGallery />
    </div>
  );
}

// Function to mount the React gallery
export function mountPolaroidGallery(containerId = 'polaroid-gallery-root') {
  const container = document.getElementById(containerId);
  if (container) {
    const root = createRoot(container);
    root.render(<PolaroidGalleryApp />);
    return root;
  }
  return null;
}

export default PolaroidGalleryApp;