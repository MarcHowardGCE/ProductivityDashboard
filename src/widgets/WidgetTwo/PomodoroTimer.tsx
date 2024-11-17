import React, { useEffect } from 'react';

// Define the props interface for the PomodoroTimer component
interface PomodoroTimerProps {
  timeLeft: number; // The remaining time in seconds
  setTimeLeft: React.Dispatch<React.SetStateAction<number>>; // Function to update the remaining time
  isRunning: boolean; // Boolean indicating if the timer is currently running
  setIsRunning: React.Dispatch<React.SetStateAction<boolean>>; // Function to update the running state
  cyclesCompleted: number; // Number of completed Pomodoro cycles
  setCyclesCompleted: React.Dispatch<React.SetStateAction<number>>; // Function to update the completed cycles
  handleReset: () => void; // Function to reset the timer
}

// Define the PomodoroTimer functional component
const PomodoroTimer: React.FC<PomodoroTimerProps> = ({
  timeLeft,
  setTimeLeft,
  isRunning,
  setIsRunning,
  cyclesCompleted,
  setCyclesCompleted,
  handleReset,
}) => {
  // Handler for starting and pausing the timer
  // Toggles the isRunning state between true and false
  const handleStartPause = () => {
    setIsRunning(!isRunning);
  };

  // Function to format the timeLeft into a MM:SS string
  // This makes the time display more user-friendly
  const formatTime = (time: number): string => {
    const minutes = Math.floor(time / 60); // Calculate the minutes
    const seconds = time % 60; // Calculate the remaining seconds
    // Return the formatted time string with leading zeros if necessary
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  // useEffect hook to handle the timer countdown
  // This effect runs whenever isRunning or timeLeft changes
  useEffect(() => {
    let timer: NodeJS.Timeout;
    // If the timer is running and there is time left, set an interval to decrement the time
    if (isRunning && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft((prevTime) => prevTime - 1);
      }, 1000); // Decrement the time every second
    } else if (timeLeft === 0) {
      // If the timeLeft reaches 0, stop the timer and increment the cyclesCompleted
      setIsRunning(false);
      setCyclesCompleted(cyclesCompleted + 1);
    }
    // Cleanup function to clear the interval when the component unmounts or dependencies change
    return () => clearInterval(timer);
  }, [isRunning, timeLeft, setTimeLeft, setIsRunning, cyclesCompleted, setCyclesCompleted]);

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Pomodoro Timer</h2>
      {/* Display the formatted timeLeft */}
      <div className="text-4xl font-bold mb-4">{formatTime(timeLeft)}</div>
      <div className="flex gap-4">
        {/* Button to start or pause the timer */}
        <button
          onClick={handleStartPause}
          className="px-4 py-2 bg-green-500 text-white rounded-md"
        >
          {isRunning ? 'Pause' : 'Start'} {/* Display 'Pause' if running, otherwise 'Start' */}
        </button>
        {/* Button to reset the timer */}
        <button
          onClick={handleReset}
          className="px-4 py-2 bg-red-500 text-white rounded-md"
        >
          Reset
        </button>
      </div>
    </div>
  );
};

export default PomodoroTimer;