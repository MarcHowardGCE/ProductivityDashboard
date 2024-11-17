// Index.tsx - Main Entry Point for this widget
// This file serves as the container that brings together the productivity and game components

// Import required dependencies
import React, { useEffect, useRef } from 'react';
// Import the Widget component that handles mode switching
import Widget from '../../components/Widget';
// Import the specific components this widget will use
import { ProductivityComponent } from './ProductivityComponent';
import { GameComponent } from './GameComponent';

interface WidgetProps {
  onHeightChange: (height: number) => void;
}

// Define the main component using React.FC (Function Component) type
// No props needed as this is the top-level component for this widget
const WidgetExample: React.FC<WidgetProps> = ({ onHeightChange }) => {
  const contentRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const updateHeight = () => {
      if (contentRef.current) {
        const height = contentRef.current.scrollHeight;
        onHeightChange(height);
      }
    };

    // Update height after first render
    updateHeight();

    // If the content might change dynamically, set up a ResizeObserver
    const observer = new ResizeObserver(updateHeight);
    if (contentRef.current) {
      observer.observe(contentRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, [onHeightChange]);

  return (
    // Render the Widget component with both required sub-components
    <Widget
      // Unique key for React's reconciliation process
      key="widget"
      // Pass the productivity component to be shown in work mode
      productivityComponent={<ProductivityComponent />}
      // Pass the game component to be shown in game mode
      gameComponent={<GameComponent />}
    />
  );
};
