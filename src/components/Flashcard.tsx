import React, { useState } from 'react';
import type { VerbCard } from '../data_schema';

interface FlashcardProps {
  card: VerbCard;
  isFlipped: boolean;
  onFlip: () => void;
}

function Flashcard({ card, isFlipped, onFlip }: FlashcardProps) {
  return (
    <div 
      className="group h-80 w-[400px] [perspective:1000px] cursor-pointer"
      onClick={onFlip}
    >
      <div className={`relative h-full w-full rounded-3xl transition-all duration-500 [transform-style:preserve-3d] shadow-2xl ${isFlipped ? '[transform:rotateY(180deg)]' : ''}`}>
        
        {/* Front Face */}
        <div className="absolute inset-0 flex flex-col items-center justify-center rounded-3xl bg-white [backface-visibility:hidden] border border-slate-100">
          <span className="text-xs font-bold tracking-widest text-blue-500 uppercase mb-4">Infinitive</span>
          <h2 className="text-5xl font-black text-slate-800">{card.infinitive}</h2>
          <p className="mt-4 text-xl text-slate-400 font-medium">{card.englishMeaning}</p>
        </div>

        {/* Back Face */}
        <div className="absolute inset-0 h-full w-full rounded-3xl bg-blue-600 p-10 text-white [transform:rotateY(180deg)] [backface-visibility:hidden]">
          <div className="flex h-full flex-col justify-between">
            <div className="space-y-4">
              <div>
                <p className="text-blue-200 text-xs font-bold uppercase tracking-wider">Present (er/sie/es)</p>
                <p className="text-2xl font-bold">{card.forms.present.erSieEs}</p>
              </div>
              <div>
                <p className="text-blue-200 text-xs font-bold uppercase tracking-wider">Perfect (Partizip II)</p>
                <p className="text-2xl font-bold">{card.auxiliary} {card.forms.pastParticiple}</p>
              </div>
            </div>
            
            <div className="pt-6 border-t border-blue-500/50">
              <p className="italic text-lg leading-relaxed">"{card.examples[0].german}"</p>
              <p className="text-blue-200 text-sm mt-2">({card.examples[0].english})</p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

export default Flashcard;