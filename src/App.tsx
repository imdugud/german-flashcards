import { useState, useEffect, useCallback } from 'react';
import Flashcard from './components/Flashcard';
import type { VerbList } from './data_schema';
import verbData from './verb.data.json';

const MOCK_VERBS: VerbList = verbData as VerbList;

function App() {
  //const duration = 5000; // Duration to show the info box (5 seconds)
  const [index, setIndex] = useState(0);
  const [shuffledCards, setShuffledCards] = useState<VerbList>(MOCK_VERBS);
  const [isFlipped, setIsFlipped] = useState(false);
  

  //usecallback usage to memoize the nextCard and prevCard functions, preventing unnecessary re-renders of child components that depend on these functions as props.
  const nextCard = useCallback(() => {
    setIsFlipped(false);
    setIndex((prev) => (prev + 1) % shuffledCards.length);
  }, []);

  const prevCard = useCallback(() => {
    setIsFlipped(false);
    setIndex((prev) => (prev - 1 + shuffledCards.length) % shuffledCards.length);
  }, []);

  const toggleFlip = useCallback(() => {
    setIsFlipped((prev) => !prev);
  }, []);

  // Kkeyboard event listener
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.code === 'Space') {
        event.preventDefault();
        toggleFlip();
      }
      if (event.code === 'ArrowRight') nextCard();
      if (event.code === 'ArrowLeft') prevCard();
    };
    
    // Shuffle cards on initial load
    setShuffledCards([...MOCK_VERBS].sort(() => Math.random() - 0.5));    
    setIndex(0); // reset to first card after shuffling

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown); 
    };
  }, [toggleFlip, nextCard, prevCard]);

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col items-center justify-center p-4 outline-none">
      {/* fadeout animation added */}
      <div className="animate-[fadeOut_1s_ease-in-out_3s_forwards] mb-4 text-slate-500 text-sm font-medium">
        Use <kbd className="px-2 py-1 bg-white border rounded shadow-sm">←</kbd> <kbd className="px-2 py-1 bg-white border rounded shadow-sm">→</kbd> to navigate
      </div>
      
      <Flashcard 
        card={shuffledCards[index]} 
        isFlipped={isFlipped} 
        onFlip={toggleFlip} 
      />

      <div className="flex gap-4 mt-8">
        <button onClick={prevCard} className="px-6 py-2 rounded-full border border-slate-300 hover:bg-white transition-all">
          Previous
        </button>
        <button onClick={nextCard} className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-full font-semibold shadow-lg transition-all active:scale-95">
          Next Verb →
        </button>
      </div>
    </div>
  );
}

export default App;