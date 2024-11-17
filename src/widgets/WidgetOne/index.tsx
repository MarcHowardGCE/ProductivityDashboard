// Import necessary dependencies from React
import React, { useState, useEffect, useRef } from 'react';
// Import the MemoryGame and ToDoList components
import { MemoryGame } from './MemoryGame';
import { ToDoList } from './ToDoList';
// Import the Widget component that handles mode switching
import Widget from '../../components/Widget';

interface WidgetProps {
  onContentChange: () => void;
}

// Define the main component for WidgetOne using React.FC (Function Component) type
const WidgetOne: React.FC<WidgetProps> = ({ onContentChange }) => {
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const updateHeight = () => {
      if (contentRef.current) {
        onContentChange();
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
  }, [onContentChange]);

  // State for managing tasks in the ToDoList component
  // Initialize from localStorage to persist tasks across sessions
  const [tasks, setTasks] = useState(() => {
    const savedTasks = localStorage.getItem('tasks');
    return savedTasks ? JSON.parse(savedTasks) : [];
  });

  // State for managing cards in the MemoryGame component
  const [cards, setCards] = useState<Array<{ id: number; image: string; flipped: boolean }>>([]);
  // State for tracking indices of currently flipped cards
  const [flippedCards, setFlippedCards] = useState<number[]>([]);
  // State for tracking number of matched pairs
  const [matches, setMatches] = useState<number>(0);
  // State for tracking number of attempts made
  const [attempts, setAttempts] = useState<number>(0);

  // useEffect to update localStorage whenever tasks state changes
  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  return (
    // Render the Widget component with both productivity and game components
    <Widget
      key="widget" // Unique key for React's reconciliation process
      // Pass the ToDoList component as the productivity component
      productivityComponent={<ToDoList tasks={tasks} setTasks={setTasks} />}
      // Pass the MemoryGame component as the game component
      gameComponent={
        <MemoryGame
          cards={cards}
          setCards={setCards}
          flippedCards={flippedCards}
          setFlippedCards={setFlippedCards}
          matches={matches}
          setMatches={setMatches}
          attempts={attempts}
          setAttempts={setAttempts}
        />
      }
    />
  );
};

// Export the WidgetOne component as default
// This allows it to be imported and used in other parts of the application
export default WidgetOne;
