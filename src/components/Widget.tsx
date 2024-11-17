// Import necessary React and Framer Motion components
import React, { useState } from 'react';
// AnimatePresence enables animations when components are removed from the React tree
import { motion, AnimatePresence } from 'framer-motion';

// Define the props interface for the Widget component
// Each widget requires two components - one for productivity mode and one for game mode
interface WidgetProps {
  productivityComponent: React.ReactNode;
  gameComponent: React.ReactNode;
}

// Widget component handles the switching between productivity and game modes
// Uses generic React.FC (Function Component) type with our WidgetProps interface
const Widget: React.FC<WidgetProps> = ({ productivityComponent, gameComponent }) => {
  // State to track current mode (true = work mode, false = game mode)
  // Using useState hook for component state management
  const [isWorkMode, setIsWorkMode] = useState(true);

  // Toggle function to switch between work and game modes
  const toggleMode = () => setIsWorkMode(!isWorkMode);

  return (
    // Main widget container
    <div className="widget-container">
      {/* Toggle button that changes text based on current mode */}
      <button onClick={toggleMode} className="toggle-button">
        Switch to {isWorkMode ? 'Game' : 'Work'} Mode
      </button>

      {/* Container for the active component */}
      <div className="widget-content">
        {/* AnimatePresence handles enter/exit animations */}
        {/* mode="wait" ensures one animation completes before the next begins */}
        <AnimatePresence mode="wait">
          {isWorkMode ? (
            // Productivity component with animation properties
            <motion.div
              key="work"
              initial={{ opacity: 0 }}  // Start fully transparent
              animate={{ opacity: 1 }}  // Animate to fully visible
              exit={{ opacity: 0 }}     // Fade out when removed
            >
              {productivityComponent}
            </motion.div>
          ) : (
            // Game component with the same animation properties
            <motion.div
              key="game"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              {gameComponent}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Widget;