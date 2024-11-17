import React, { useState, useEffect } from 'react';
import './Sudoku.css';

// Utility function to generate a complete 9x9 Sudoku solution
// This function uses backtracking to fill the board with a valid Sudoku solution
const generateCompleteSudoku = () => {
  // Initialize a 9x9 board with zeros
  const board = Array.from({ length: 9 }, () => Array(9).fill(0));

  // Function to check if a number can be placed at a given position
  const isValid = (board: number[][], row: number, col: number, num: number) => {
    // Check the row and column for the same number
    for (let i = 0; i < 9; i++) {
      if (board[row][i] === num || board[i][col] === num) {
        return false;
      }
    }

    // Check the 3x3 subgrid for the same number
    const startRow = Math.floor(row / 3) * 3;
    const startCol = Math.floor(col / 3) * 3;
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        if (board[startRow + i][startCol + j] === num) {
          return false;
        }
      }
    }

    return true;
  };

  // Recursive function to fill the board using backtracking
  const fillBoard = (board: number[][]) => {
    // Find the next empty spot on the board
    const findEmpty = () => {
      for (let row = 0; row < 9; row++) {
        for (let col = 0; col < 9; col++) {
          if (board[row][col] === 0) {
            return { row, col };
          }
        }
      }
      return null;
    };

    const emptySpot = findEmpty();
    if (!emptySpot) {
      return true; // Board is completely filled
    }

    const { row, col } = emptySpot;
    // Generate a shuffled array of numbers from 1 to 9
    const numbers = Array.from({ length: 9 }, (_, i) => i + 1).sort(() => Math.random() - 0.5);

    // Try placing each number in the empty spot
    for (let num of numbers) {
      if (isValid(board, row, col, num)) {
        board[row][col] = num;
        if (fillBoard(board)) {
          return true; // Successfully filled the board
        }
        board[row][col] = 0; // Backtrack if the number doesn't lead to a solution
      }
    }

    return false; // No valid number found, backtrack
  };

  fillBoard(board); // Start filling the board
  return board; // Return the completed board
};

// Utility function to generate a new 9x9 Sudoku puzzle by removing some numbers from a complete solution
// This function creates a puzzle by removing a specified number of cells from the complete solution
const generateSudoku = () => {
  const board = generateCompleteSudoku(); // Generate a complete Sudoku solution
  const puzzle = board.map((row) => [...row]); // Create a copy of the board to modify

  // Function to remove a specified number of cells from the board
  const removeNumbers = (puzzle: number[][], count: number) => {
    while (count > 0) {
      const row = Math.floor(Math.random() * 9);
      const col = Math.floor(Math.random() * 9);
      if (puzzle[row][col] !== 0) {
        puzzle[row][col] = 0; // Remove the number by setting it to zero
        count--;
      }
    }
  };

  removeNumbers(puzzle, 40); // Remove 40 numbers to create the puzzle
  return puzzle; // Return the puzzle with some numbers removed
};

// Utility function to check if a move is valid
// This function ensures that the number does not already exist in the same row, column, or 3x3 subgrid
const isValidMove = (board: number[][], row: number, col: number, num: number) => {
  for (let i = 0; i < 9; i++) {
    if (board[row][i] === num || board[i][col] === num) {
      return false;
    }
  }

  const startRow = Math.floor(row / 3) * 3;
  const startCol = Math.floor(col / 3) * 3;
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      if (board[startRow + i][startCol + j] === num) {
        return false;
      }
    }
  }

  return true;
};

// Define the SudokuApp component using React.FC (Function Component) type
// This component serves as the main container for the Sudoku game
const SudokuApp: React.FC = () => {
  // Initialize the board state with a saved board from localStorage or generate a new puzzle
  const [board, setBoard] = useState<number[][]>(() => {
    const savedBoard = localStorage.getItem('sudoku-board');
    return savedBoard ? JSON.parse(savedBoard) : generateSudoku();
  });

  // Save the board state to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('sudoku-board', JSON.stringify(board));
  }, [board]);

  // Handle changes to the input fields
  const handleInputChange = (row: number, col: number, value: string) => {
    const num = parseInt(value, 10);
    const newBoard = board.map((r) => [...r]);

    if (isNaN(num)) {
      newBoard[row][col] = 0; // Allow clearing the cell
    } else if (num >= 1 && num <= 9) {
      newBoard[row][col] = num;
    }

    setBoard(newBoard);
  };

  // Handle restarting the game with a new puzzle
  const handleRestart = () => {
    const newBoard = generateSudoku();
    setBoard(newBoard);
  };

  return (
    <div className="sudoku-app">
      <h2 className="title">9x9 Sudoku Game</h2>
      <p className="instructions">Each row, column, and 3x3 subgrid must contain the numbers 1–9. No number can be repeated in any row, column, or 3x3 subgrid.</p>
      <div className="sudoku-board">
        {board.map((row, rowIndex) => (
          <div key={rowIndex} className="sudoku-row">
            {row.map((cell, colIndex) => (
              <input
                key={colIndex}
                type="text"
                value={cell === 0 ? '' : cell}
                onChange={(e) => handleInputChange(rowIndex, colIndex, e.target.value)}
                className="sudoku-cell"
              />
            ))}
          </div>
        ))}
      </div>
      <button onClick={handleRestart} className="restart-button">
        Restart Game
      </button>
    </div>
  );
};

export default SudokuApp;