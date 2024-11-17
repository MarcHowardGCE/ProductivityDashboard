// Import React and useEffect hook for managing side effects
import React, { useEffect } from 'react';

// Define the props interface for the MemoryGame component
// This ensures type safety and clarity for the expected props
interface MemoryGameProps {
  cards: Array<{ id: number; image: string; flipped: boolean }>; // Array of card objects
  setCards: React.Dispatch<React.SetStateAction<Array<{ id: number; image: string; flipped: boolean }>>>; // Setter for cards state
  flippedCards: number[]; // Array of indices of currently flipped cards
  setFlippedCards: React.Dispatch<React.SetStateAction<number[]>>; // Setter for flippedCards state
  matches: number; // Number of matched pairs
  setMatches: React.Dispatch<React.SetStateAction<number>>; // Setter for matches state
  attempts: number; // Number of attempts made
  setAttempts: React.Dispatch<React.SetStateAction<number>>; // Setter for attempts state
}

// Array of card images to be used in the game
const cardImages = ['🍎', '🍌', '🍇', '🍉', '🍋', '🍒', '🍍', '🍓'];

// MemoryGame component definition with TypeScript types
export const MemoryGame: React.FC<MemoryGameProps> = ({
  cards,
  setCards,
  flippedCards,
  setFlippedCards,
  matches,
  setMatches,
  attempts,
  setAttempts,
}) => {
  // useEffect to initialize the game when the component mounts
  useEffect(() => {
    if (cards.length === 0) {
      resetGame(); // Reset the game if no cards are present
    }
  }, []);

  // useEffect to handle the logic when two cards are flipped
  useEffect(() => {
    if (flippedCards.length === 2) {
      const [firstIndex, secondIndex] = flippedCards;
      if (cards[firstIndex]?.image === cards[secondIndex]?.image) {
        // If the two flipped cards match, increment the matches count
        setMatches((prevMatches) => prevMatches + 1);
      } else {
        // If the two flipped cards do not match, flip them back after a delay
        setTimeout(() => {
          setCards((prevCards) =>
            prevCards.map((card, index) =>
              index === firstIndex || index === secondIndex ? { ...card, flipped: false } : card
            )
          );
        }, 1000); // 1 second delay before flipping back
      }
      // Increment the attempts count and reset the flippedCards array
      setAttempts((prevAttempts) => prevAttempts + 1);
      setFlippedCards([]);
    }
  }, [flippedCards, cards, setCards, setFlippedCards, setMatches, setAttempts]);

  // Function to shuffle the cards at the start of the game
  const shuffleCards = (cards: string[]) => {
    return cards
      .map((card) => ({ id: Math.random(), image: card, flipped: false })) // Assign a random ID to each card
      .sort(() => Math.random() - 0.5); // Shuffle the cards randomly
  };

  // Handler for card click events
  const handleCardClick = (index: number) => {
    if (flippedCards.length < 2 && !cards[index].flipped) {
      // Flip the card if less than two cards are flipped and the clicked card is not already flipped
      setCards((prevCards) =>
        prevCards.map((card, idx) => (idx === index ? { ...card, flipped: true } : card))
      );
      // Add the index of the flipped card to the flippedCards array
      setFlippedCards((prev) => [...prev, index]);
    }
  };

  // Function to reset the game
  const resetGame = () => {
    const shuffledCards = shuffleCards([...cardImages, ...cardImages]); // Duplicate and shuffle the card images
    setCards(shuffledCards); // Set the shuffled cards
    setMatches(0); // Reset matches count
    setAttempts(0); // Reset attempts count
    setFlippedCards([]); // Clear flippedCards array
  };

  return (
    <div>
      {/* Component title with Tailwind styling */}
      <h2 className="text-xl font-semibold mb-2">Memory Game</h2>
      {/* Grid container for the cards */}
      <div className="grid grid-cols-4 gap-4">
        {/* Map through the cards array to render each card */}
        {cards.map((card, index) => (
          <div
            key={card.id} // Unique key for each card
            onClick={() => handleCardClick(index)} // Click handler for each card
            className={`w-16 h-16 flex items-center justify-center text-2xl border rounded-md cursor-pointer ${
              card.flipped ? 'bg-white' : 'bg-gray-400'
            }`}
          >
            {/* Display the card image if flipped, otherwise show nothing */}
            {card.flipped ? card.image : ''}
          </div>
        ))}
      </div>
      {/* Display matches and attempts count */}
      <div className="mt-4">
        <p>Matches: {matches}</p>
        <p>Attempts: {attempts}</p>
        {/* Congratulatory message and restart button when all pairs are matched */}
        {matches === cardImages.length && (
          <div>
            <p>Congratulations! You've matched all pairs!</p>
            <button
              onClick={resetGame}
              className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md"
            >
              Restart Game
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
