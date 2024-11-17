// Import React to enable JSX syntax and React component features
import React, { useEffect, useRef } from 'react';
// Import the Widget component that handles mode switching between productivity and game components
import Widget from '../../components/Widget';
// Import the NotesApp component to be used as the productivity component
import NotesApp from './NotesApp';
// Import the SudokuApp component to be used as the game component
import SudokuApp from './SudokuApp';

interface WidgetProps {
  onHeightChange: (height: number) => void;
}

// Define the WidgetThree component using React.FC (Function Component) type
// This component serves as a container for the NotesApp and SudokuApp components
const WidgetThree: React.FC<WidgetProps> = ({ onHeightChange }) => {
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
    // Render the Widget component with both productivity and game components
    <Widget
      key="widget" // Unique key for React's reconciliation process
      // Pass the NotesApp component as the productivity component
      productivityComponent={<NotesApp />}
      // Pass the SudokuApp component as the game component
      gameComponent={<SudokuApp />}
    />
  );
};

export default WidgetThree;
