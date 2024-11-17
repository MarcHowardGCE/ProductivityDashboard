// Import React and useState hook for managing component state
import React, { useState } from 'react';

// Define Task interface to ensure type safety for task objects
interface Task {
  id: number;      // Unique identifier for each task
  text: string;    // The actual task description
  completed: boolean; // Track completion status
}

// Props interface for ToDoList component
// Receives tasks array and setter function from parent component
// This enables state lifting and persistence across widget modes
interface ToDoListProps {
  tasks: Task[];
  setTasks: React.Dispatch<React.SetStateAction<Task[]>>;
}

// ToDoList component definition with TypeScript types
// Uses destructured props for cleaner code
export const ToDoList: React.FC<ToDoListProps> = ({ tasks, setTasks }) => {
  // Local state for managing input field text
  // Controlled component pattern for form handling
  const [taskText, setTaskText] = useState<string>('');

  // Handler for adding new tasks
  // Only adds task if text is non-empty after trimming
  const handleAddTask = () => {
    if (taskText.trim()) {
      setTasks([...tasks, { 
        id: Date.now(), // Use timestamp as unique ID
        text: taskText.trim(), 
        completed: false 
      }]);
      setTaskText(''); // Clear input after adding
    }
  };

  // Handler for toggling task completion status
  // Uses functional update pattern for state safety
  const handleToggleTask = (id: number) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  // Handler for removing tasks
  // Filters out task with matching ID
  const handleRemoveTask = (id: number) => {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
  };

  return (
    <div>
      {/* Component title with Tailwind styling */}
      <h2 className="text-xl font-semibold mb-2">To-Do List</h2>
      
      {/* Input section for new tasks */}
      <div className="mb-4">
        <input
          type="text"
          value={taskText}
          onChange={(e) => setTaskText(e.target.value)}
          className="border px-2 py-1 rounded-md"
          placeholder="Enter a new task..."
        />
        <button
          onClick={handleAddTask}
          className="ml-2 px-4 py-1 bg-blue-500 text-white rounded-md"
        >
          Add Task
        </button>
      </div>

      {/* Task list rendering section */}
      <ul>
        {/* Map through tasks array to render each task */}
        {tasks.map((task) => (
          <li key={task.id} className="flex items-center mb-2">
            {/* Checkbox to toggle task completion */}
            <input
              type="checkbox"
              checked={task.completed}
              onChange={() => handleToggleTask(task.id)}
              className="mr-2"
            />
            {/* Task text with conditional styling for completed tasks */}
            <span className={`flex-1 ${task.completed ? 'line-through text-gray-500' : ''}`}>
              {task.text}
            </span>
            {/* Button to remove task */}
            <button
              onClick={() => handleRemoveTask(task.id)}
              className="ml-2 px-2 py-1 bg-red-500 text-white rounded-md"
            >
              Remove
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};
