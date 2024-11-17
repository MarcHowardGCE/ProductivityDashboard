import React, { useEffect, useRef, useState, useCallback } from 'react';
import Widget from '../../components/Widget';
import PomodoroTimer from './PomodoroTimer';
import TicTacToe from './TicTacToe';

interface WidgetProps {
  onContentChange: () => void;
}

const WidgetTwo: React.FC<WidgetProps> = ({ onContentChange }) => {
  const contentRef = useRef<HTMLDivElement>(null);

  const updateHeight = useCallback(() => {
    if (contentRef.current) {
      onContentChange();
    }
  }, [onContentChange]);

  useEffect(() => {
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
  }, [updateHeight]);

  // State for Pomodoro Timer
  const [timeLeft, setTimeLeft] = useState<number>(25 * 60);
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [startTime, setStartTime] = useState<Date | null>(null);
  const [cyclesCompleted, setCyclesCompleted] = useState<number>(0);

  useEffect(() => {
    localStorage.setItem('isRunning', JSON.stringify(isRunning));
  }, [isRunning]);

  useEffect(() => {
    localStorage.setItem('cyclesCompleted', cyclesCompleted.toString());
  }, [cyclesCompleted]);

  const handleReset = () => {
    setIsRunning(false);
    setTimeLeft(25 * 60);
    setStartTime(null);
    localStorage.removeItem('startTime');
  };

  // State for Tic-Tac-Toe
  const [board, setBoard] = useState<Array<'X' | 'O' | null>>(Array(9).fill(null));
  const [currentPlayer, setCurrentPlayer] = useState<'X' | 'O'>('X');
  const [winner, setWinner] = useState<'X' | 'O' | 'Tie' | null>(null);
  const [playerWins, setPlayerWins] = useState<number>(0);
  const [aiWins, setAiWins] = useState<number>(0);
  const [ties, setTies] = useState<number>(0);

  return (
    <div ref={contentRef}>
      <Widget
        key="widget"
        productivityComponent={
          <PomodoroTimer
            timeLeft={timeLeft}
            setTimeLeft={setTimeLeft}
            isRunning={isRunning}
            setIsRunning={setIsRunning}
            cyclesCompleted={cyclesCompleted}
            setCyclesCompleted={setCyclesCompleted}
            handleReset={handleReset}
          />
        }
        gameComponent={
          <TicTacToe
            board={board}
            setBoard={setBoard}
            currentPlayer={currentPlayer}
            setCurrentPlayer={setCurrentPlayer}
            winner={winner}
            setWinner={setWinner}
            playerWins={playerWins}
            setPlayerWins={setPlayerWins}
            aiWins={aiWins}
            setAiWins={setAiWins}
            ties={ties}
            setTies={setTies}
          />
        }
      />
    </div>
  );
};

export default WidgetTwo;