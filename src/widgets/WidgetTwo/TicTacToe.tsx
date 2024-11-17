import React, { useState, useEffect } from 'react';

// Define the type for the player, which can be 'X', 'O', or null
type Player = 'X' | 'O' | null;

// Define the props interface for the TicTacToe component
interface TicTacToeProps {
  board: Array<Player>; // The current state of the board
  setBoard: React.Dispatch<React.SetStateAction<Array<Player>>>; // Function to update the board state
  currentPlayer: Player; // The current player ('X' or 'O')
  setCurrentPlayer: React.Dispatch<React.SetStateAction<Player>>; // Function to update the current player
  winner: Player | 'Tie'; // The winner of the game or 'Tie'
  setWinner: React.Dispatch<React.SetStateAction<Player | 'Tie'>>; // Function to update the winner
  playerWins: number; // Number of wins for the player
  setPlayerWins: React.Dispatch<React.SetStateAction<number>>; // Function to update the player's wins
  aiWins: number; // Number of wins for the AI
  setAiWins: React.Dispatch<React.SetStateAction<number>>; // Function to update the AI's wins
  ties: number; // Number of ties
  setTies: React.Dispatch<React.SetStateAction<number>>; // Function to update the number of ties
}

// Define the TicTacToe functional component
const TicTacToe: React.FC<TicTacToeProps> = ({
  board,
  setBoard,
  currentPlayer,
  setCurrentPlayer,
  winner,
  setWinner,
  playerWins,
  setPlayerWins,
  aiWins,
  setAiWins,
  ties,
  setTies,
}) => {
  // useEffect hook to handle AI moves
  // This effect runs whenever the currentPlayer or winner changes
  useEffect(() => {
    let aiTimeout: NodeJS.Timeout;
    if (currentPlayer === 'O' && winner === null) {
      // Delay AI move to make it more natural
      aiTimeout = setTimeout(() => {
        const aiMove = getBestMove(board);
        if (aiMove !== null) {
          handleClick(aiMove);
        }
      }, 500); // Adding a delay for AI move to make it more natural
    }

    // Cleanup function to clear the timeout when the component unmounts or dependencies change
    return () => clearTimeout(aiTimeout);
  }, [currentPlayer, winner, board]);

  // Handler for click events on the board
  const handleClick = (index: number) => {
    // Ignore if cell is already filled or game is over
    if (board[index] !== null || winner !== null) return;

    // Create a copy of the board and update the clicked cell
    const newBoard = [...board];
    newBoard[index] = currentPlayer;
    setBoard(newBoard);

    // Check for a winner or a tie
    const winningCombination = calculateWinner(newBoard);
    if (winningCombination) {
      // If there is a winner, update the winner state and increment the win count
      setWinner(currentPlayer);
      if (currentPlayer === 'X') {
        setPlayerWins((prevWins) => prevWins + 1);
      } else {
        setAiWins((prevWins) => prevWins + 1);
      }
    } else if (newBoard.every((cell) => cell !== null)) {
      // If all cells are filled and there is no winner, it's a tie
      setWinner('Tie');
      setTies((prevTies) => prevTies + 1);
    } else {
      // Switch to the other player
      setCurrentPlayer(currentPlayer === 'X' ? 'O' : 'X');
    }
  };

  // Function to calculate the winner of the game
  // This function checks all possible winning combinations
  const calculateWinner = (board: Array<Player | null>): Player | null => {
    // Define the possible winning combinations
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    // Check each winning combination to see if there is a winner
    for (let line of lines) {
      const [a, b, c] = line;
      if (board[a] && board[a] === board[b] && board[a] === board[c]) {
        return board[a]; // Return the winner ('X' or 'O')
      }
    }
    return null; // Return null if there is no winner
  };

  // Function to get the best move for the AI using the minimax algorithm
  const getBestMove = (board: Array<Player | null>): number | null => {
    const minimax = (newBoard: Array<Player | null>, isMaximizing: boolean): { index: number | null, score: number } => {
      const winner = calculateWinner(newBoard);
      if (winner === 'X') return { index: null, score: -10 };
      if (winner === 'O') return { index: null, score: 10 };
      if (newBoard.every((cell) => cell !== null)) return { index: null, score: 0 };

      const moves: Array<{ index: number; score: number }> = [];
      for (let i = 0; i < newBoard.length; i++) {
        if (newBoard[i] === null) {
          const boardCopy = [...newBoard];
          boardCopy[i] = isMaximizing ? 'O' : 'X';
          const result = minimax(boardCopy, !isMaximizing);
          moves.push({ index: i, score: result.score });
        }
      }

      if (isMaximizing) {
        let bestMove = moves.reduce((best, move) => (move.score > best.score ? move : best), moves[0]);
        return bestMove;
      } else {
        let bestMove = moves.reduce((best, move) => (move.score < best.score ? move : best), moves[0]);
        return bestMove;
      }
    };

    const bestMove = minimax(board, true);
    return bestMove.index;
  };

  // Function to reset the game
  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setCurrentPlayer('X');
    setWinner(null);
  };

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Tic Tac Toe</h2>
      <div className="grid grid-cols-3 gap-2">
        {board.map((cell, index) => (
          <button
            key={index}
            onClick={() => handleClick(index)}
            className="w-20 h-20 text-2xl font-bold border border-gray-500"
          >
            {cell}
          </button>
        ))}
      </div>
      {winner && (
        <div className="mt-4 text-lg font-semibold">
          {winner === 'Tie' ? "It's a Tie!" : `Winner: ${winner}`}
        </div>
      )}
      {/* Button to reset the game */}
      <button
        onClick={resetGame}
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md"
      >
        Reset Game
      </button>
      {/* Display the game statistics */}
      <div className="mt-4">
        <p>Player Wins: {playerWins}</p>
        <p>AI Wins: {aiWins}</p>
        <p>Ties: {ties}</p>
      </div>
    </div>
  );
};

export default TicTacToe;