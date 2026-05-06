// @vitest-environment jsdom
import { render, screen } from '@testing-library/react';
import Flashcard from '../components/Flashcard';
import type { VerbCard } from '../config/flashcard';
import { describe, it, expect } from 'vitest';
import '@testing-library/jest-dom/vitest';

const sampleCard: VerbCard = {
  id: '1',
  infinitive: 'fahren',
  englishMeaning: 'to drive',
  forms: {
    infinitive: 'fahren',
    present: {
      ich: 'fahre',
      du: 'fährst',
      erSieEs: 'fährt',
      wir: 'fahren',
      ihr: 'fahrt',
      sieSie: 'fahren',
    },
    simplePast: 'fuhr',
    pastParticiple: 'gefahren',
    presentParticiple: 'fahrend',
    konjunktivII: 'führe',
  },
  auxiliary: 'sein',
  prefix: { type: 'none' },
  type: 'irregular/strong',
  category: 'motion',
  level: 'A1',
  reflexive: false,
  examples: [
    { german: 'Ich fahre nach Berlin.', english: 'I drive to Berlin.' }
  ],
};

describe('Flashcard', () => {
  it('renders infinitive, English meaning, and example', () => {
    const card: VerbCard = sampleCard;

    render(
      <Flashcard card={card} isFlipped={false} onFlip={() => {}} />
    );
    expect(screen.getByText('fahren')).toBeInTheDocument();
    expect(screen.getByText('to drive')).toBeInTheDocument();
  });
  
  it('flips to show conjugated forms', () => {
    const card: VerbCard = sampleCard;

    render(
      <Flashcard card={card} isFlipped={true} onFlip={() => {}} />
    );

    expect(screen.getByText('fährt')).toBeInTheDocument();
    expect(screen.getByText('sein gefahren')).toBeInTheDocument();
    expect(screen.getByText('"Ich fahre nach Berlin."')).toBeInTheDocument();
    expect(screen.getByText('(I drive to Berlin.)')).toBeInTheDocument();
  });
});
